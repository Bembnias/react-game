const SOUND_URLS = {
  flip: new URL('@assets/audio/flip.mp3', import.meta.url).href,
  match: new URL('@assets/audio/match.mp3', import.meta.url).href,
  victory: new URL('@assets/audio/victory.wav', import.meta.url).href,
}

const audioCache: Record<string, HTMLAudioElement> = {}

export const preloadSounds = (): void => {
  Object.entries(SOUND_URLS).forEach(([key, url]) => {
    const audio = new Audio(url)
    audio.preload = 'auto'
    audioCache[key] = audio

    audio.load()
  })
}

/**
 * Play a sound effect
 * @param sound - The sound to play
 * @param volume - Volume level (0.0 to 1.0)
 */
export const playSound = (sound: keyof typeof SOUND_URLS, volume = 0.5): void => {
  try {
    const audio = audioCache[sound] || new Audio(SOUND_URLS[sound])

    audio.volume = volume
    audio.currentTime = 0

    audio.play().catch((error) => {
      console.warn(`Failed to play sound (${sound}):`, error)
    })

    if (!audioCache[sound]) {
      audioCache[sound] = audio
    }
  } catch (error) {
    console.warn(`Error playing sound (${sound}):`, error)
  }
}
