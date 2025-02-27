/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  timeDay,
  timeDays,
  timeHour,
  timeHours,
  timeInterval,
  timeMillisecond,
  timeMilliseconds,
  timeMinute,
  timeMinutes,
  timeMonth,
  timeMonths,
  timeSecond,
  timeSeconds,
  timeSunday,
  timeSundays,
  timeWeek,
  timeWeeks,
  timeYear,
  timeYears,
  utcDay,
  utcDays,
  utcHour,
  utcHours,
  utcMinute,
  utcMinutes,
  utcMonth,
  utcMonths,
  utcSecond,
  utcSeconds,
  utcWeek,
  utcWeeks,
  utcYear,
  utcYears
} from "@antv/vendor/d3-time";

describe("d3-time", () => {
  it("exports valid functions", () => {
    expect(timeDay).toBeDefined();
    expect(timeMonth).toBeDefined();
    expect(timeYear).toBeDefined();
  });
});
