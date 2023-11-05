import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

interface CacheProviderProps {
  children: React.ReactNode;
}

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export function RTL({ children }: CacheProviderProps) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
