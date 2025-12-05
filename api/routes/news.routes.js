const express = require('express');
const router = express.Router();
const newsAI = require('../services/newsAI.service');
const NewsArticle = require('../models/NewsArticle');

// GET /api/news - Listar notícias
router.get('/', async (req, res) => {
    try {
        const { category, limit = 10, page = 1 } = req.query;

        const query = { published: true };
        if (category && category !== 'Todas') {
            query.category = category;
        }

        const articles = await NewsArticle.find(query)
            .sort({ published_at: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await NewsArticle.countDocuments(query);

        res.json({
            success: true,
            data: articles,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/news/generate - Trigger manual de geração (Admin only)
router.get('/generate', async (req, res) => {
    try {
        const count = req.query.count || 3;
        console.log(`🤖 Iniciando geração de ${count} artigos...`);

        const generatedArticles = await newsAI.generateMultipleArticles(count);

        // Salvar no banco
        const savedArticles = [];
        for (const art of generatedArticles) {
            const newArticle = new NewsArticle(art);
            await newArticle.save();
            savedArticles.push(newArticle);
        }

        res.json({
            success: true,
            message: `${savedArticles.length} artigos gerados com sucesso!`,
            data: savedArticles
        });
    } catch (error) {
        console.error('Erro na geração:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/news/:slug - Detalhes da notícia
router.get('/:slug', async (req, res) => {
    try {
        const article = await NewsArticle.findOne({ slug: req.params.slug });

        if (!article) {
            return res.status(404).json({ success: false, message: 'Artigo não encontrado' });
        }

        // Increment view count
        article.views += 1;
        await article.save();

        res.json({ success: true, data: article });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
