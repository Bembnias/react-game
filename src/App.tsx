import { useEffect } from 'react'
import { useLanguageStore } from '@store/languageStore'
import { useGameStore } from '@store/gameStore'
import { preloadSounds } from '@utils/audio'

import LanguageSwitch from '@components/LanguageSwitch'
import GameControls from '@components/GameControls'
import GameStats from '@components/GameStats'
import GameBoard from '@components/GameBoard'
import GameHistory from '@components/GameHistory'
import Confetti from '@components/Confetti'

import './App.scss'

const App = () => {
  const initializeGame = useGameStore((state) => state.initializeGame)
  const { t } = useLanguageStore()

  useEffect(() => {
    preloadSounds()
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  return (
    <div className='app'>
      <div className='container'>
        <header className='app__header'>
          <div className='app__header-top'>
            <LanguageSwitch />
          </div>
          <h1 className='app__title'>{t('title')}</h1>
          <p className='app__subtitle'>{t('subtitle')}</p>
        </header>

        <main className='app__main'>
          <section className='app__controls-section'>
            <GameControls />
          </section>

          <section className='app__stats-section'>
            <GameStats />
          </section>

          <section className='app__board-section'>
            <GameBoard />
          </section>

          <section className='app__history-section'>
            <GameHistory />
          </section>
        </main>

        <footer className='app__footer'>
          <p>
            Memory Card Game &copy; {new Date().getFullYear()} |{' '}
            <a href='mailto:bieniasdevs@gmail.com'>{t('contactMe')}</a>
          </p>
        </footer>
      </div>

      <Confetti />
    </div>
  )
}

export default App
