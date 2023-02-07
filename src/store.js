import { create } from 'zustand'

export const useAppStore = create((set) => ({
    comments: [],
    setComments: (comments) => set({ comments }),
    deleteModalState: false,
    setDeleteModalState: (deleteModalState) => set({ deleteModalState }),
    currentUser: null,
    setCurrentUser: (currentUser) => set({ currentUser }),
}));