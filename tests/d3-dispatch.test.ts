/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  dispatch,
  Dispatch
} from "@antv/vendor/d3-dispatch";

describe("d3-dispatch", () => {
  it("exports valid functions", () => {
    expect(dispatch).toBeInstanceOf(Function);
  });
});