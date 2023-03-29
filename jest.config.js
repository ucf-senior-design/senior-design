// jest.config.js
const ignores = [
  "/node_modules/",
  "/__fixtures__/",
  "/fixtures/",
  "/__tests__/helpers/",
  "/__tests__/utils/",
  "__mocks__",
  "utillity/types",
]
module.exports = {
  collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  collectCoverageFrom: ["**/*.+(ts|tsx)"],
  // resolver: "jest-node-exports-resolver",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/helpers/",
    "/__tests__/utils/",
    "__mocks__",
    "utility/types",
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    "^@/components/(.*)$": "<rootDir>/components/$1",

    "^@firebase/auth$": "<rootDir>/node_modules/@firebase/auth/dist/auth.esm.js",
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/utility/types/",
  ],
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        babelrc: false,
        presets: ["@babel/preset-typescript", "@babel/preset-react", "@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-optional-chaining"],
      },
    ],
  },
  moduleNameMapper: {
    /* This is key to preventing the webpack error. */
    "^firebase(.*)$": "<rootDir>/__mocks__/firebaseMock.js",
  },
  automock: false,
  resetMocks: false,
  setupFiles: ["./setUpTest.js"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
    "<rootDir>/utility/types/",
    "^.+\\.js$",
    "node_modules/(?!firebaseq)/",
  ],
}
