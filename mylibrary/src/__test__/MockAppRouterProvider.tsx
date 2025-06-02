import React, { ReactNode } from 'react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function MockAppRouterProvider({ children }: { children: ReactNode }) {
  const router = {
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    basePath: '',
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    reload: () => {},
    back: () => {},
    prefetch: () => Promise.resolve(),
    beforePopState: () => {},
    isFallback: false,
    isReady: true,
    isPreview: false,
    locale: undefined,
    locales: [],
    defaultLocale: undefined,
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    forward: () => {},
    refresh: () => {},
  };

  return (
    <AppRouterContext.Provider value={router}>
      {children}
    </AppRouterContext.Provider>
  );
}
