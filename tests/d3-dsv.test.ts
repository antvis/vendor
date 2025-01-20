/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  csvParse,
  csvParseRows,
  csvFormat,
  csvFormatBody,
  tsvParse,
  tsvParseRows,
  tsvFormat,
  tsvFormatBody,
  dsvFormat,
  autoType
} from "@antv/vendor/d3-dsv";

describe("d3-dsv", () => {
  it("exports valid functions", () => {
    expect(csvParse).toBeInstanceOf(Function);
    expect(tsvParse).toBeInstanceOf(Function);
    expect(dsvFormat).toBeInstanceOf(Function);
  });
});