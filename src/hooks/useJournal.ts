import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../lib/AuthContext'
import { createJournalEntry, deleteJournalEntry, fetchJournalEntries } from '../lib/journal'

export function useJournalEntries() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['journal', user?.id],
    queryFn: () => fetchJournalEntries(user!.id),
    enabled: !!user,
  })
}

export function useCreateJournalEntry() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ text, prompt }: { text: string; prompt: string | null }) =>
      createJournalEntry(user!.id, text, prompt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal', user?.id] })
    },
  })
}

export function useDeleteJournalEntry() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteJournalEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journal', user?.id] })
    },
  })
}