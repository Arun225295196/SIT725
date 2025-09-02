const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Make io accessible to routes
app.set('socketio', io);

// Import routes
const projectRoutes = require('./routes/projects');

// Use routes
app.use('/api/projects', projectRoutes);

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO connection handling
let connectedUsers = 0;
let projectUpdateCount = 0;

io.on('connection', (socket) => {
    connectedUsers++;
    console.log(`New client connected. Socket ID: ${socket.id}`);
    console.log(`Total connected users: ${connectedUsers}`);
    
    // Broadcast user count to all clients
    io.emit('userCount', connectedUsers);
    
    // Welcome message to the connected user
    socket.emit('welcome', {
        message: 'Welcome to SIT725 MVC Real-time Project Manager!',
        socketId: socket.id,
        timestamp: new Date()
    });
    
    // Broadcast to all other users that someone joined
    socket.broadcast.emit('userJoined', {
        message: 'A new user joined the project manager',
        userCount: connectedUsers,
        timestamp: new Date()
    });

    // Handle project creation events
    socket.on('projectCreated', (data) => {
        projectUpdateCount++;
        console.log('Project created via socket:', data);
        
        // Broadcast to all other clients
        socket.broadcast.emit('newProject', {
            project: data,
            createdBy: socket.id,
            updateCount: projectUpdateCount,
            timestamp: new Date()
        });
        
        // Send confirmation to sender
        socket.emit('projectCreateConfirm', {
            message: 'Project broadcasted to all users',
            timestamp: new Date()
        });
    });

    // Handle project deletion events
    socket.on('projectDeleted', (data) => {
        projectUpdateCount++;
        console.log('Project deleted via socket:', data);
        
        // Broadcast to all other clients
        socket.broadcast.emit('projectRemoved', {
            projectId: data.projectId,
            deletedBy: socket.id,
            updateCount: projectUpdateCount,
            timestamp: new Date()
        });
    });

    // Handle project update events
    socket.on('projectUpdated', (data) => {
        projectUpdateCount++;
        console.log('Project updated via socket:', data);
        
        // Broadcast to all other clients
        socket.broadcast.emit('projectChanged', {
            project: data,
            updatedBy: socket.id,
            updateCount: projectUpdateCount,
            timestamp: new Date()
        });
    });

    // Handle chat messages
    socket.on('chatMessage', (data) => {
        console.log('Chat message received:', data);
        
        // Broadcast message to all clients including sender
        io.emit('chatMessage', {
            message: data.message,
            username: data.username || 'Anonymous',
            socketId: socket.id,
            timestamp: new Date()
        });
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
        socket.broadcast.emit('userTyping', {
            username: data.username || 'Anonymous',
            isTyping: data.isTyping
        });
    });

    // Handle project viewing
    socket.on('viewProject', (data) => {
        socket.broadcast.emit('projectViewed', {
            projectId: data.projectId,
            viewedBy: socket.id,
            timestamp: new Date()
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        connectedUsers--;
        console.log(`Client disconnected. Socket ID: ${socket.id}`);
        console.log(`Total connected users: ${connectedUsers}`);
        
        // Broadcast updated user count
        io.emit('userCount', connectedUsers);
        
        // Broadcast that user left
        socket.broadcast.emit('userLeft', {
            message: 'A user left the project manager',
            userCount: connectedUsers,
            timestamp: new Date()
        });
    });

    // Handle custom events for real-time collaboration
    socket.on('requestProjectSync', () => {
        // This would typically fetch current projects and send to requesting client
        socket.emit('projectSyncRequested', {
            message: 'Project sync requested - reload projects',
            timestamp: new Date()
        });
    });

    // Error handling for socket
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Socket.IO server is ready for connections`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, server, io };