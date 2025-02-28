import { faker } from "@faker-js/faker";

function weightedRandom(items: unknown[], weights: number[]) {
  let i;
  let localWeights = [...weights];

  for (i = 0; i < localWeights.length; i++) {
    localWeights[i] += localWeights[i - 1] || 0;
  }

  let random = Math.random() * localWeights[localWeights.length - 1];

  for (i = 0; i < localWeights.length; i++) {
    if (localWeights[i] > random) break;
  }

  return items[i];
}

const mockingbirdModule = Object.assign(
  {
    latitudeNumeric: () => parseFloat(faker.address.latitude()),
    longitudeNumeric: () => parseFloat(faker.address.longitude()),
    searchEngineName() {
      const searchEngines = [
        "https://www.google.co.uk/",
        "https://www.bing.com/",
        "https://duckduckgo.com/",
        "https://yandex.com/",
        "https://yahoo.com",
      ];
      return faker.helpers.arrayElement(searchEngines);
    },
    osName() {
      const osNames = ["Linux", "Windows", "Mac OS"];
      return faker.helpers.arrayElement(osNames);
    },
    browserName() {
      const browserNames = ["Chrome", "Firefox", "IE", "Opera"];
      return faker.helpers.arrayElement(browserNames);
    },
    browserEngineName() {
      const browserEngineNames = ["Blink", "Gecko", "Trident"];
      return faker.helpers.arrayElement(browserEngineNames);
    },
    datetimeNow: () => new Date().toISOString().slice(0, 19),
    datetimeRecent: () => faker.date.recent().toISOString().slice(0, 19),
    datetimeBetween: (params: {
      start: string | number | Date;
      end: string | number | Date;
    }) =>
      faker.date.between(params.start, params.end).toISOString().slice(0, 19),
    timestampNow: () => new Date().toISOString(),
    pick: (params: { values: unknown[] }) =>
      params.values[Math.floor(Math.random() * params.values.length)],
    pickWeighted: (params: { values: unknown[]; weights: number[] }) =>
      weightedRandom(params.values, params.weights),
  },
  {}
);

const extendedFaker = {
  ...faker,
  helpers: { ...faker.helpers, weightedRandom },
  mockingbird: mockingbirdModule,
};

export default extendedFaker;
