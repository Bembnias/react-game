import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { AudioState } from './types'

const AUDIO_SETTINGS_KEY = 'memory-game-audio-settings'

const getStoredAudioSettings = (): boolean => {
  try {
    const storedSettings = localStorage.getItem(AUDIO_SETTINGS_KEY)
    return storedSettings ? JSON.parse(storedSettings).muted : false
  } catch (error) {
    console.error('Error retrieving audio settings:', error)
    return false
  }
}

export const useAudioStore = create<AudioState>()(
  immer((set) => ({
    muted: getStoredAudioSettings(),

    toggleMute: () => {
      set((state) => {
        state.muted = !state.muted

        try {
          localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify({ muted: state.muted }))
        } catch (error) {
          console.error('Error saving audio settings:', error)
        }
      })
    },
  }))
)
