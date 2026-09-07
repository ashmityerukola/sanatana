import { QueryClient } from '@tanstack/react-query'

// One shared QueryClient for the whole app — it's the cache React Query uses
// to dedupe requests and share fetched data (e.g. quotes) between components
// without prop-drilling or a Redux-style global store.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // React Query's own default is 3 silent retries with exponential
      // backoff (~1s, 2s, 4s) before a failed query ever reports an error.
      // During a real outage that makes every page look frozen on "Loading..."
      // for 7+ seconds with no indication anything is wrong -- this happened
      // for real when the Supabase project got paused. One retry still
      // absorbs a single transient blip, but surfaces a genuine failure in
      // roughly a second instead of leaving the user staring at a spinner.
      retry: 1,
    },
  },
})
