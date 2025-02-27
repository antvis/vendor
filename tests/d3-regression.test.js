/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  regressionExp,
  regressionLinear,
  regressionLoess,
  regressionLog,
  regressionPoly,
  regressionQuad
} from "@antv/vendor/d3-regression";

describe("d3-regression", () => {
  it("exports valid functions", () => {
    expect(regressionLinear).toBeInstanceOf(Function);
    expect(regressionPoly).toBeInstanceOf(Function);
    expect(regressionLog).toBeInstanceOf(Function);
  });
});
