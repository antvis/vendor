/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  quadtree,
  Quadtree
} from "@antv/vendor/d3-quadtree";

describe("d3-quadtree", () => {
  it("exports valid functions", () => {
    expect(quadtree).toBeInstanceOf(Function);
  });
});