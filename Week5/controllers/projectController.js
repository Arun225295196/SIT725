const { ProjectService } = require('../services');

class ProjectController {
    // Get all projects
    static async getAllProjects(req, res) {
        try {
            console.log('GET /api/projects - Getting all projects');
            const projects = ProjectService.getAllProjects();
            console.log('Found projects:', projects.length);
            
            res.status(200).json({
                success: true,
                data: projects,
                message: 'Projects retrieved successfully'
            });
        } catch (error) {
            console.error('Error in getAllProjects:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving projects',
                error: error.message
            });
        }
    }

    // Get project by ID
    static async getProjectById(req, res) {
        try {
            const { id } = req.params;
            console.log(`GET /api/projects/${id} - Getting project by ID`);
            
            const project = ProjectService.getProjectById(id);
            
            if (!project) {
                console.log(`Project with ID ${id} not found`);
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            res.status(200).json({
                success: true,
                data: project,
                message: 'Project retrieved successfully'
            });
        } catch (error) {
            console.error('Error in getProjectById:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving project',
                error: error.message
            });
        }
    }

    // Create new project
    static async createProject(req, res) {
        try {
            console.log('POST /api/projects - Creating new project');
            console.log('Request body:', req.body);
            
            // Validate required fields
            if (!req.body.title || !req.body.description) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and description are required'
                });
            }
            
            const project = ProjectService.createProject(req.body);
            console.log('Created project:', project);
            
            res.status(201).json({
                success: true,
                data: project,
                message: 'Project created successfully'
            });
        } catch (error) {
            console.error('Error in createProject:', error);
            res.status(400).json({
                success: false,
                message: 'Error creating project',
                error: error.message
            });
        }
    }

    // Update project
    static async updateProject(req, res) {
        try {
            const { id } = req.params;
            console.log(`PUT /api/projects/${id} - Updating project`);
            console.log('Request body:', req.body);
            
            const project = ProjectService.updateProject(id, req.body);
            
            if (!project) {
                console.log(`Project with ID ${id} not found for update`);
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            console.log('Updated project:', project);
            res.status(200).json({
                success: true,
                data: project,
                message: 'Project updated successfully'
            });
        } catch (error) {
            console.error('Error in updateProject:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating project',
                error: error.message
            });
        }
    }

    // Delete project
    static async deleteProject(req, res) {
        try {
            const { id } = req.params;
            console.log(`DELETE /api/projects/${id} - Deleting project`);
            
            const deleted = ProjectService.deleteProject(id);
            
            if (!deleted) {
                console.log(`Project with ID ${id} not found for deletion`);
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }

            console.log(`Project with ID ${id} deleted successfully`);
            res.status(200).json({
                success: true,
                message: 'Project deleted successfully'
            });
        } catch (error) {
            console.error('Error in deleteProject:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting project',
                error: error.message
            });
        }
    }

    // Get projects by category
    static async getProjectsByCategory(req, res) {
        try {
            const { category } = req.params;
            console.log(`GET /api/projects/category/${category} - Getting projects by category`);
            
            const projects = ProjectService.getProjectsByCategory(category);
            
            res.status(200).json({
                success: true,
                data: projects,
                message: `Projects in category '${category}' retrieved successfully`
            });
        } catch (error) {
            console.error('Error in getProjectsByCategory:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving projects by category',
                error: error.message
            });
        }
    }
}

module.exports = ProjectController;