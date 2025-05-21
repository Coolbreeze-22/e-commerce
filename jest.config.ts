import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "babel-jest",
      { configFile: "./babel.config.test.js" },
    ],
    // "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    // "^.+\\.(ts|tsx|js|jsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.module\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.ts",
    "\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^react-router-dom$": "<rootDir>/__mocks__/react-router-dom.ts",
    "^react-redux$": "<rootDir>/__mocks__/react-redux.ts",
  },
  transformIgnorePatterns: ["node_modules/(?!(jest-)?react|@?firebase)"],
  testPathIgnorePatterns: ["/node_modules/"],
  // setupFiles: ["<rootDir>/jest.setup.ts"],
};

export default config;

// because babel's file name is babel.config.test.js, thats why i used
// "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { configFile: "./babel.config.test.js" }]

// if the name is babel.config.js as it should be, then transform will be
// "^.+\\.(ts|tsx|js|jsx)$": "babel-jest". no need to add { configFile: "./babel.config.test.js" } bcos by default, babel-jest will look for a file named babel.config.js
