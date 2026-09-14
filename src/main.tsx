import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const AppFallback: React.FC<{ error?: string }> = ({ error }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#050507] px-6">
    <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-cyberx-surface p-8 text-center">
      <div className="mx-auto mb-5 h-11 w-11 rounded-2xl border border-cyberx-red/40 bg-cyberx-red/10 flex items-center justify-center">
        <span className="font-display font-extrabold text-cyberx-red">!</span>
      </div>
      <div className="font-display font-extrabold uppercase text-white text-lg tracking-tight">
        Что-то пошло не так
      </div>
      <p className="mt-2 text-[12px] font-mono text-cyberx-muted leading-relaxed">
        Сайт встретил непредвиденную ошибку. Обновите страницу — данные не
        потеряются.
      </p>
      {error && (
        <pre className="mt-4 text-left text-[10px] font-mono text-cyberx-faint bg-black/40 border border-white/[0.06] rounded-xl p-3 overflow-auto max-h-32 whitespace-pre-wrap break-words">
          {error}
        </pre>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 w-full py-3 rounded-xl bg-cyberx-red hover:bg-[#FF2A2E] text-white eyebrow font-semibold transition-colors"
      >
        Обновить страницу
      </button>
    </div>
  </div>
);

/**
 * Граница ошибок уровня приложения: любая ошибка в любой секции больше
 * не даёт чёрный экран — показывается карточка с текстом ошибки и кнопкой
 * обновления.
 */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error('[RootErrorBoundary]', error);
  }

  render() {
    if (this.state.error) {
      return <AppFallback error={this.state.error.message} />;
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
);
