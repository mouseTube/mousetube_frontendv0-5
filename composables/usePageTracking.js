// composables/usePageTracking.js
import { useRoute } from 'vue-router';
import { onMounted, watch } from 'vue';
import axios from 'axios';

const apiBaseUrl = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export function usePageTracking() {
  const route = useRoute();

  onMounted(() => {
    trackPageVisit(route.path);
  });

  watch(
    () => route.path,
    (newPath) => {
      trackPageVisit(newPath);
    }
  );
}

// send API request to record page visits
function trackPageVisit(path) {
  axios.post(`${apiBaseUrl}/track-page/`, { path }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Failed to track page visit', error);
  });
}
