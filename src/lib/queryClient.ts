import { QueryClient } from '@tanstack/react-query'

// One shared QueryClient for the whole app — it's the cache React Query uses
// to dedupe requests and share fetched data (e.g. quotes) between components
// without prop-drilling or a Redux-style global store.
export const queryClient = new QueryClient()
