import confetti from 'canvas-confetti'
import { CelebrationType } from '../types'

/**
 * ✨ Emotional FX System
 * 
 * Gerencia partículas e efeitos visuais baseados na raridade da conquista.
 */

export const triggerCelebration = (type: CelebrationType = 'common', reduced: boolean = false) => {
  if (reduced) {
    // Modo reduzido: apenas um pequeno brilho
    confetti({
      particleCount: 40,
      spread: 30,
      origin: { y: 0.7 },
      colors: ['#52B788', '#F9D423']
    })
    return
  }

  switch (type) {
    case 'legendary':
    case 'level_up':
      // Explosão massiva
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 3000 }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } })
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } })
      }, 250)
      break

    case 'epic':
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#2D6A4F', '#52B788', '#F9D423', '#FF9F1C', '#7209B7']
      })
      break

    case 'common':
    default:
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D6A4F', '#52B788', '#F9D423', '#FF9F1C']
      })
      break
  }
}
