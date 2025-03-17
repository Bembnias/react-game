import { useEffect, useState } from 'react'
import { useHistoryStore } from '@store/historyStore'
import { useLanguageStore } from '@store/languageStore'
import { DifficultyLevel, GameStats } from '@store/types'
import './GameHistory.scss'
import Modal from '@components/Modal'

const GameHistory = () => {
  const { games, loadHistoryFromStorage, clearHistory } = useHistoryStore()
  const { t } = useLanguageStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadHistoryFromStorage()
  }, [loadHistoryFromStorage])

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s` // MM:SS
  }

  const getDifficultyClass = (difficulty: DifficultyLevel): string => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return 'game-history__difficulty--easy'
      case DifficultyLevel.MEDIUM:
        return 'game-history__difficulty--medium'
      case DifficultyLevel.HARD:
        return 'game-history__difficulty--hard'
      default:
        return ''
    }
  }

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleClearHistory = () => {
    setIsModalOpen(true)
  }

  const handleConfirmClear = () => {
    clearHistory()
  }

  return (
    <div className={`game-history ${isExpanded ? 'game-history--expanded' : ''}`}>
      <div className='game-history__header' onClick={toggleExpanded}>
        <h2 className='game-history__title'>{t('gameHistory')}</h2>
        <button className='game-history__toggle'>{isExpanded ? '▲' : '▼'}</button>
      </div>

      {isExpanded && (
        <div className='game-history__content'>
          {games.length > 0 ? (
            <>
              <div className='game-history__actions'>
                <button className='game-history__clear' onClick={handleClearHistory}>
                  {t('clearHistory')}
                </button>
              </div>

              <div className='game-history__list'>
                <div className='game-history__list-header'>
                  <span>{t('date')}</span>
                  <span>{t('difficulty')}</span>
                  <span>{t('attempts')}</span>
                  <span>{t('time')}</span>
                </div>

                {games.map((game: GameStats) => (
                  <div key={game.id} className='game-history__item'>
                    <span className='game-history__date'>{formatDate(game.date)}</span>
                    <span className={`game-history__difficulty ${getDifficultyClass(game.difficulty)}`}>
                      {game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)}
                    </span>
                    <span className='game-history__attempts'>{game.attempts}</span>
                    <span className='game-history__duration'>{formatTime(game.duration)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='game-history__empty'>{t('noGameHistory')}</div>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmClear}
        title={t('clearHistory')}
        message={t('confirmClearHistory')}
        confirmText={t('clearHistory')}
        cancelText={t('cancel')}
      />
    </div>
  )
}

export default GameHistory
