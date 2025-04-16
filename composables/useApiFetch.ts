export function useApiFetch<T>(path: string, options?: any) {
  const config = useRuntimeConfig()
  const baseURL = config.public.mousetubeApiURL
  const fullUrl = path.startsWith(baseURL) 
    ? path
    : baseURL.endsWith('/api') 
    ? `${baseURL}${path}`
    : `${baseURL}/api${path}`
  return useFetch<T>(fullUrl, {
    server: true,
    lazy: false,
    ...options,
  })
}