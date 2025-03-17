import { memo } from 'react'
import { useGameStore } from '@store/gameStore'
import { useLanguageStore } from '@store/languageStore'
import { DIFFICULTY_CONFIG, GameStore } from '@store/types'
import './GameStats.scss'
import { useShallow } from 'zustand/shallow'

const GameStats = () => {
  const { attempts, elapsedTime, matchedPairs, difficulty, isGameCompleted } = useGameStore(
    useShallow((state: GameStore) => ({
      attempts: state.attempts,
      elapsedTime: state.elapsedTime,
      matchedPairs: state.matchedPairs,
      difficulty: state.difficulty,
      isGameCompleted: state.isGameCompleted,
    }))
  )
  const { t } = useLanguageStore()

  const totalPairs = DIFFICULTY_CONFIG[difficulty].totalPairs

  // ===== Format MM:SS =====
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
  }

  return (
    <div className='game-stats'>
      <div className='game-stats__item'>
        <span className='game-stats__label'>{t('time')}</span>
        <span className='game-stats__value'>{formatTime(elapsedTime)}</span>
      </div>

      <div className='game-stats__item'>
        <span className='game-stats__label'>{t('attempts')}</span>
        <span className='game-stats__value'>{attempts}</span>
      </div>

      <div className='game-stats__item'>
        <span className='game-stats__label'>{t('progress')}</span>
        <div className='game-stats__progress'>
          <div className='game-stats__progress-text'>
            {matchedPairs} / {totalPairs}
          </div>
          <div className='game-stats__progress-bar'>
            <div
              className='game-stats__progress-fill'
              style={{ width: `${(matchedPairs / totalPairs) * 100}%` }}
              data-progress={Math.round((matchedPairs / totalPairs) * 100)}
            ></div>
          </div>
        </div>
      </div>

      {isGameCompleted && (
        <div className='game-stats__completion'>
          <div className='game-stats__completion-message'>{t('gameCompleted')}</div>
          <div className='game-stats__completion-details'>
            <p>
              {t('totalTime')}: {formatTime(elapsedTime)}
            </p>
            <p>
              {t('totalAttempts')}: {attempts}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(GameStats)
