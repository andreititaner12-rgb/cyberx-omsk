import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Что показывать вместо упавшей поддерева. null — просто скрыть. */
  fallback?: React.ReactNode;
  /** Метка лога, чтобы в консоли было понятно, какой блок упал. */
  label?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Граница ошибок: падение компонента не роняет весь сайт
 * (раньше любая ошибка в секции = чёрный экран).
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error(`[ErrorBoundary: ${this.props.label || 'unknown'}]`, error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
