const express = require('express');
const router = express.Router();
const { ProjectController } = require('../controllers');

// GET /api/projects/stats - Get project statistics (must come before /:id)
router.get('/stats', ProjectController.getProjectStats);

// GET /api/projects/category/:category - Get projects by category (must come before /:id)
router.get('/category/:category', ProjectController.getProjectsByCategory);

// GET /api/projects - Get all projects
router.get('/', ProjectController.getAllProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', ProjectController.getProjectById);

// POST /api/projects - Create new project
router.post('/', ProjectController.createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', ProjectController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;