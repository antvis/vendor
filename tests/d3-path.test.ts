/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  path,
  Path
} from "@antv/vendor/d3-path";

describe("d3-path", () => {
  it("exports valid functions", () => {
    expect(path).toBeInstanceOf(Function);
  });
});