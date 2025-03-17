export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface DifficultyConfig {
  rows: number
  cols: number
  totalPairs: number
}

// Config for each difficulty level
export const DIFFICULTY_CONFIG: Record<DifficultyLevel, DifficultyConfig> = {
  [DifficultyLevel.EASY]: {
    rows: 4,
    cols: 4,
    totalPairs: 8,
  },
  [DifficultyLevel.MEDIUM]: {
    rows: 5,
    cols: 4,
    totalPairs: 10,
  },
  [DifficultyLevel.HARD]: {
    rows: 6,
    cols: 6,
    totalPairs: 18,
  },
}

export interface Card {
  id: number
  imageId: number
  isFlipped: boolean
  isMatched: boolean
}

export interface GameState {
  cards: Card[]
  flippedCards: Card[]
  matchedPairs: number
  attempts: number
  isGameStarted: boolean
  isGameCompleted: boolean
  startTime: number | null
  currentTime: number
  elapsedTime: number
  difficulty: DifficultyLevel
}

export interface GameStats {
  id: string
  date: string
  attempts: number
  duration: number
  difficulty: DifficultyLevel
}

export interface GameHistory {
  games: GameStats[]
}

export interface GameActions {
  initializeGame: (difficulty?: DifficultyLevel) => void
  startGame: () => void
  resetGame: () => void

  flipCard: (cardId: number) => void
  checkForMatch: () => void

  incrementAttempts: () => void
  updateElapsedTime: () => void

  setDifficulty: (difficulty: DifficultyLevel) => void

  completeGame: () => void
}

export type GameStore = GameState & GameActions

export type HistoryStore = GameHistory & HistoryActions

export interface HistoryActions {
  addGameToHistory: (stats: Omit<GameStats, 'id' | 'date'>) => void
  clearHistory: () => void
  loadHistoryFromStorage: () => void
}
