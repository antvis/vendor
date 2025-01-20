/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  geoPath,
  geoProjection,
  geoMercator,
  geoAlbers,
  geoAlbersUsa,
  geoAzimuthalEqualArea,
  geoAzimuthalEquidistant,
  geoConicConformal,
  geoConicEqualArea,
  geoConicEquidistant,
  geoEquirectangular,
  geoGnomonic,
  geoOrthographic,
  geoStereographic,
  geoTransverseMercator
} from "@antv/vendor/d3-geo";

describe("d3-geo", () => {
  it("exports valid functions", () => {
    expect(geoPath).toBeInstanceOf(Function);
    expect(geoMercator).toBeInstanceOf(Function);
    expect(geoAlbers).toBeInstanceOf(Function);
    expect(geoProjection).toBeInstanceOf(Function);
  });
});