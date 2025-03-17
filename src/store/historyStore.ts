import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidv4 } from 'uuid'
import { GameStats, HistoryStore } from './types'

// ===== LocalStorage key for saved games =====
const STORAGE_KEY = 'memory-game-history'

const getStoredHistory = (): GameStats[] => {
  try {
    const storedHistory = localStorage.getItem(STORAGE_KEY)
    return storedHistory ? JSON.parse(storedHistory) : []
  } catch (error) {
    console.error('Error retrieving game history:', error)
    return []
  }
}

const saveHistoryToStorage = (games: GameStats[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games))
  } catch (error) {
    console.error('Error saving game history:', error)
  }
}

export const useHistoryStore = create<HistoryStore>()(
  immer((set) => ({
    games: [],

    addGameToHistory: (stats) => {
      const newGame: GameStats = {
        id: uuidv4(),
        date: new Date().toISOString(),
        ...stats,
      }

      set((state) => {
        state.games.push(newGame)
        state.games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        saveHistoryToStorage(state.games)
      })
    },

    clearHistory: () => {
      set((state) => {
        state.games = []
        localStorage.removeItem(STORAGE_KEY)
      })
    },

    loadHistoryFromStorage: () => {
      const storedGames = getStoredHistory()
      set((state) => {
        state.games = storedGames
      })
    },
  }))
)

// for use in gameStore
export const saveGameToHistory = (stats: Omit<GameStats, 'id' | 'date'>): void => {
  useHistoryStore.getState().addGameToHistory(stats)
}
