const mongoose = require('mongoose');

const newsArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    keywords: [String],
    author: {
        type: String,
        default: 'Ultra News AI'
    },
    published: {
        type: Boolean,
        default: true
    },
    published_at: {
        type: Date,
        default: Date.now,
        index: true
    },
    views: {
        type: Number,
        default: 0
    },
    image_url: {
        type: String
    },
    seo: {
        meta_title: String,
        meta_description: String,
        og_title: String,
        og_description: String,
        structured_data: Object
    },
    source: {
        title: String,
        url: String
    }
}, {
    timestamps: true
});

// Create slug from title before saving
newsArticleSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

module.exports = mongoose.model('NewsArticle', newsArticleSchema);
