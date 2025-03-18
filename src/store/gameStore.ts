import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Card, DifficultyLevel, DIFFICULTY_CONFIG, GameState, GameStore } from './types'
import { saveGameToHistory } from './historyStore'
import { playSound } from '@utils/audio'

const generateCards = (difficulty: DifficultyLevel): Card[] => {
  const { totalPairs } = DIFFICULTY_CONFIG[difficulty]
  const cards: Card[] = []

  for (let i = 0; i < totalPairs; i++) {
    cards.push(
      { id: i * 2, imageId: i, isFlipped: false, isMatched: false },
      { id: i * 2 + 1, imageId: i, isFlipped: false, isMatched: false }
    )
  }

  return cards.sort(() => Math.random() - 0.5)
}

const initialState: GameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: 0,
  isGameStarted: false,
  isGameCompleted: false,
  startTime: null,
  currentTime: 0,
  elapsedTime: 0,
  difficulty: DifficultyLevel.EASY,
}

export const useGameStore = create<GameStore>()(
  immer((set, get) => ({
    ...initialState,

    initializeGame: (difficulty) => {
      set((state) => {
        const selectedDifficulty = difficulty || state.difficulty
        state.cards = generateCards(selectedDifficulty)
        state.difficulty = selectedDifficulty
        state.flippedCards = []
        state.matchedPairs = 0
        state.attempts = 0
        state.isGameStarted = false
        state.isGameCompleted = false
        state.startTime = null
        state.currentTime = 0
        state.elapsedTime = 0
      })
    },

    startGame: () => {
      const gameStarted = get().isGameStarted

      if (!gameStarted) {
        set((state) => {
          state.isGameStarted = true
          state.startTime = Date.now()
        })
      }
    },

    resetGame: () => {
      set((state) => {
        const { difficulty } = state
        state.cards = generateCards(difficulty)
        state.flippedCards = []
        state.matchedPairs = 0
        state.attempts = 0
        state.isGameStarted = false
        state.isGameCompleted = false
        state.startTime = null
        state.currentTime = 0
        state.elapsedTime = 0
      })
    },

    flipCard: (cardId) => {
      const { cards, flippedCards, isGameStarted, isGameCompleted } = get()

      // Don't allow flip if game is completed or 2 cards are flipped already
      if (isGameCompleted || flippedCards.length >= 2) return

      if (!isGameStarted) {
        get().startGame()
      }

      const card = cards.find((c) => c.id === cardId)

      // Dont flip already flipped or matched cards
      if (!card || card.isFlipped || card.isMatched) return

      playSound('flip')

      set((state) => {
        // Flip the selected card
        const updatedCard = { ...card, isFlipped: true }
        state.cards = state.cards.map((c) => (c.id === cardId ? updatedCard : c))

        state.flippedCards.push(updatedCard)

        if (state.flippedCards.length === 2) {
          state.attempts += 1

          setTimeout(() => get().checkForMatch(), 800)
        }
      })
    },

    checkForMatch: () => {
      const { flippedCards } = get()

      if (flippedCards.length !== 2) return

      const [card1, card2] = flippedCards
      const isMatch = card1.imageId === card2.imageId

      set((state) => {
        // Update cards based on match result
        state.cards = state.cards.map((card) => {
          if (flippedCards.some((flippedCard) => flippedCard.id === card.id)) {
            return {
              ...card,
              isFlipped: false,
              isMatched: isMatch ? true : false,
            }
          }
          return card
        })

        state.flippedCards = []

        if (isMatch) {
          playSound('match')

          state.matchedPairs += 1

          // Check if game is completed
          const { totalPairs } = DIFFICULTY_CONFIG[state.difficulty]
          if (state.matchedPairs === totalPairs) {
            playSound('victory')

            state.isGameCompleted = true
            state.elapsedTime = state.currentTime

            const stats = {
              attempts: state.attempts,
              duration: state.elapsedTime,
              difficulty: state.difficulty,
            }
            saveGameToHistory(stats)
          }
        }
      })
    },

    incrementAttempts: () => {
      set((state) => {
        state.attempts += 1
      })
    },

    updateElapsedTime: () => {
      const { startTime, isGameStarted, isGameCompleted } = get()

      if (!isGameStarted || isGameCompleted || !startTime) return

      const currentTime = Date.now()
      const elapsedTime = Math.floor((currentTime - startTime) / 1000)

      set((state) => {
        state.currentTime = elapsedTime
      })
    },

    setDifficulty: (difficulty) => {
      set((state) => {
        state.difficulty = difficulty
      })

      // Reinit game with new difficulty
      get().initializeGame(difficulty)
    },

    completeGame: () => {
      set((state) => {
        state.isGameCompleted = true
      })
    },
  }))
)
