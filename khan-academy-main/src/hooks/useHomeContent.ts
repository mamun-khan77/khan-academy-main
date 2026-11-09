import { useCallback, useEffect, useState } from 'react';
import { fetchHomeContent } from '@/lib/homeContent';
import type { HomeContent } from '@/types/content';

type HomeState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; content: HomeContent };

export function useHomeContent() {
  const [state, setState] = useState<HomeState>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    fetchHomeContent()
      .then((content) => setState({ status: 'ready', content }))
      .catch((error: unknown) => {
        console.error(error);
        setState({ status: 'error' });
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { state, reload: load };
}
