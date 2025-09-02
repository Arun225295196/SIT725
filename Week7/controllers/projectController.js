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

            // Emit socket event for project view tracking
            const io = req.app.get('socketio');
            if (io) {
                io.emit('projectAccessed', {
                    projectId: id,
                    projectTitle: project.title,
                    timestamp: new Date()
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
            
            // Emit socket event for real-time updates
            const io = req.app.get('socketio');
            if (io) {
                io.emit('projectCreated', {
                    project: project,
                    message: `New project "${project.title}" was created!`,
                    timestamp: new Date()
                });
                console.log('Socket event emitted: projectCreated');
            }
            
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
            
            const oldProject = ProjectService.getProjectById(id);
            if (!oldProject) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }
            
            const project = ProjectService.updateProject(id, req.body);
            console.log('Updated project:', project);

            // Emit socket event for real-time updates
            const io = req.app.get('socketio');
            if (io) {
                io.emit('projectUpdated', {
                    project: project,
                    oldProject: oldProject,
                    message: `Project "${project.title}" was updated!`,
                    timestamp: new Date()
                });
                console.log('Socket event emitted: projectUpdated');
            }

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
            
            // Get project details before deletion for socket event
            const project = ProjectService.getProjectById(id);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    message: 'Project not found'
                });
            }
            
            const deleted = ProjectService.deleteProject(id);
            console.log(`Project with ID ${id} deleted successfully`);

            // Emit socket event for real-time updates
            const io = req.app.get('socketio');
            if (io) {
                io.emit('projectDeleted', {
                    projectId: id,
                    projectTitle: project.title,
                    message: `Project "${project.title}" was deleted!`,
                    timestamp: new Date()
                });
                console.log('Socket event emitted: projectDeleted');
            }

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
            
            // Emit socket event for category access tracking
            const io = req.app.get('socketio');
            if (io) {
                io.emit('categoryAccessed', {
                    category: category,
                    projectCount: projects.length,
                    timestamp: new Date()
                });
            }
            
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

    // New endpoint for real-time statistics
    static async getProjectStats(req, res) {
        try {
            const projects = ProjectService.getAllProjects();
            const stats = {
                totalProjects: projects.length,
                categories: {},
                recentProjects: projects.slice(-5).reverse()
            };

            // Count projects by category
            projects.forEach(project => {
                const category = project.category || 'Uncategorized';
                stats.categories[category] = (stats.categories[category] || 0) + 1;
            });

            // Emit socket event for stats access
            const io = req.app.get('socketio');
            if (io) {
                io.emit('statsAccessed', {
                    stats: stats,
                    timestamp: new Date()
                });
            }

            res.status(200).json({
                success: true,
                data: stats,
                message: 'Project statistics retrieved successfully'
            });
        } catch (error) {
            console.error('Error in getProjectStats:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving project statistics',
                error: error.message
            });
        }
    }
}

module.exports = ProjectController;