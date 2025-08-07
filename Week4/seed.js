const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myprojectDB', {})
    .then(() => console.log('Connected to MongoDB for seeding'))
    .catch(err => console.error('MongoDB connection error:', err));

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// Sample data
const sampleProjects = [
    {
        title: "Kitten 2",
        image: "images/kitten-2.jpg",
        link: "About Kitten 2",
        desciption: "Demo description about kitten 2 - This adorable kitten loves to play with yarn balls!"
    },
    {
        title: "Kitten 3", 
        image: "images/kitten-3.jpg",
        link: "About Kitten 3",
        desciption: "Demo description about kitten 3 - This playful kitten enjoys sunny afternoons by the window."
    }
];

// Insert sample data
(async () => {
    try {
        await Project.deleteMany({}); // Optional: clear old data
        await Project.insertMany(sampleProjects);
        console.log("Sample projects inserted successfully!");
    } catch (err) {
        console.error("Error inserting sample projects:", err.message);
    } finally {
        mongoose.connection.close();
    }
})();
