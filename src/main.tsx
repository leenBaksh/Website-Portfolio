import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully suppress benign WebSocket and Vite HMR connection errors in the sandbox environment
if (typeof window !== 'undefined') {
  const isViteOrWS = (text: string | null | undefined): boolean => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return (
      lower.includes('websocket') ||
      lower.includes('vite') ||
      lower.includes('hmr') ||
      lower.includes('web-socket')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason?.message || String(reason || '');
    if (isViteOrWS(message)) {
      event.preventDefault();
      // Silently log to devtools only as warning to keep interface pristine
      console.warn('[HMR Sandbox Bypass] Suppressed unhandled websocket rejection:', message);
    }
  });

  window.addEventListener('error', (event) => {
    const message = event.message || '';
    if (isViteOrWS(message)) {
      event.preventDefault();
      console.warn('[HMR Sandbox Bypass] Suppressed websocket error:', message);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

