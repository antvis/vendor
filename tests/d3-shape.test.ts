/*
 * This test verifies that these modules and types are exported correctly
 */
import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  Arc,
  Area,
  arc,
  area,
} from "@antv/vendor/d3-shape";

describe("d3-shape", () => {
  it("exports valid functions", () => {
    expect(arc).toBeInstanceOf(Function);
    expect(area).toBeInstanceOf(Function);
  });
});
