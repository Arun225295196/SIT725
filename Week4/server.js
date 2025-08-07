const mongoose = require('mongoose');
const express = require("express");

const app = express();
const port = process.env.PORT || 3004;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myprojectDB', {});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Define your schema and model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// Sample data (you'll need to define this)
const sampleProjects = [
    {
        title: "Sample Project 1",
        image: "image1.jpg",
        link: "http://example.com/project1",
        description: "This is a sample project description"
    },
    {
        title: "Sample Project 2",
        image: "image2.jpg", 
        link: "http://example.com/project2",
        description: "This is another sample project description"
    }
];

// Insert sample data
Project.insertMany(sampleProjects)
    .then(() => {
        console.log("Sample projects have been successfully installed and setup!");
    })
    .catch((error) => {
        console.log("Oops! There's an error:", error.message);
    });

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