const ProjectService = require('../services/projectService');
const Project = require('../models/project');

describe('ProjectService', () => {
    beforeEach(() => {
        // Reset projects to initial state before each test
        // Note: This is a simplified approach for testing
        // In a real application, you'd want to use a test database
    });

    describe('getAllProjects', () => {
        test('should return array of projects', () => {
            const projects = ProjectService.getAllProjects();
            expect(Array.isArray(projects)).toBe(true);
            expect(projects.length).toBeGreaterThanOrEqual(0);
        });

        test('should return projects with correct properties', () => {
            const projects = ProjectService.getAllProjects();
            if (projects.length > 0) {
                const project = projects[0];
                expect(project).toHaveProperty('id');
                expect(project).toHaveProperty('title');
                expect(project).toHaveProperty('description');
                expect(project).toHaveProperty('category');
                expect(project).toHaveProperty('createdAt');
            }
        });
    });

    describe('createProject', () => {
        test('should create a new project with valid data', () => {
            const projectData = {
                title: 'Test Project',
                description: 'Test Description',
                category: 'Testing',
                image: 'http://example.com/image.jpg',
                link: 'http://example.com'
            };

            const project = ProjectService.createProject(projectData);
            
            expect(project).toBeInstanceOf(Project);
            expect(project.title).toBe(projectData.title);
            expect(project.description).toBe(projectData.description);
            expect(project.category).toBe(projectData.category);
            expect(project.id).toBeDefined();
            expect(project.createdAt).toBeInstanceOf(Date);
        });

        test('should throw error for invalid data', () => {
            const invalidData = {
                // Missing required title and description
                category: 'Testing'
            };

            expect(() => {
                ProjectService.createProject(invalidData);
            }).toThrow();
        });

        test('should handle empty title', () => {
            const invalidData = {
                title: '',
                description: 'Valid description'
            };

            expect(() => {
                ProjectService.createProject(invalidData);
            }).toThrow();
        });

        test('should handle empty description', () => {
            const invalidData = {
                title: 'Valid title',
                description: ''
            };

            expect(() => {
                ProjectService.createProject(invalidData);
            }).toThrow();
        });
    });

    describe('getProjectById', () => {
        test('should return project when valid ID is provided', () => {
            const projects = ProjectService.getAllProjects();
            if (projects.length > 0) {
                const firstProject = projects[0];
                const foundProject = ProjectService.getProjectById(firstProject.id);
                
                expect(foundProject).toBeDefined();
                expect(foundProject.id).toBe(firstProject.id);
                expect(foundProject.title).toBe(firstProject.title);
            }
        });

        test('should return undefined for non-existent ID', () => {
            const nonExistentProject = ProjectService.getProjectById(99999);
            expect(nonExistentProject).toBeUndefined();
        });

        test('should handle string ID', () => {
            const projects = ProjectService.getAllProjects();
            if (projects.length > 0) {
                const firstProject = projects[0];
                const foundProject = ProjectService.getProjectById(firstProject.id.toString());
                
                expect(foundProject).toBeDefined();
                expect(foundProject.id).toBe(firstProject.id);
            }
        });
    });

    describe('updateProject', () => {
        test('should update existing project', () => {
            const projects = ProjectService.getAllProjects();
            if (projects.length > 0) {
                const firstProject = projects[0];
                const updateData = {
                    title: 'Updated Title',
                    description: 'Updated Description'
                };
                
                const updatedProject = ProjectService.updateProject(firstProject.id, updateData);
                
                expect(updatedProject).toBeDefined();
                expect(updatedProject.title).toBe(updateData.title);
                expect(updatedProject.description).toBe(updateData.description);
                expect(updatedProject.id).toBe(firstProject.id);
            }
        });

        test('should return null for non-existent project', () => {
            const updateData = { title: 'Updated Title' };
            const result = ProjectService.updateProject(99999, updateData);
            
            expect(result).toBeNull();
        });

        test('should partially update project', () => {
            const projects = ProjectService.getAllProjects();
            if (projects.length > 0) {
                const firstProject = projects[0];
                const originalDescription = firstProject.description;
                const updateData = {
                    title: 'Only Title Updated'
                };
                
                const updatedProject = ProjectService.updateProject(firstProject.id, updateData);
                
                expect(updatedProject.title).toBe(updateData.title);
                expect(updatedProject.description).toBe(originalDescription);
            }
        });
    });

    describe('deleteProject', () => {
        test('should delete existing project', () => {
            // Create a project first
            const projectData = {
                title: 'Project to Delete',
                description: 'This project will be deleted'
            };
            const createdProject = ProjectService.createProject(projectData);
            
            // Delete the project
            const result = ProjectService.deleteProject(createdProject.id);
            
            expect(result).toBe(true);
            
            // Verify project is deleted
            const deletedProject = ProjectService.getProjectById(createdProject.id);
            expect(deletedProject).toBeUndefined();
        });

        test('should return false for non-existent project', () => {
            const result = ProjectService.deleteProject(99999);
            expect(result).toBe(false);
        });
    });

    describe('getProjectsByCategory', () => {
        test('should return projects matching category', () => {
            const category = 'Web Development';
            const projects = ProjectService.getProjectsByCategory(category);
            
            expect(Array.isArray(projects)).toBe(true);
            projects.forEach(project => {
                expect(project.category.toLowerCase()).toBe(category.toLowerCase());
            });
        });

        test('should return empty array for non-existent category', () => {
            const projects = ProjectService.getProjectsByCategory('NonExistentCategory');
            expect(Array.isArray(projects)).toBe(true);
            expect(projects.length).toBe(0);
        });

        test('should be case insensitive', () => {
            const projects1 = ProjectService.getProjectsByCategory('web development');
            const projects2 = ProjectService.getProjectsByCategory('Web Development');
            const projects3 = ProjectService.getProjectsByCategory('WEB DEVELOPMENT');
            
            expect(projects1.length).toBe(projects2.length);
            expect(projects2.length).toBe(projects3.length);
        });
    });
});