// Test setup file for Jest
// This file runs before each test suite

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 0; // Use random port for testing

// Mock console methods to reduce test noise
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Only show console messages in verbose mode
if (!process.env.VERBOSE_TESTS) {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
}

// Global test utilities
global.testUtils = {
    // Restore original console methods if needed
    restoreConsole: () => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
    },
    
    // Helper to create test project data
    createTestProject: (overrides = {}) => ({
        title: 'Test Project',
        description: 'Test project description for unit testing',
        category: 'Testing',
        image: 'https://via.placeholder.com/300',
        link: 'https://example.com',
        ...overrides
    }),
    
    // Helper to wait for async operations
    wait: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // Helper to generate random test data
    randomString: (length = 8) => {
        return Math.random().toString(36).substring(2, length + 2);
    },
    
    // Helper to generate test user
    createTestUser: () => ({
        username: `testuser_${Math.random().toString(36).substr(2, 9)}`,
        socketId: `socket_${Math.random().toString(36).substr(2, 9)}`
    })
};

// Global beforeAll hook
beforeAll(() => {
    console.log('🧪 Starting test suite...');
});

// Global afterAll hook
afterAll(() => {
    console.log('✅ Test suite completed');
    
    // Cleanup if needed
    if (global.testCleanup) {
        global.testCleanup();
    }
});

// Handle unhandled promise rejections in tests
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit the process in test environment
});

// Handle uncaught exceptions in tests
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Don't exit the process in test environment
});