/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  now,
  Timer,
  timer,
  timerFlush,
  timeout,
  interval,
} from "@antv/vendor/d3-timer";

describe("d3-timer", () => {
  it("exports valid functions", () => {
    expect(timer).toBeInstanceOf(Function);
    expect(now).toBeInstanceOf(Function);
  });
});
