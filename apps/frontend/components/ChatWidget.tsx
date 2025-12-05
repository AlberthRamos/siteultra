import React, { useEffect } from 'react';

interface ChatWidgetProps {
  enabled?: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ enabled = true }) => {
  useEffect(() => {
    if (!enabled) return;

    // Tawk.to integration
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_TAWK_ID/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [enabled]);

  return null;
};

export default ChatWidget;
