import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: [],
    coverageProvider: "v8",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@libs/(.*)$": "<rootDir>/src/libs/$1",
        "^@utils/(.*)$": "<rootDir>/src/utils/$1",
        "^@fonts": "<rootDir>/src/fonts/index.ts",
        "^@models/(.*)$": "<rootDir>/src/models/$1",
        "^@data-access/(.*)$": "<rootDir>/src/database/access/$1",
        "^@public/(.*)$": "<rootDir>/public/$1",
    },
    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
