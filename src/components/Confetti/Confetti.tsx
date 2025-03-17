import { JSX, useEffect, useState } from 'react'
import { useGameStore } from '@store/gameStore'
import { useLanguageStore } from '@store/languageStore'
import './Confetti.scss'

const Confetti = () => {
  const isGameCompleted = useGameStore((state) => state.isGameCompleted)
  const { t } = useLanguageStore()

  const [pieces, setPieces] = useState<JSX.Element[]>([])
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (!isGameCompleted) {
      setPieces([])
      setShowText(false)
      return
    }

    setShowText(true)

    const colors = [
      '#f44336',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFEB3B',
      '#FFC107',
      '#FF9800',
      '#FF5722',
    ]
    const shapes = ['circle', 'square', 'triangle']

    const newPieces: JSX.Element[] = []

    for (let i = 0; i < 100; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const left = `${Math.random() * 100}%`
      const size = `${Math.random() * 0.5 + 0.5}rem`
      const animDuration = `${Math.random() * 2 + 1}s`
      const animDelay = `${Math.random() * 0.5}s`

      newPieces.push(
        <div
          key={i}
          className={`confetti__piece confetti__piece--${shape}`}
          style={{
            backgroundColor: color,
            left,
            width: size,
            height: size,
            animationDuration: animDuration,
            animationDelay: animDelay,
          }}
        />
      )
    }

    setPieces(newPieces)

    const timer = setTimeout(() => {
      setPieces([])
      setShowText(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isGameCompleted])

  if (!isGameCompleted && pieces.length === 0) {
    return null
  }

  return (
    <div className='confetti'>
      {pieces}
      {showText && <div className='confetti__text'>{t('victory')}</div>}
    </div>
  )
}

export default Confetti
