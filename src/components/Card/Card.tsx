import { memo } from 'react'
import './Card.scss'

interface CardProps {
  id: number
  imageId: number
  isFlipped: boolean
  isMatched: boolean
  onClick: (id: number) => void
}

const Card = ({ id, imageId, isFlipped, isMatched, onClick }: CardProps) => {
  const cardClasses = ['card', isFlipped ? 'card--flipped' : '', isMatched ? 'card--matched' : '']
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id)
    }
  }

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      data-card-id={id}
      data-is-flipped={isFlipped}
      data-is-matched={isMatched}
    >
      <div className='card__inner'>
        <div className='card__face card__face--back'>
          <div className='card__pattern'></div>
        </div>

        <div className='card__face card__face--front'>
          <div className='card__image' data-image-id={imageId + 1}>
            <img src={`/src/assets/images/card-images/crypto-${imageId + 1}.svg`} alt='Memory card' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Card)
