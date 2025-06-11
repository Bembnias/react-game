import { useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import { useAudioStore } from '@store/audioStore'
import { AudioState } from '@store/types'
import volumeOffIcon from '../../assets/images/icons/volume-off-icon.svg'
import volumeOnIcon from '../../assets/images/icons/volume-on-icon.svg'
import './MuteSoundEffectsButton.scss'

const MuteSoundEffectsButton = () => {
  const { muted, toggleMute } = useAudioStore(
    useShallow((state: AudioState) => ({
      muted: state.muted,
      toggleMute: state.toggleMute,
    }))
  )

  const handleToggle = useCallback(() => {
    toggleMute()
  }, [toggleMute])

  return (
    <button
      className='mute-button'
      onClick={handleToggle}
      aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
      title={muted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {muted ? (
        <img src={volumeOffIcon} alt='Mute sound effects button' />
      ) : (
        <img src={volumeOnIcon} alt='Unmute sound effect button' />
      )}
    </button>
  )
}

export default MuteSoundEffectsButton
