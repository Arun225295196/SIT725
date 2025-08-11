const Project = require('../models/project');

// In-memory storage (replace with database in production)
let projects = [
    new Project(1, 'Sample Project 1', 'This is a sample project description', 'Web Development', 'https://via.placeholder.com/300', '#'),
    new Project(2, 'Sample Project 2', 'Another sample project', 'Mobile App', 'https://via.placeholder.com/300', '#'),
    new Project(3, 'Sample Project 3', 'Third sample project', 'Data Science', 'https://via.placeholder.com/300', '#')
];

let nextId = 4;

class ProjectService {
    // Get all projects
    static getAllProjects() {
        return projects;
    }

    // Get project by ID
    static getProjectById(id) {
        return projects.find(project => project.id === parseInt(id));
    }

    // Create new project
    static createProject(projectData) {
        const project = new Project(
            nextId++,
            projectData.title,
            projectData.description,
            projectData.category,
            projectData.image,
            projectData.link
        );

        const validation = project.validate();
        if (!validation.valid) {
            throw new Error(validation.message);
        }

        projects.push(project);
        return project;
    }

    // Update project
    static updateProject(id, projectData) {
        const index = projects.findIndex(project => project.id === parseInt(id));
        if (index === -1) {
            return null;
        }

        projects[index] = { ...projects[index], ...projectData };
        return projects[index];
    }

    // Delete project
    static deleteProject(id) {
        const index = projects.findIndex(project => project.id === parseInt(id));
        if (index === -1) {
            return false;
        }

        projects.splice(index, 1);
        return true;
    }

    // Get projects by category
    static getProjectsByCategory(category) {
        return projects.filter(project => 
            project.category.toLowerCase() === category.toLowerCase()
        );
    }
}

module.exports = ProjectService;