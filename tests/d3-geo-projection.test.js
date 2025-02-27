/*
 * This test verifies that these modules are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  geoBonne,
  geoBonneRaw,
  geoAiry,
} from "@antv/vendor/d3-geo-projection";

describe("d3-geo-projection", () => {
  it("exports valid functions", () => {
    expect(geoBonne).toBeInstanceOf(Function);
    expect(geoBonneRaw).toBeInstanceOf(Function);
  });
});
