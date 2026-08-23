import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../lib/AuthContext'
import { fetchTodayEntry, saveTodayEntry } from '../lib/gratitude'

export function useTodayGratitude() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['gratitude', 'today', user?.id],
    queryFn: () => fetchTodayEntry(user!.id),
    enabled: !!user, // no point querying before we know who's asking
  })
}

export function useSaveGratitude() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (items: string[]) => saveTodayEntry(user!.id, items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gratitude', 'today', user?.id] })
    },
  })
}