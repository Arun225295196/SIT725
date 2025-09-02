// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    loadProjects();
});

// API base URL
const API_BASE = '/api';

// Load all projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE}/projects`);
        const result = await response.json();
        
        if (result.success) {
            displayProjects(result.data);
        } else {
            M.toast({html: 'Error loading projects', classes: 'red'});
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        M.toast({html: 'Network error loading projects', classes: 'red'});
    }
}

// Display projects in the grid
function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    if (projects.length === 0) {
        container.innerHTML = `
            <div class="col s12">
                <div class="card-panel center-align">
                    <h5>No projects yet</h5>
                    <p>Click "Add Project" to create your first project!</p>
                </div>
            </div>
        `;
        return;
    }
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        container.innerHTML += projectCard;
    });
}

// Create project card HTML
function createProjectCard(project) {
    return `
        <div class="col s12 m6 l4">
            <div class="card">
                <div class="card-image">
                    <img src="${project.image || 'https://via.placeholder.com/300'}" alt="${project.title}">
                    <span class="card-title">${project.title}</span>
                </div>
                <div class="card-content">
                    <p>${project.description}</p>
                    <div class="chip">${project.category || 'Uncategorized'}</div>
                </div>
                <div class="card-action">
                    <a href="${project.link || '#'}" target="_blank">View Project</a>
                    <a href="#" onclick="deleteProject(${project.id})" class="red-text">Delete</a>
                </div>
            </div>
        </div>
    `;
}

// Open add project modal
function openAddModal() {
    const modal = M.Modal.getInstance(document.getElementById('addProjectModal'));
    if (modal) {
        modal.open();
    } else {
        console.error('Modal not initialized');
        M.toast({html: 'Error opening modal', classes: 'red'});
    }
}

// Add new project
async function addProject() {
    console.log('Add project function called');
    
    // Get form values
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value.trim();
    const link = document.getElementById('link').value.trim();
    
    // Basic validation
    if (!title || !description) {
        M.toast({html: 'Title and description are required', classes: 'red'});
        return;
    }
    
    const formData = {
        title: title,
        description: description,
        category: category || 'Uncategorized',
        image: image || 'https://via.placeholder.com/300',
        link: link || '#'
    };
    
    console.log('Form data:', formData);
    
    try {
        const response = await fetch(`${API_BASE}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response data:', result);
        
        if (result.success) {
            M.toast({html: 'Project added successfully!', classes: 'green'});
            const modal = M.Modal.getInstance(document.getElementById('addProjectModal'));
            modal.close();
            document.getElementById('addProjectForm').reset();
            
            // Reinitialize select after reset
            const selectElem = document.getElementById('category');
            const selectInstance = M.FormSelect.getInstance(selectElem);
            if (selectInstance) {
                selectInstance.destroy();
                M.FormSelect.init(selectElem);
            }
            
            // Reload projects
            loadProjects();
        } else {
            M.toast({html: result.message || 'Error adding project', classes: 'red'});
        }
    } catch (error) {
        console.error('Error adding project:', error);
        M.toast({html: 'Network error adding project', classes: 'red'});
    }
}

// Delete project
async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/projects/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            M.toast({html: 'Project deleted successfully!', classes: 'green'});
            loadProjects();
        } else {
            M.toast({html: result.message || 'Error deleting project', classes: 'red'});
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        M.toast({html: 'Network error deleting project', classes: 'red'});
    }
}
// Initialize Socket.IO
const socket = io();

// Socket event listeners
socket.on('connect', () => {
    console.log('Connected to server');
    document.getElementById('status').textContent = 'Connected';
});

socket.on('welcome', (message) => {
    console.log('Welcome message:', message);
});

socket.on('number', (num) => {
    console.log('Random number received:', num);
    document.getElementById('number').textContent = num;
});

socket.on('message', (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `Message: ${data}`;
    messagesDiv.appendChild(messageElement);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    document.getElementById('status').textContent = 'Disconnected';
});

// Function to send messages
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (message) {
        socket.emit('message', message);
        input.value = '';
    }
}