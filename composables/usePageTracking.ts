import { useRoute } from 'vue-router';
import { onMounted, watch } from 'vue';
import { useApiFetch } from '@composables/useApiFetch'

interface PageView {
  count: number;
  path: string;
  date: string;
}

export function usePageTracking() {
  const route = useRoute();

  onMounted(() => {
    trackPageVisit(route.path);
  });

  watch(
    () => route.path,
    (newPath: string) => {
      trackPageVisit(newPath);
    }
  );
}

export function trackPageVisit(path: string) {
  const { data, error } = useApiFetch<{ data: PageView }>(
    '/track-page/',
    {
      method: 'POST',
      body: { path },
    }
  );

  if (error.value) {
    // eslint-disable-next-line no-console
    console.error('Failed to track page visit', error.value);
  }
}