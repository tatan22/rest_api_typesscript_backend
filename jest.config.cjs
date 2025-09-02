const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    ...tsJestTransformCfg,
  },
  testMatch: ["**/src/**/*.test.ts"], // 👈 busca tests solo en src
  transformIgnorePatterns: [
    "node_modules/(?!chalk)" // evita romper con chalk
  ],
};
