/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  forceSimulation,
  forceCenter,
  forceCollide,
  forceManyBody,
  forceLink,
  forceX,
  forceY,
  forceRadial,
  Simulation,
  Force
} from "@antv/vendor/d3-force";

describe("d3-force", () => {
  it("exports valid functions", () => {
    expect(forceSimulation).toBeInstanceOf(Function);
    expect(forceCenter).toBeInstanceOf(Function);
    expect(forceManyBody).toBeInstanceOf(Function);
    expect(forceLink).toBeInstanceOf(Function);
  });
});