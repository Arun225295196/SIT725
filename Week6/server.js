const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static('public'));

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Calculator route - adds two numbers
app.get('/add', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Invalid input");
    }
    
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is: ${sum}`);
});

// Additional calculator routes for more comprehensive testing
app.get('/subtract', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Invalid input");
    }
    
    const result = a - b;
    res.send(`The difference of ${a} and ${b} is: ${result}`);
});

app.get('/multiply', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Invalid input");
    }
    
    const result = a * b;
    res.send(`The product of ${a} and ${b} is: ${result}`);
});

app.get('/divide', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send("Invalid input");
    }
    
    if (b === 0) {
        return res.status(400).send("Cannot divide by zero");
    }
    
    const result = a / b;
    res.send(`The division of ${a} by ${b} is: ${result}`);
});

// Start server
app.listen(port, () => {
    console.log(`Calculator app listening at http://localhost:${port}`);
});

module.exports = app;