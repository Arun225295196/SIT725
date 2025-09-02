module.exports = {
    // Test environment
    testEnvironment: 'node',
    
    // Test directories
    testMatch: [
        '**/test/**/*.test.js',
        '**/__tests__/**/*.test.js'
    ],
    
    // Coverage settings
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    
    // Files to include in coverage
    collectCoverageFrom: [
        'controllers/**/*.js',
        'services/**/*.js',
        'models/**/*.js',
        'routes/**/*.js',
        '!**/node_modules/**',
        '!**/test/**',
        '!**/coverage/**'
    ],
    
    // Coverage thresholds
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    
    // Setup files
    setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
    
    // Test timeout
    testTimeout: 10000,
    
    // Verbose output
    verbose: true,
    
    // Clear mocks between tests
    clearMocks: true,
    
    // Restore mocks after each test
    restoreMocks: true
};