/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  Adder,
  Bin,
  Bisector,
  bin,
  bisect,
  bisectCenter,
  bisectLeft,
  bisectRight,
  bisector,
  count,
} from "@antv/vendor/d3-array";

describe("d3-array", () => {
  it("exports valid functions", () => {
    expect(bin).toBeInstanceOf(Function);
    expect(bisect).toBeInstanceOf(Function);
  });
});
