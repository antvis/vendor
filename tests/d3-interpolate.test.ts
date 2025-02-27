/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  interpolate,
  interpolateArray,
  interpolateBasis,
  interpolateBasisClosed,
  interpolateDate,
  interpolateDiscrete,
  interpolateHsl,
  interpolateHslLong,
  interpolateLab,
  interpolateNumber,
  interpolateObject,
  interpolateRgb,
  interpolateRgbBasis,
  interpolateRgbBasisClosed,
  interpolateRound,
  interpolateString,
  interpolateTransformCss,
  interpolateTransformSvg,
  interpolateZoom,
  piecewise,
  quantize
} from "@antv/vendor/d3-interpolate";

describe("d3-interpolate", () => {
  it("exports valid functions", () => {
    expect(interpolate).toBeInstanceOf(Function);
    expect(interpolateNumber).toBeInstanceOf(Function);
    expect(interpolateRgb).toBeInstanceOf(Function);
  });
});
