import { useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '@store/gameStore'
import { useLanguageStore } from '@store/languageStore'
import { DifficultyLevel, GameStore } from '@store/types'
import './GameControls.scss'

const GameControls = () => {
  const { isGameStarted, isGameCompleted, difficulty, resetGame, setDifficulty, initializeGame } = useGameStore(
    useShallow((state: GameStore) => ({
      isGameStarted: state.isGameStarted,
      isGameCompleted: state.isGameCompleted,
      difficulty: state.difficulty,
      resetGame: state.resetGame,
      setDifficulty: state.setDifficulty,
      initializeGame: state.initializeGame,
    }))
  )
  const { t } = useLanguageStore()

  const handleDifficultyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDifficulty = e.target.value as DifficultyLevel
      setDifficulty(newDifficulty)
    },
    [setDifficulty]
  )

  const handleResetGame = useCallback(() => {
    resetGame()
  }, [resetGame])

  const handleNewGame = useCallback(() => {
    initializeGame()
  }, [initializeGame])

  return (
    <div className='game-controls'>
      <div className='game-controls__group'>
        <label htmlFor='difficulty' className='game-controls__label'>
          {t('difficulty')}
        </label>
        <select
          id='difficulty'
          className='game-controls__select'
          value={difficulty}
          onChange={handleDifficultyChange}
          disabled={isGameStarted && !isGameCompleted}
          data-difficulty={difficulty}
        >
          <option value={DifficultyLevel.EASY}>{t('easy')} (4x4)</option>
          <option value={DifficultyLevel.MEDIUM}>{t('medium')} (5x4)</option>
          <option value={DifficultyLevel.HARD}>{t('hard')} (6x6)</option>
        </select>
      </div>

      <div className='game-controls__buttons'>
        <button
          className='game-controls__button game-controls__button--reset'
          onClick={handleResetGame}
          disabled={!isGameStarted}
        >
          {t('resetGame')}
        </button>

        <button
          className='game-controls__button game-controls__button--new'
          onClick={handleNewGame}
          disabled={isGameStarted && !isGameCompleted}
        >
          {t('newGame')}
        </button>
      </div>
    </div>
  )
}

export default GameControls
