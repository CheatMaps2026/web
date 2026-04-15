import type {Config} from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFiles: ['<rootDir>/jest.setup-env.js'],

};

export default config;
