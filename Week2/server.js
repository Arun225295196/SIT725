// SIT725 Task 2.2P - Express Web Server
// server.js

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files from public directory
app.use(express.static('public'));

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Root route - serves the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Calculator API Endpoints

// GET endpoint to add two numbers
// Usage: http://localhost:3000/add?num1=5&num2=3
app.get('/add', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        
        // Validate input
        if (isNaN(num1) || isNaN(num2)) {
            return res.status(400).json({
                error: 'Invalid input. Please provide valid numbers.',
                example: '/add?num1=5&num2=3'
            });
        }
        
        const result = num1 + num2;
        
        res.json({
            operation: 'addition',
            num1: num1,
            num2: num2,
            result: result,
            message: `${num1} + ${num2} = ${result}`
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Server error occurred',
            details: error.message
        });
    }
});

// GET endpoint to subtract two numbers
// Usage: http://localhost:3000/subtract?num1=10&num2=4
app.get('/subtract', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        
        if (isNaN(num1) || isNaN(num2)) {
            return res.status(400).json({
                error: 'Invalid input. Please provide valid numbers.',
                example: '/subtract?num1=10&num2=4'
            });
        }
        
        const result = num1 - num2;
        
        res.json({
            operation: 'subtraction',
            num1: num1,
            num2: num2,
            result: result,
            message: `${num1} - ${num2} = ${result}`
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Server error occurred',
            details: error.message
        });
    }
});

// GET endpoint to multiply two numbers
// Usage: http://localhost:3000/multiply?num1=6&num2=7
app.get('/multiply', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        
        if (isNaN(num1) || isNaN(num2)) {
            return res.status(400).json({
                error: 'Invalid input. Please provide valid numbers.',
                example: '/multiply?num1=6&num2=7'
            });
        }
        
        const result = num1 * num2;
        
        res.json({
            operation: 'multiplication',
            num1: num1,
            num2: num2,
            result: result,
            message: `${num1} × ${num2} = ${result}`
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Server error occurred',
            details: error.message
        });
    }
});

// GET endpoint to divide two numbers
// Usage: http://localhost:3000/divide?num1=15&num2=3
app.get('/divide', (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        
        if (isNaN(num1) || isNaN(num2)) {
            return res.status(400).json({
                error: 'Invalid input. Please provide valid numbers.',
                example: '/divide?num1=15&num2=3'
            });
        }
        
        if (num2 === 0) {
            return res.status(400).json({
                error: 'Division by zero is not allowed',
                num1: num1,
                num2: num2
            });
        }
        
        const result = num1 / num2;
        
        res.json({
            operation: 'division',
            num1: num1,
            num2: num2,
            result: result,
            message: `${num1} ÷ ${num2} = ${result}`
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Server error occurred',
            details: error.message
        });
    }
});

// POST endpoint for calculator operations
// Usage: Send POST request to /calculate with JSON body
app.post('/calculate', (req, res) => {
    try {
        const { num1, num2, operation } = req.body;
        
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            return res.status(400).json({
                error: 'Invalid input. num1 and num2 must be numbers.',
                example: '{"num1": 5, "num2": 3, "operation": "add"}'
            });
        }
        
        let result;
        let operationSymbol;
        
        switch (operation.toLowerCase()) {
            case 'add':
                result = num1 + num2;
                operationSymbol = '+';
                break;
            case 'subtract':
                result = num1 - num2;
                operationSymbol = '-';
                break;
            case 'multiply':
                result = num1 * num2;
                operationSymbol = '×';
                break;
            case 'divide':
                if (num2 === 0) {
                    return res.status(400).json({
                        error: 'Division by zero is not allowed'
                    });
                }
                result = num1 / num2;
                operationSymbol = '÷';
                break;
            default:
                return res.status(400).json({
                    error: 'Invalid operation. Supported operations: add, subtract, multiply, divide'
                });
        }
        
        res.json({
            operation: operation,
            num1: num1,
            num2: num2,
            result: result,
            message: `${num1} ${operationSymbol} ${num2} = ${result}`
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Server error occurred',
            details: error.message
        });
    }
});

// API endpoint to get all available endpoints
app.get('/api', (req, res) => {
    res.json({
        message: 'SIT725 Task 2.2P - Calculator API',
        endpoints: {
            GET: {
                '/add?num1=5&num2=3': 'Add two numbers',
                '/subtract?num1=10&num2=4': 'Subtract two numbers',
                '/multiply?num1=6&num2=7': 'Multiply two numbers',
                '/divide?num1=15&num2=3': 'Divide two numbers'
            },
            POST: {
                '/calculate': 'Perform calculations with JSON body {"num1": 5, "num2": 3, "operation": "add"}'
            }
        },
        author: 'Arun',
        task: 'SIT725 Task 2.2P'
    });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: 'Visit /api to see available endpoints'
    });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 SIT725 Task 2.2P Server running at http://localhost:${port}`);
    console.log(`📊 Calculator API available at http://localhost:${port}/api`);
    console.log(`🌐 Web interface available at http://localhost:${port}`);
});