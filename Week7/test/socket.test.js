const request = require('supertest');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');
const { app } = require('../server');

describe('Socket.IO Integration Tests', () => {
    let httpServer;
    let httpServerAddr;
    let ioServer;
    let clientSocket;

    beforeAll((done) => {
        httpServer = createServer(app);
        httpServerAddr = httpServer.listen().address();
        ioServer = new Server(httpServer);
        
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            
            ioServer.on('connection', (socket) => {
                console.log('Test client connected');
            });
            
            clientSocket.on('connect', done);
        });
    });

    afterAll(() => {
        ioServer.close();
        httpServer.close();
        clientSocket.close();
    });

    test('should connect to socket server', (done) => {
        expect(clientSocket.connected).toBe(true);
        done();
    });

    test('should receive welcome message on connection', (done) => {
        clientSocket.on('welcome', (data) => {
            expect(data).toHaveProperty('message');
            expect(data).toHaveProperty('socketId');
            expect(data).toHaveProperty('timestamp');
            done();
        });
    });

    test('should receive user count updates', (done) => {
        clientSocket.on('userCount', (count) => {
            expect(typeof count).toBe('number');
            expect(count).toBeGreaterThan(0);
            done();
        });
    });

    test('should handle chat messages', (done) => {
        const testMessage = {
            message: 'Hello from test',
            username: 'TestUser'
        };

        clientSocket.on('chatMessage', (data) => {
            expect(data.message).toBe(testMessage.message);
            expect(data.username).toBe(testMessage.username);
            expect(data).toHaveProperty('timestamp');
            done();
        });

        clientSocket.emit('chatMessage', testMessage);
    });

    test('should handle project creation events', (done) => {
        const testProject = {
            id: 999,
            title: 'Test Project',
            description: 'Test Description',
            category: 'Testing'
        };

        clientSocket.on('newProject', (data) => {
            expect(data.project.title).toBe(testProject.title);
            expect(data).toHaveProperty('createdBy');
            expect(data).toHaveProperty('timestamp');
            done();
        });

        clientSocket.emit('projectCreated', testProject);
    });

    test('should handle project deletion events', (done) => {
        const testData = {
            projectId: 999
        };

        clientSocket.on('projectRemoved', (data) => {
            expect(data.projectId).toBe(testData.projectId);
            expect(data).toHaveProperty('deletedBy');
            expect(data).toHaveProperty('timestamp');
            done();
        });

        clientSocket.emit('projectDeleted', testData);
    });

    test('should handle typing indicators', (done) => {
        const typingData = {
            username: 'TestUser',
            isTyping: true
        };

        clientSocket.on('userTyping', (data) => {
            expect(data.username).toBe(typingData.username);
            expect(data.isTyping).toBe(typingData.isTyping);
            done();
        });

        clientSocket.emit('typing', typingData);
    });
});

describe('API Integration with Socket Events', () => {
    let app;
    
    beforeAll(() => {
        // Use the app from server.js
        app = require('../server').app;
    });

    test('should create project via API', async () => {
        const testProject = {
            title: 'API Test Project',
            description: 'Created via API test',
            category: 'Testing'
        };

        const response = await request(app)
            .post('/api/projects')
            .send(testProject)
            .expect(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data.title).toBe(testProject.title);
    });

    test('should get all projects via API', async () => {
        const response = await request(app)
            .get('/api/projects')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('should get project statistics', async () => {
        const response = await request(app)
            .get('/api/projects/stats')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('totalProjects');
        expect(response.body.data).toHaveProperty('categories');
        expect(response.body.data).toHaveProperty('recentProjects');
    });

    test('should handle invalid project creation', async () => {
        const invalidProject = {
            // Missing required fields
            category: 'Testing'
        };

        const response = await request(app)
            .post('/api/projects')
            .send(invalidProject)
            .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('required');
    });

    test('should handle non-existent project deletion', async () => {
        const response = await request(app)
            .delete('/api/projects/99999')
            .expect(404);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('not found');
    });
});