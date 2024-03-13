import type { JestConfigWithTsJest as Config } from 'ts-jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: [],
    coverageProvider: "v8",
};

export default config;
