/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation,
  forceX,
  forceY,
  forceZ
} from "@antv/vendor/d3-force-3d";

describe("d3-force-3d", () => {
  it("exports valid functions", () => {
    expect(forceSimulation).toBeInstanceOf(Function);
    expect(forceCenter).toBeInstanceOf(Function);
    expect(forceZ).toBeInstanceOf(Function);
  });
});
