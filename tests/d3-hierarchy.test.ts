/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  hierarchy,
  stratify,
  cluster,
  tree,
  treemap,
  treemapBinary,
  treemapDice,
  treemapSlice,
  treemapSliceDice,
  treemapSquarify,
  partition,
  pack
} from "@antv/vendor/d3-hierarchy";

describe("d3-hierarchy", () => {
  it("exports valid functions", () => {
    expect(hierarchy).toBeInstanceOf(Function);
    expect(stratify).toBeInstanceOf(Function);
    expect(cluster).toBeInstanceOf(Function);
    expect(tree).toBeInstanceOf(Function);
  });
});