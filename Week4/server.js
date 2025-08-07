const mongoose = require('mongoose');
const express = require("express");

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myprojectDB', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// REST API route
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: 'Success' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Error fetching projects', error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
