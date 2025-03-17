import { useEffect, useRef } from 'react'
import './Modal.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText: string
  cancelText: string
}

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='modal-overlay'>
      <div className='modal' ref={modalRef}>
        <div className='modal__header'>
          <h2 className='modal__title'>{title}</h2>
          <button className='modal__close' onClick={onClose} aria-label='Close'>
            &times;
          </button>
        </div>
        <div className='modal__content'>
          <p className='modal__message'>{message}</p>
        </div>
        <div className='modal__actions'>
          <button className='modal__button modal__button--cancel' onClick={onClose}>
            {cancelText}
          </button>
          <button
            className='modal__button modal__button--confirm'
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
