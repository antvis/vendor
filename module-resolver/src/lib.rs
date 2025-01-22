use std::path::{Path, PathBuf};

use swc_core::ecma::ast::{ImportDecl, NamedExport};
use swc_core::ecma::{
    ast::Program,
    transforms::testing::test_inline,
    visit::{visit_mut_pass, VisitMut, VisitMutWith},
};
use swc_core::plugin::metadata::TransformPluginMetadataContextKind;
use swc_core::plugin::{plugin_transform, proxies::TransformPluginProgramMetadata};

/// A visitor that transforms import/export paths in JavaScript modules
/// to handle d3 and internmap package dependencies
struct TransformVisitor {
    /// The absolute path of the file being processed
    current_file: PathBuf,
}

impl TransformVisitor {
    /// Resolves module import/export paths for d3 and internmap packages
    ///
    /// # Arguments
    /// * `module_name` - The original module path from import/export statement
    ///
    /// # Returns
    /// * `Option<String>` - The resolved path relative to lib-vendor directory,
    ///                      or the original path if not a d3/internmap package
    fn resolve_path(&self, module_name: &str) -> Option<String> {
        // Regex to match d3-* packages and internmap
        let d3pattern = regex::Regex::new(r"^(?P<pkg>(d3-[^/]+|internmap))(?P<path>.*)").unwrap();

        if let Some(caps) = d3pattern.captures(module_name) {
            let pkg = caps.name("pkg").unwrap();
            let path = caps.name("path").unwrap();

            // We only handle root package imports, not nested paths
            if !path.is_empty() {
                panic!(
                    "Unable to process {} import in {}",
                    module_name,
                    self.current_file.display()
                );
            }

            // Construct the path to the vendored package's index file
            let vendor_pkg = format!("lib-vendor/{}/src/index.js", pkg.as_str());

            // Convert the current file's path to use lib-vendor instead of node_modules
            let current_file_vendor = self
                .current_file
                .to_string_lossy()
                .replace("node_modules", "lib-vendor");

            // Calculate the relative path from current file to the vendor package
            let rel_path = pathdiff::diff_paths(
                &vendor_pkg,
                Path::new(&current_file_vendor).parent().unwrap(),
            )
            .unwrap()
            .to_string_lossy()
            .replace("\\", "/");

            return Some(rel_path);
        }

        // Return unchanged path for non-d3/internmap imports
        Some(module_name.to_string())
    }
}

/// Implementation of the AST visitor for transforming import/export declarations
impl VisitMut for TransformVisitor {
    /// Transforms import declarations by updating their source paths
    fn visit_mut_import_decl(&mut self, node: &mut ImportDecl) {
        // Visit child nodes first
        node.visit_mut_children_with(self);

        // Resolve and update the import source path
        if let Some(new_path) = self.resolve_path(&node.src.value) {
            node.src.value = new_path.into();
            node.src.raw = None; // Clear raw source to force path recalculation
        }
    }

    /// Transforms named exports by updating their source paths
    fn visit_mut_named_export(&mut self, node: &mut NamedExport) {
        // Visit child nodes first
        node.visit_mut_children_with(self);

        // Resolve and update the export source path
        if let Some(new_path) = self.resolve_path(&node.src.as_mut().unwrap().value) {
            node.src.as_mut().unwrap().value = new_path.into();
            node.src.as_mut().unwrap().raw = None; // Clear raw source to force path recalculation
        }
    }
}

/// SWC plugin transform entry point that processes JavaScript modules
/// to resolve d3 and internmap package imports/exports
#[plugin_transform]
pub fn process_transform(
    mut program: Program,
    metadata: TransformPluginProgramMetadata,
) -> Program {
    // Get the current file path from transform metadata
    let file_name = metadata
        .get_context(&TransformPluginMetadataContextKind::Filename)
        .unwrap_or_default();

    let current_file = PathBuf::from(file_name);

    // Create and apply the transform visitor
    let visitor = TransformVisitor { current_file };
    program.visit_mut_with(&mut visit_mut_pass(visitor));

    program
}

test_inline!(
    Default::default(),
    |_| {
        let file_name = format!("node_modules/d3-hierarchy/src/hierarchy/iterator.js",);

        let current_file = PathBuf::from(file_name);

        let visitor = TransformVisitor { current_file };

        visit_mut_pass(visitor)
    },
    boo,
    // input code
    r#"
    import test from "d3-color";
    import test2 from "test2";
    import internmap from "internmap";
    import Quad from "./quad.js";
    export { something } from "internmap";    
    "#,
    // expected output code
    r#"
    import test from "../../../d3-color/src/index.js";
    import test2 from "test2";
    import internmap from "../../../internmap/src/index.js";
    import Quad from "./quad.js";
    export { something } from "../../../internmap/src/index.js";    
    "#
);
