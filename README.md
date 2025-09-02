# SIT725 Week 7.2P - MVC Architecture with Socket.IO

This project extends the previous MVC implementation to include real-time communication using Socket.IO, fulfilling the requirements for SIT725 7.2P.

## 🚀 Features

### Core MVC Features
- **Model-View-Controller** architecture
- RESTful API endpoints
- CRUD operations for projects
- Responsive frontend using Materialize CSS
- Modular code structure

### New Socket.IO Features
- **Real-time Communication**: Instant updates across all connected clients
- **Live Project Updates**: See projects being added/updated/deleted in real-time
- **Real-time Chat**: Built-in chat system for collaboration
- **User Presence**: Track how many users are currently online
- **Typing Indicators**: See when other users are typing
- **Live Notifications**: Real-time notification system
- **Connection Status**: Visual indicators for connection state

## 📁 Project Structure

```
your-project/
├── server.js                 # Main server with Socket.IO integration
├── package.json              # Dependencies including Socket.IO
├── jest.config.js            # Test configuration
├── public/
│   ├── index.html            # Frontend with Socket.IO client
│   ├── css/
│   │   └── style.css         # Styles for real-time features
│   └── js/
│       └── script.js         # Client-side Socket.IO logic
├── routes/
│   ├── index.js
│   └── projects.js           # API routes with socket events
├── controllers/
│   ├── index.js
│   └── projectController.js  # Controllers with socket emissions
├── services/
│   ├── index.js
│   └── projectService.js     # Business logic
├── models/
│   └── project.js            # Data models
└── test/
    ├── setup.js              # Test setup configuration
    ├── socket.test.js        # Socket.IO integration tests
    └── projectService.test.js # Service layer tests
```

## 🛠 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone your repository
git clone [your-repo-url]
cd your-project

# Install dependencies
npm install
```

### 2. Install New Dependencies

The updated `package.json` includes:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "socket.io": "^4.7.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

### 3. Start the Application

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### 4. Access the Application

- **Web Application**: http://localhost:3000
- **API Base**: http://localhost:3000/api/projects
- **Socket.IO**: Automatically connects on page load

## 🔌 Socket.IO Implementation

### Server-Side Events

The server listens for and emits the following events:

#### Incoming Events (from clients):
- `connection` - New client connects
- `disconnect` - Client disconnects
- `chatMessage` - User sends a chat message
- `typing` - User typing indicator
- `projectCreated` - Project created via client
- `projectDeleted` - Project deleted via client
- `projectUpdated` - Project updated via client
- `viewProject` - User views a specific project
- `requestProjectSync` - Client requests data synchronization

#### Outgoing Events (to clients):
- `welcome` - Welcome message to new connections
- `userCount` - Current number of connected users
- `userJoined` - Someone joined the session
- `userLeft` - Someone left the session
- `projectCreated` - New project was created
- `projectUpdated` - Project was updated
- `projectDeleted` - Project was deleted
- `chatMessage` - Chat message broadcast
- `userTyping` - Typing indicator
- `projectAccessed` - Someone viewed a project

### Client-Side Integration

The frontend automatically connects to Socket.IO and provides:

- **Real-time Project Updates**: Projects appear/update/disappear instantly
- **Live Notifications**: Toast messages and notification panel
- **Chat System**: Real-time messaging with typing indicators
- **User Presence**: Shows number of online users
- **Connection Status**: Visual indicators for connection state

## 🧪 Testing

### Test Structure

```bash
test/
├── setup.js              # Global test configuration
├── socket.test.js        # Socket.IO functionality tests
└── projectService.test.js # Business logic tests
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test socket.test.js
```

### Test Coverage

The test suite covers:
- Socket.IO connection and disconnection
- Real-time event handling
- Chat functionality
- Project CRUD operations
- API endpoints
- Service layer functions
- Error handling

## 🌐 API Endpoints

### Standard REST Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (emits socket event)
- `PUT /api/projects/:id` - Update project (emits socket event)
- `DELETE /api/projects/:id` - Delete project (emits socket event)
- `GET /api/projects/category/:category` - Get projects by category

### New Socket-Aware Endpoints
- `GET /api/projects/stats` - Get project statistics with socket event

## 📱 Real-Time Features Demo

### 1. Multi-User Testing
1. Open the application in multiple browser tabs/windows
2. Create, update, or delete projects in one tab
3. Watch real-time updates appear in other tabs

### 2. Chat System
1. Click the chat button or use the floating action button
2. Send messages and see them appear in real-time
3. Start typing to see typing indicators

### 3. Live Notifications
1. Click the notifications icon in the status bar
2. See real-time updates about user activity
3. Watch the notification count update automatically

### 4. User Presence
1. Open/close browser tabs
2. Watch the user count change in the status bar
3. See join/leave notifications

## 🔧 Configuration

### Environment Variables

```bash
# .env file (optional)
NODE_ENV=development
PORT=3000
```

### Socket.IO Configuration

The server is configured with CORS enabled for development:

```javascript
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
```

## 📋 Key Implementation Details

### 1. MVC with Socket Integration
- Controllers emit socket events after successful operations
- Real-time updates don't bypass the MVC structure
- Socket events complement, don't replace, HTTP APIs

### 2. Error Handling
- Socket connection errors are handled gracefully
- API errors are displayed via both HTTP responses and socket events
- Network disconnections show appropriate status

### 3. Data Consistency
- Socket events are emitted after successful database operations
- Clients can request data synchronization if needed
- Optimistic updates with fallback mechanisms

## 🎯 Learning Objectives Achieved

✅ **Socket Programming**: Implemented real-time bidirectional communication  
✅ **Event-Driven Architecture**: Used socket events for real-time updates  
✅ **Integration**: Combined Socket.IO with existing MVC structure  
✅ **Testing**: Comprehensive test coverage including socket functionality  
✅ **Real-World Application**: Chat, notifications, and live updates  

## 📝 Submission Requirements

### For SIT725 7.2P:

1. **GitHub Repository**: 
   - Push all code to your repository
   - Include this comprehensive README
   - Ensure repository is public/accessible

2. **Screenshots Required**:
   - Application running with multiple users online
   - Real-time chat working
   - Projects being created/updated in real-time
   - Test results showing passed tests
   - Network tab showing Socket.IO connections

3. **PDF Submission**:
   - Combine screenshots into a PDF
   - Include your GitHub repository link
   - Upload to OnTrack

### Testing Your Submission
```bash
# Clone your repo to test
git clone [your-repo-url] test-clone
cd test-clone
npm install
npm test
npm start
```

## 🚀 Future Enhancements

Potential improvements for advanced learning:
- Database integration (MongoDB/PostgreSQL)
- User authentication and rooms
- File upload with real-time progress
- Video/voice chat integration
- Advanced collaboration features
- Mobile app with Socket.IO

## 🤝 Contributing

This is an educational project for SIT725. For improvements:
1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Submit a pull request

---

**Author**: Arun  
**Course**: SIT725 - Applied Software Engineering  
**Assignment**: 7.2P - Socket Programming  
**Date**: 2 september 2025