'use client'

/**
 * 🎵 Emotional Audio Engine: Studio Ghibli Standards
 * 
 * Focado em:
 * 1. Resiliência PWA (iOS Unlock)
 * 2. Performance (Audio Pooling)
 * 3. Mixagem Emocional (Categorias)
 * 4. Pacing Sonoro (Evitar poluição)
 */

export type SoundCategory = 'UI' | 'MENTOR' | 'AMBIENT' | 'SACRED' | 'REWARD'

type SoundEffect = 
  | 'xp_gain' 
  | 'reward_ceremony' 
  | 'nest_evolution' 
  | 'button_click' 
  | 'mentor_appear'
  | 'morning_greeting'

class AudioService {
  private static instance: AudioService
  private isMuted: boolean = false
  private isUnlocked: boolean = false
  private audioPool = new Map<string, HTMLAudioElement>()
  
  // 🎚️ Mixing Volumes per Category
  private volumes: Record<SoundCategory, number> = {
    UI: 0.3,
    MENTOR: 0.7,
    AMBIENT: 0.2,
    SACRED: 0.8,
    REWARD: 0.9
  }

  private constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('cj_audio_muted')
      this.isMuted = savedMute === 'true'
    }
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService()
    }
    return AudioService.instance
  }

  /**
   * 🔓 iOS Unlock Strategy
   * Deve ser chamado na primeira interação do usuário (ex: primeiro clique no Dashboard)
   */
  public async unlock() {
    if (this.isUnlocked || typeof window === 'undefined') return
    
    // Play an empty sound to unlock the AudioContext on iOS
    const silentAudio = new Audio()
    silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='
    try {
      await silentAudio.play()
      this.isUnlocked = true
      console.log('[AudioService] 🔓 Audio successfully unlocked for this session')
    } catch (e) {
      console.warn('[AudioService] 🔒 Audio unlock failed', e)
    }
  }

  /**
   * 🎧 Play Effect with Pooling & Pacing
   */
  public playEffect(effect: SoundEffect | string, category: SoundCategory = 'UI', mentor?: string) {
    if (this.isMuted || typeof window === 'undefined') return

    const soundPath = `/audio/effects/${effect}${mentor ? `_${mentor.toLowerCase()}` : ''}.mp3`
    
    // 🏊 Get or Create from Pool
    let audio = this.audioPool.get(soundPath)
    
    if (!audio) {
      audio = new Audio(soundPath)
      audio.preload = 'auto'
      this.audioPool.set(soundPath, audio)
    }

    // 🕊️ Sonic Pacing: Reset and play
    audio.currentTime = 0
    audio.volume = this.volumes[category]
    
    audio.play().catch(e => {
      // 404s are expected during development until files are placed in /public
      if (e.name !== 'NotAllowedError') {
        console.warn(`[AudioService] Asset missing: ${soundPath}`)
      }
    })
  }

  /**
   * 🌲 Ambient Atmosphere Manager
   */
  public playAmbient(theme: 'forest_day' | 'forest_night') {
    if (this.isMuted || typeof window === 'undefined') return
    // TODO: Implement crossfade loop manager
    console.log(`[AudioService] Ambient layer active: ${theme}`)
  }

  public toggleMute() {
    this.isMuted = !this.isMuted
    localStorage.setItem('cj_audio_muted', String(this.isMuted))
    
    // Stop all pooled sounds if muting
    if (this.isMuted) {
      this.audioPool.forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      })
    }
    
    return this.isMuted
  }

  public getMuteStatus() {
    return this.isMuted
  }
}

export const audioService = AudioService.getInstance()
