import { useQuery } from '@tanstack/react-query'
import { fetchPoses, fetchSequences } from '../lib/poses'

export function usePoses() {
  return useQuery({
    queryKey: ['poses'],
    queryFn: fetchPoses,
    staleTime: 5 * 60 * 1000,
  })
}

export function useSequences() {
  return useQuery({
    queryKey: ['sequences'],
    queryFn: fetchSequences,
    staleTime: 5 * 60 * 1000,
  })
}
