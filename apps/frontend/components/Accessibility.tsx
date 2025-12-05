import React, { useEffect } from 'react';

interface AccessibilityProps {
  skipToContent?: boolean;
}

const Accessibility: React.FC<AccessibilityProps> = ({ skipToContent = true }) => {
  useEffect(() => {
    // Add keyboard navigation hints
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    };

    window.addEventListener('keydown', handleFirstTab);

    // Announce page changes to screen readers
    const announcePageChange = () => {
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Navegou para ${document.title}`;
      document.body.appendChild(announcement);

      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    announcePageChange();

    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);

  return (
    <>
      {/* Screen reader only text */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        /* Focus visible for keyboard users */
        body.user-is-tabbing *:focus {
          outline: 2px solid #38BDF8 !important;
          outline-offset: 2px !important;
        }
        
        /* Reduced motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Skip to main content link */}
      {skipToContent && (
        <a
          href="#main-content"
          className="focus:bg-ultra-accent sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Pular para o conteúdo principal
        </a>
      )}
    </>
  );
};

export default Accessibility;
