/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  blob,
  buffer,
  csv,
  dsv,
  html,
  image,
  json,
  svg,
  text,
  tsv,
  xml
} from "@antv/vendor/d3-fetch";

describe("d3-fetch", () => {
  it("exports valid functions", () => {
    expect(json).toBeInstanceOf(Function);
    expect(csv).toBeInstanceOf(Function);
    expect(text).toBeInstanceOf(Function);
  });
});
