// SIT725 Task 2.2P - Client-Side JavaScript
// public/js/script.js

// Calculator function for the web interface
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const resultDiv = document.getElementById('result');

    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
        showResult('Please enter valid numbers!', 'error');
        return;
    }

    // Check for division by zero
    if (operation === 'divide' && num2 === 0) {
        showResult('Error: Division by zero is not allowed!', 'error');
        return;
    }

    // Perform calculation
    let result;
    let operationSymbol;

    switch (operation) {
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
            result = num1 / num2;
            operationSymbol = '÷';
            break;
        default:
            showResult('Invalid operation!', 'error');
            return;
    }

    // Display result
    const message = `${num1} ${operationSymbol} ${num2} = ${result}`;
    showResult(message, 'success');
}

// Function to show result with animation
function showResult(message, type) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    
    // Remove existing classes
    resultDiv.classList.remove('success', 'error', 'show');
    
    // Add appropriate class
    resultDiv.classList.add(type);
    
    // Trigger animation
    setTimeout(() => {
        resultDiv.classList.add('show');
    }, 10);
}

// Function to test GET endpoints
async function testEndpoint(endpoint) {
    const resultPre = document.getElementById('apiResult');
    
    try {
        // Show loading state
        resultPre.textContent = 'Loading...';
        
        // Make the API request
        const response = await fetch(endpoint);
        const data = await response.json();
        
        // Format and display the result
        const formattedResult = JSON.stringify(data, null, 2);
        resultPre.textContent = `Status: ${response.status}\n\n${formattedResult}`;
        
        // Add success or error styling based on status
        if (response.ok) {
            resultPre.style.borderColor = '#4caf50';
            resultPre.style.backgroundColor = '#e8f5e8';
        } else {
            resultPre.style.borderColor = '#f44336';
            resultPre.style.backgroundColor = '#ffebee';
        }
        
    } catch (error) {
        // Handle network or other errors
        resultPre.textContent = `Error: ${error.message}`;
        resultPre.style.borderColor = '#f44336';
        resultPre.style.backgroundColor = '#ffebee';
    }
}

// Function to test POST endpoint
async function testPostEndpoint() {
    const num1 = parseFloat(document.getElementById('postNum1').value);
    const num2 = parseFloat(document.getElementById('postNum2').value);
    const operation = document.getElementById('postOperation').value;
    const resultPre = document.getElementById('postResult');

    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
        resultPre.textContent = 'Error: Please enter valid numbers for both inputs.';
        resultPre.style.borderColor = '#f44336';
        resultPre.style.backgroundColor = '#ffebee';
        return;
    }

    try {
        // Show loading state
        resultPre.textContent = 'Sending POST request...';
        resultPre.style.borderColor = '#e9ecef';
        resultPre.style.backgroundColor = '#f8f9fa';

        // Prepare the request body
        const requestBody = {
            num1: num1,
            num2: num2,
            operation: operation
        };

        // Make the POST request
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        // Format and display the result
        const requestInfo = `POST /calculate\nRequest Body: ${JSON.stringify(requestBody, null, 2)}\n\nResponse:\nStatus: ${response.status}\n\n${JSON.stringify(data, null, 2)}`;
        resultPre.textContent = requestInfo;

        // Add success or error styling based on status
        if (response.ok) {
            resultPre.style.borderColor = '#4caf50';
            resultPre.style.backgroundColor = '#e8f5e8';
        } else {
            resultPre.style.borderColor = '#f44336';
            resultPre.style.backgroundColor = '#ffebee';
        }

    } catch (error) {
        // Handle network or other errors
        resultPre.textContent = `Error: ${error.message}`;
        resultPre.style.borderColor = '#f44336';
        resultPre.style.backgroundColor = '#ffebee';
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add Enter key support for calculator inputs
    const inputs = document.querySelectorAll('#num1, #num2');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculate();
            }
        });
    });

    // Add Enter key support for POST form inputs
    const postInputs = document.querySelectorAll('#postNum1, #postNum2');
    postInputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                testPostEndpoint();
            }
        });
    });

    // Initialize with welcome messages
    document.getElementById('result').textContent = 'Enter numbers and click Calculate!';
});

// Utility function to clear all form inputs
function clearCalculator() {
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result').textContent = 'Calculator cleared!';
    document.getElementById('result').classList.remove('success', 'error');
}

// Utility function to clear POST form
function clearPostForm() {
    document.getElementById('postNum1').value = '';
    document.getElementById('postNum2').value = '';
    document.getElementById('postResult').textContent = 'Use the form above to test POST /calculate endpoint';
    document.getElementById('postResult').style.borderColor = '#e9ecef';
    document.getElementById('postResult').style.backgroundColor = '#f8f9fa';
}

// Function to copy API endpoint to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary feedback
        const originalText = event.target.textContent;
        event.target.textContent = 'Copied!';
        setTimeout(() => {
            event.target.textContent = originalText;
        }, 1000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Console logging for debugging
console.log('🚀 SIT725 Task 2.2P - Calculator loaded successfully!');
console.log('📊 Available functions:');
console.log('  - calculate(): Main calculator function');
console.log('  - testEndpoint(endpoint): Test GET API endpoints');
console.log('  - testPostEndpoint(): Test POST API endpoint');
console.log('  - clearCalculator(): Clear calculator form');
console.log('  - clearPostForm(): Clear POST form');