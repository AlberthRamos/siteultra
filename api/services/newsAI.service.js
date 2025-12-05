const axios = require('axios');

/**
 * NewsAIService - Serviço de geração automática de notícias com IA
 * Integração com News APIs e OpenAI para criar conteúdo original
 */
class NewsAIService {
    constructor() {
        this.newsApiKey = process.env.NEWS_API_KEY;
        this.openaiApiKey = process.env.OPENAI_API_KEY;

        // Categorias relevantes para Ultra Tax
        this.categories = [
            'tributário',
            'impostos',
            'economia',
            'legislação fiscal',
            'compliance',
            'auditoria'
        ];

        this.keywords = [
            'ICMS', 'PIS', 'COFINS', 'reforma tributária',
            'créditos tributários', 'fiscalização', 'STF tributário'
        ];
    }

    /**
     * Buscar notícias recentes via API
     * @param {string} category - Categoria de notícias
     * @returns {Promise<Array>} Lista de notícias
     */
    async fetchNews(category = 'tributário') {
        try {
            // Opção 1: NewsAPI.ai (preferencial)
            if (this.newsApiKey) {
                return await this.fetchFromNewsAPI(category);
            }

            // Fallback: GNews API
            return await this.fetchFromGNews(category);

        } catch (error) {
            console.error('Erro ao buscar notícias:', error.message);
            return [];
        }
    }

    /**
     * Buscar via NewsAPI.ai
     */
    async fetchFromNewsAPI(category) {
        const response = await axios.get('https://api.newsapi.ai/api/v1/article/getArticles', {
            params: {
                apiKey: this.newsApiKey,
                query: JSON.stringify({
                    $query: {
                        $and: [
                            { conceptUri: this.getCategoryUri(category) },
                            { lang: 'por' }
                        ]
                    },
                    $filter: {
                        forceMaxDataTimeWindow: '7'
                    }
                }),
                resultType: 'articles',
                articlesSortBy: 'date',
                articlesCount: 10
            }
        });

        return response.data.articles.results || [];
    }

    /**
     * Buscar via GNews (fallback gratuito)
     */
    async fetchFromGNews(category) {
        // GNews API - grátis com limite
        const response = await axios.get('https://gnews.io/api/v4/search', {
            params: {
                q: `${category} brasil`,
                lang: 'pt',
                country: 'br',
                max: 10,
                apikey: process.env.GNEWS_API_KEY || 'demo' // Use demo para teste
            }
        });

        return response.data.articles || [];
    }

    /**
     * Gerar artigo original com IA
     * @param {Object} newsSource - Notícia fonte
     * @returns {Promise<Object>} Artigo gerado
     */
    async generateArticle(newsSource) {
        try {
            const prompt = this.buildPrompt(newsSource);

            // Gerar conteúdo com OpenAI
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: 'Você é um jornalista especializado em tributação e direito fiscal brasileiro. Escreva artigos informativos, precisos e otimizados para SEO.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 2000,
                    temperature: 0.7
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.openaiApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const content = response.data.choices[0].message.content;

            return {
                title: this.extractTitle(content),
                content: this.cleanContent(content),
                excerpt: this.generateExcerpt(content),
                keywords: this.extractKeywords(content),
                category: this.categorizeArticle(content),
                seo_data: this.generateSEOData(content, newsSource)
            };

        } catch (error) {
            console.error('Erro ao gerar artigo:', error.message);
            return null;
        }
    }

    /**
     * Construir prompt para IA
     */
    buildPrompt(newsSource) {
        return `
Com base na seguinte notícia, escreva um artigo original e informativo para o blog Ultra News:

Título Original: ${newsSource.title}
Resumo: ${newsSource.description || newsSource.summary}

INSTRUÇÕES:
1. Crie um título atrativo e otimizado para SEO (60-70 caracteres)
2. Escreva um artigo de 800-1000 palavras
3. Use linguagem clara e profissional
4. Inclua informações relevantes sobre o impacto para empresas brasileiras
5. Adicione análise e contexto tributário
6. Termine com conclusão e próximos passos

FORMATO:
# [Título]

[Introdução - 2 parágrafos]

## Contexto
[Explicação do contexto tributário]

## Impactos
[Análise dos impactos para empresas]

## Recomendações
[Sugestões práticas]

## Conclusão
[Resumo e fechamento]
`;
    }

