import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag, BookOpen, TrendingUp, Filter } from 'lucide-react';

interface Article {
    _id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    published_at: string;
    image_url?: string;
}

// Mock data for initial dev (will integrate with API later)
const MOCK_ARTICLES: Article[] = [
    {
        _id: '1',
        title: 'Reforma Tributária: O que muda para o setor de serviços em 2025?',
        excerpt: 'Análise detalhada sobre as novas alíquotas do IVA e o impacto direto nas empresas de lucro presumido. Entenda os prazos de transição.',
        category: 'Tributário',
        author: 'Ultra News AI',
        published_at: '2025-05-12T10:00:00Z',
        image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
    },
    {
        _id: '2',
        title: 'Cibersegurança e Compliance Fiscal: A nova fronteira',
        excerpt: 'Como a proteção de dados financeiros se tornou um requisito obrigatório para auditorias digitais da Receita Federal.',
        category: 'Tecnologia',
        author: 'Ultra Security',
        published_at: '2025-05-11T14:30:00Z',
        image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    },
    {
        _id: '3',
        title: 'Recuperação de Créditos PIS/COFINS: Guia Completo',
        excerpt: 'Descubra oportunidades ocultas na sua contabilidade dos últimos 5 anos. Nossa IA identificou padrões de recuperação inéditos.',
        category: 'Finanças',
        author: 'Ultra Tax',
        published_at: '2025-05-10T09:15:00Z',
        image_url: 'https://images.unsplash.com/photo-1554224154-260327c00c40?auto=format&fit=crop&q=80&w=800'
    }
];

const UltraNews: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
    const [loading, setLoading] = useState(false);

    const categories = ['Todas', 'Tributário', 'Tecnologia', 'Finanças', 'Compliance'];

    // Fetch from API
    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        setLoading(true);
        try {
            // Using default API URL (assumed localhost:3001 if mostly hardcoded, or env)
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(`${API_URL}/api/news`);
            const data = await response.json();

            if (data.success && data.data.length > 0) {
                setArticles(data.data);
            } else {
                console.log('Using mock data (API returned empty or error)');
                setArticles(MOCK_ARTICLES);
            }
        } catch (error) {
            console.error('Error loading articles:', error);
            setArticles(MOCK_ARTICLES);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ultra-dark pt-20 font-sans text-slate-300">

            {/* Hero Section */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
                <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 inline-block rounded-full border border-blue-500/30 bg-blue-900/30 px-4 py-1"
                    >
                        <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
                        <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                            Inteligência Artificial em Ação
                        </span>
                    </motion.div>
                    <h1 className="font-display mb-6 text-5xl font-bold text-white md:text-7xl">
                        Ultra News <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Portal</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-gray-400">
                        Fique à frente do mercado com análises tributárias e tendências de segurança geradas diariamente por nossa IA.
                    </p>

                    {/* Search Bar */}
                    <div className="mx-auto mt-12 max-w-3xl">
                        <div className="relative group">
                            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 opacity-25 transition duration-1000 group-hover:opacity-75 blur"></div>
                            <div className="relative flex items-center rounded-lg bg-slate-800 p-2 shadow-xl border border-slate-700">
                                <Search className="ml-4 h-6 w-6 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar notícias, leis ou tendências..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none text-lg"
                                />
                                <button className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-500">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Categories */}
                <div className="mb-12 flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full border px-6 py-2 text-sm font-medium transition-all ${selectedCategory === category
                                ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                                : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600 hover:text-white'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Article (First one) */}
                {articles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 grid gap-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 lg:grid-cols-2"
                    >
                        <div className="h-64 lg:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${articles[0].image_url})` }} />
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="mb-4 flex items-center space-x-2 text-sm text-blue-400">
                                <Tag size={16} />
                                <span className="uppercase tracking-wide">{articles[0].category}</span>
                            </div>
                            <h2 className="mb-6 text-3xl font-bold text-white leading-tight">
                                {articles[0].title}
                            </h2>
                            <p className="mb-8 text-lg text-gray-400">
                                {articles[0].excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                                        AI
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-white font-medium">{articles[0].author}</p>
                                        <p className="text-gray-500">{new Date(articles[0].published_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                                    <span className="font-semibold">Ler artigo</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Articles Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.slice(1).map((article, index) => (
                        <motion.div
                            key={article._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-600 hover:bg-slate-800"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.image_url}
                                    alt={article.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 rounded bg-slate-900/80 px-2 py-1 text-xs font-bold text-white backdrop-blur-md uppercase tracking-wider">
                                    {article.category}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex items-center space-x-2 text-xs text-gray-500">
                                    <Calendar size={14} />
                                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <User size={14} />
                                    <span>{article.author}</span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                                    {article.title}
                                </h3>
                                <p className="mb-6 flex-1 text-sm text-gray-400 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="mt-auto border-t border-slate-800 pt-4">
                                    <button className="flex w-full items-center justify-between text-sm font-medium text-gray-400 transition-colors group-hover:text-white">
                                        <span>Ler completo</span>
                                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <section className="mt-24 rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-800/50 p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    <div className="relative z-10 mx-auto max-w-2xl">
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
                            <BookOpen size={32} />
                        </div>
                        <h2 className="mb-4 text-3xl font-bold text-white">
                            Receba o Ultra Digest
                        </h2>
                        <p className="mb-8 text-lg text-gray-300">
                            As principais notícias tributárias e de segurança cibernética compiladas pela nossa IA diretamente no seu inbox toda semana.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <input
                                type="email"
                                placeholder="seu@corporate-email.com"
                                className="flex-1 rounded-lg bg-slate-900/80 px-4 py-3 text-white placeholder-gray-500 border border-slate-700 focus:outline-none focus:border-blue-500"
                            />
                            <button className="rounded-lg bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-500 transition-colors">
                                Inscrever-se
                            </button>
                        </div>
                        <p className="mt-4 text-xs text-gray-500">
                            Junte-se a 5.000+ CFOs e gestores de TI. Zero spam.
                        </p>
                    </div>
                </section>

            </section>
        </div>
    );
};

export default UltraNews;
