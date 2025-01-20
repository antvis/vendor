/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  rgb,
  hsl,
  lab,
  hcl,
  lch,
  gray,
  color,
  Color
} from "@antv/vendor/d3-color";

describe("d3-color", () => {
  it("exports valid functions", () => {
    expect(rgb).toBeInstanceOf(Function);
    expect(hsl).toBeInstanceOf(Function);
    expect(lab).toBeInstanceOf(Function);
    expect(color).toBeInstanceOf(Function);
  });
});