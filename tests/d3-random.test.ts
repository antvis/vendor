/*
 * This test verifies that these modules and types are exported correctly
 */

import { describe, it, expect } from "vitest";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  randomBates,
  randomBernoulli,
  randomBeta,
  randomBinomial,
  randomCauchy,
  randomExponential,
  randomGamma,
  randomGeometric,
  randomInt,
  randomIrwinHall,
  randomLcg,
  randomLogNormal,
  randomLogistic,
  randomNormal,
  randomPareto,
  randomPoisson,
  randomUniform,
  randomWeibull
} from "@antv/vendor/d3-random";

describe("d3-random", () => {
  it("exports valid functions", () => {
    expect(randomUniform).toBeInstanceOf(Function);
    expect(randomNormal).toBeInstanceOf(Function);
    expect(randomInt).toBeInstanceOf(Function);
  });
});
