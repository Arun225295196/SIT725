// Project model - defines the structure of our data
class Project {
    constructor(id, title, description, category, image, link) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.image = image;
        this.link = link;
        this.createdAt = new Date();
    }

    // Validation method
    validate() {
        if (!this.title || !this.description) {
            return { valid: false, message: 'Title and description are required' };
        }
        return { valid: true };
    }

    // Convert to JSON
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            image: this.image,
            link: this.link,
            createdAt: this.createdAt
        };
    }
}

module.exports = Project;