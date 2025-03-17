import { useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '@store/gameStore'
import { DIFFICULTY_CONFIG, GameStore } from '@store/types'
import Card from '@components/Card'
import './GameBoard.scss'

const GameBoard = () => {
  const { cards, difficulty, isGameStarted, isGameCompleted, flipCard, updateElapsedTime } = useGameStore(
    useShallow((state: GameStore) => ({
      cards: state.cards,
      difficulty: state.difficulty,
      isGameStarted: state.isGameStarted,
      isGameCompleted: state.isGameCompleted,
      flipCard: state.flipCard,
      updateElapsedTime: state.updateElapsedTime,
    }))
  )

  const difficultyConfig = DIFFICULTY_CONFIG[difficulty]

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${difficultyConfig.cols}, 1fr)`,
      gridTemplateRows: `repeat(${difficultyConfig.rows}, 1fr)`,
    }),
    [difficultyConfig]
  )

  const handleCardClick = (cardId: number) => {
    flipCard(cardId)
  }

  // ===== Timer =====
  useEffect(() => {
    let timerId: number

    if (isGameStarted && !isGameCompleted) {
      timerId = window.setInterval(() => {
        updateElapsedTime()
      }, 1000)
    }

    return () => {
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [isGameStarted, isGameCompleted, updateElapsedTime])

  return (
    <div className='game-board' style={gridStyle} data-difficulty={difficulty}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          imageId={card.imageId}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={handleCardClick}
        />
      ))}
    </div>
  )
}

export default GameBoard
