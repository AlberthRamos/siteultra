import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Ultra Systems | Inteligência Tributária e Red Team',
  description = 'Recuperação Tributária (Ultra Tax) e Cibersegurança Ofensiva (Ultra Security). Red Team, Pentest, Lucro Real e Compliance Fiscal.',
  keywords = 'recuperação tributária, cibersegurança, pentest, red team, compliance fiscal, lucro real, ultra tax, ultra security',
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);
  }, [title, description, keywords]);

  return null;
};

export default SEO;
