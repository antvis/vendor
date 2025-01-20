/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  format,
  formatPrefix,
  formatSpecifier,
  formatLocale,
  formatDefaultLocale,
  precisionFixed,
  precisionPrefix,
  precisionRound
} from "@antv/vendor/d3-format";

describe("d3-format", () => {
  it("exports valid functions", () => {
    expect(format).toBeInstanceOf(Function);
    expect(formatPrefix).toBeInstanceOf(Function);
    expect(formatSpecifier).toBeInstanceOf(Function);
    expect(formatLocale).toBeInstanceOf(Function);
  });
});