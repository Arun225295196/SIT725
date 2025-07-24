# SIT725 Task 2.2P - Express Web Server

## 📋 Project Overview

This project implements a complete Express.js web server with a calculator API as part of SIT725 Task 2.2P. The application demonstrates fundamental concepts of web development including REST APIs, static file serving, and client-server communication.

## 🚀 Features

### ✅ Core Requirements (Task 2.2P)
- [x] Express.js web server
- [x] Static file serving from public folder
- [x] Calculator API with addition functionality
- [x] REST API implementation with GET methods
- [x] POST method implementation (bonus)

### 🎯 Additional Features
- [x] Complete calculator (add, subtract, multiply, divide)
- [x] Interactive web interface
- [x] API testing interface
- [x] Error handling and validation
- [x] Responsive design
- [x] Educational documentation

## 🛠 Technology Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: RESTful API with JSON responses
- **Styling**: Modern CSS with gradients and animations

## 📁 Project Structure

```
Week2/
├── package.json              # Project configuration and dependencies
├── server.js                 # Main Express server file
├── public/                   # Static files directory
│   ├── index.html           # Main web interface
│   ├── css/
│   │   └── style.css        # Styling and responsive design
│   └── js/
│       └── script.js        # Client-side JavaScript
└── README.md                # This documentation file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/Arun225295196/SIT725.git
cd SIT725/Week2
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Server
```bash
npm start
```

### Step 4: Access the Application
- **Web Interface**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 📚 API Documentation

### GET Endpoints

#### Add Two Numbers
```
GET /add?num1=5&num2=3
```
**Response:**
```json
{
  "operation": "addition",
  "num1": 5,
  "num2": 3,
  "result": 8,
  "message": "5 + 3 = 8"
}
```

#### Subtract Two Numbers
```
GET /subtract?num1=10&num2=4
```

#### Multiply Two Numbers
```
GET /multiply?num1=6&num2=7
```

#### Divide Two Numbers
```
GET /divide?num1=15&num2=3
```

#### Get All Endpoints
```
GET /api
```

### POST Endpoints

#### Calculate with JSON Body
```
POST /calculate
Content-Type: application/json

{
  "num1": 5,
  "num2": 3,
  "operation": "add"
}
```

**Response:**
```json
{
  "operation": "add",
  "num1": 5,
  "num2": 3,
  "result": 8,
  "message": "5 + 3 = 8"
}
```

## 🧪 Testing the Application

### Method 1: Web Interface
1. Open http://localhost:3000
2. Use the calculator interface
3. Test API endpoints using the buttons
4. Try POST requests with the form

### Method 2: Command Line (curl)
```bash
# Test GET endpoint
curl "http://localhost:3000/add?num1=5&num2=3"

# Test POST endpoint
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5, "operation": "multiply"}'
```

### Method 3: Browser URLs
```
http://localhost:3000/add?num1=15&num2=25
http://localhost:3000/subtract?num1=100&num2=30
http://localhost:3000/multiply?num1=7&num2=8
http://localhost:3000/divide?num1=50&num2=10
```

## 🎓 Learning Objectives Achieved

### Express.js Concepts
- [x] **Server Setup**: Creating and configuring Express server
- [x] **Middleware**: Using express.static() and express.json()
- [x] **Routing**: Implementing GET and POST routes
- [x] **Static Files**: Serving HTML, CSS, and JavaScript files
- [x] **Error Handling**: Validating input and handling errors

### REST API Concepts
- [x] **HTTP Methods**: GET and POST implementation
- [x] **Query Parameters**: Using req.query for GET requests
- [x] **Request Body**: Using req.body for POST requests
- [x] **JSON Responses**: Returning structured JSON data
- [x] **Status Codes**: Proper use of 200, 400, 404, 500

### Web Development
- [x] **Client-Server Communication**: Frontend calling backend APIs
- [x] **Asynchronous JavaScript**: Using fetch() for API calls
- [x] **Responsive Design**: Mobile-friendly interface
- [x] **User Experience**: Interactive forms and real-time feedback

## 🔍 Code Walkthrough

### Server.js Key Components
```javascript
// Static file serving
app.use(express.static('public'));

// JSON parsing middleware
app.use(express.json());

// GET endpoint example
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    // ... validation and calculation logic
});

// POST endpoint example
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    // ... validation and calculation logic
});
```

## 🚦 Error Handling

The application includes comprehensive error handling for:
- Invalid input validation
- Division by zero prevention
- Missing parameters
- Server errors
- Network issues

## 📱 Responsive Design

The interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🎯 Task Requirements Checklist

- [x] ✅ Express web server created
- [x] ✅ Static files served from public folder
- [x] ✅ Calculator API with addition functionality
- [x] ✅ GET method implementation
- [x] ✅ REST API principles followed
- [x] ✅ Code pushed to GitHub repository
- [x] ✅ README file with clear instructions
- [x] ✅ Screenshots and documentation provided
- [x] ✅ Bonus: POST method implementation
- [x] ✅ Bonus: Additional calculator operations

## 📸 Screenshots

To complete your submission, take screenshots of:

1. **Terminal showing server running**: `npm start` command output
2. **Web interface**: Main calculator page at http://localhost:3000
3. **API testing**: GET endpoint results in browser or API testing interface
4. **POST testing**: POST endpoint results using the web form
5. **Browser developer tools**: Network tab showing API calls
6. **File structure**: Your project directory structure

## 🎁 Bonus Features

- Complete calculator with all four operations
- Interactive web interface with real-time feedback
- API testing interface within the web page
- Comprehensive error handling and validation
- Modern, responsive design with animations
- Educational documentation and learning notes

## 🤝 Contributing

This is a student project for SIT725. If you're also taking this course, feel free to learn from this implementation but make sure to create your own original work.

## 📄 License

This project is created for educational purposes as part of SIT725 coursework.

## 👨‍💻 Author

**Arun**  
Student ID: 225295196  
Course: SIT725 - Applied Software Engineering  
Task: 2.2P - Express Web Servers