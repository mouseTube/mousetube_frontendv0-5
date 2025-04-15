// composables/usePageTracking.js
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import axios from 'axios'

export function usePageTracking() {
  const route = useRoute()

  onMounted(() => {
    trackPageVisit(route.path)
  })

  watch(
    () => route.path,
    (newPath) => {
      trackPageVisit(newPath)
    }
  )
}

// send API request to record page visits
function trackPageVisit(path) {
  axios.post('http://127.0.0.1:8000/api/track-page/', { path })
    .catch((error) => {
      console.error('Failed to track page visit', error)
    })
}