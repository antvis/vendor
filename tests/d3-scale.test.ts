/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  scaleBand,
  scaleIdentity,
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scalePoint,
  scalePow,
  scaleQuantile,
  scaleQuantize,
  scaleRadial,
  scaleSequential,
  scaleSqrt,
  scaleSymlog,
  scaleThreshold,
  scaleTime,
  scaleUtc,
  tickFormat
} from "@antv/vendor/d3-scale";

describe("d3-scale", () => {
  it("exports valid functions", () => {
    expect(scaleLinear).toBeInstanceOf(Function);
    expect(scaleOrdinal).toBeInstanceOf(Function);
    expect(scaleTime).toBeInstanceOf(Function);
  });
});