    /**
     * Extrair título do conteúdo gerado
     */
    extractTitle(content) {
        const match = content.match(/^#\s+(.+)$/m);
        return match ? match[1].trim() : 'Sem título';
    }

    /**
     * Limpar conteúdo (remover markdown desnecessário)
     */
    cleanContent(content) {
        return content
            .replace(/^#\s+.+$/m, '') // Remove título
            .trim();
    }

    /**
     * Gerar resumo/excerpt
     */
    generateExcerpt(content) {
        const firstParagraph = content.split('\n\n')[1] || '';
        return firstParagraph.substring(0, 200) + '...';
    }

    /**
     * Extrair keywords do conteúdo
     */
    extractKeywords(content) {
        const keywords = [];

        // Buscar keywords predefinidas
        this.keywords.forEach(kw => {
            if (content.toLowerCase().includes(kw.toLowerCase())) {
                keywords.push(kw);
            }
        });

        // Adicionar categoria
        this.categories.forEach(cat => {
            if (content.toLowerCase().includes(cat)) {
                keywords.push(cat);
            }
        });

        return [...new Set(keywords)]; // Remove duplicatas
    }

    /**
     * Categorizar artigo automaticamente
     */
    categorizeArticle(content) {
        const lowerContent = content.toLowerCase();

        if (lowerContent.includes('icms') || lowerContent.includes('pis')) {
            return 'Recuperação Tributária';
        }
        if (lowerContent.includes('reforma') || lowerContent.includes('legislação')) {
            return 'Legislação';
        }
        if (lowerContent.includes('stf') || lowerContent.includes('justiça')) {
            return 'Jurisprudência';
        }
        if (lowerContent.includes('compliance') || lowerContent.includes('auditoria')) {
            return 'Compliance';
        }

        return 'Tributário';
    }

    /**
     * Gerar dados de SEO otimizados
     */
    generateSEOData(content, source) {
        const title = this.extractTitle(content);

        return {
            meta_title: title,
            meta_description: this.generateExcerpt(content),
            og_title: title,
            og_description: this.generateExcerpt(content),
            og_image: source.image || 'https://ultrasystems.com.br/og-image.jpg',
            structured_data: this.generateStructuredData(title, content, source)
        };
    }

    /**
     * Gerar Schema.org structured data
     */
    generateStructuredData(title, content, source) {
        return {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: title,
            image: source.image || 'https://ultrasystems.com.br/default-image.jpg',
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
            author: {
                '@type': 'Organization',
                name: 'Ultra News',
                url: 'https://ultrasystems.com.br'
            },
            publisher: {
                '@type': 'Organization',
                name: 'Ultra Systems',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://ultrasystems.com.br/logo.png'
                }
            },
            description: this.generateExcerpt(content)
        };
    }

    /**
     * Gerar múltiplos artigos de uma vez
     * @param {number} count - umber de artigos a gerar
     * @returns {Promise<Array>} Lista de artigos
     */
    async generateMultipleArticles(count = 5) {
        try {
            const articles = [];

            // Buscar notícias
            const news = await this.fetchNews();

            // Gerar artigos (limitado ao número de notícias disponíveis)
            const limit = Math.min(count, news.length);

            for (let i = 0; i < limit; i++) {
                const article = await this.generateArticle(news[i]);
                if (article) {
                    articles.push({
                        ...article,
                        source: news[i].title,
                        generated_at: new Date()
                    });
                }

                // Delay para evitar rate limit
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            return articles;

        } catch (error) {
            console.error('Erro ao gerar múltiplos artigos:', error.message);
            return [];
        }
    }

    /**
     * Obter URI de categoria (para NewsAPI.ai)
     */
    getCategoryUri(category) {
        const categoryMap = {
            'tributário': 'dmoz/Business/Financial_Services/Tax_Preparation_and_Planning',
            'impostos': 'dmoz/Business/Financial_Services',
            'economia': 'dmoz/Business/Economics',
            'legislação fiscal': 'dmoz/Society/Law'
        };

        return categoryMap[category] || categoryMap['tributário'];
    }
}

module.exports = new NewsAIService();
