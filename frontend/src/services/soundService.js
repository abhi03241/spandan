let audioContext = null

export const initAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (error) {
      console.warn('[SoundService] AudioContext not supported:', error)
    }
  }
}

export const resumeAudioContext = async () => {
  if (audioContext) {
    if (audioContext.state === 'suspended') {
      try {
        await audioContext.resume()
      } catch (error) {
        console.warn('[SoundService] Failed to resume AudioContext:', error)
      }
    }
    return true
  }
  return false
}

export const playQuestionSound = async () => {
  if (!audioContext) {
    await initAudioContext()
  }
  if (!audioContext) return
  
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.1)
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.2)
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.4)
  } catch (error) {
    console.warn('[SoundService] Failed to play question sound:', error)
  }
}

export const playSubmitSound = async () => {
  if (!audioContext) {
    await initAudioContext()
  }
  if (!audioContext) return
  
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.08)
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  } catch (error) {
    console.warn('[SoundService] Failed to play submit sound:', error)
  }
}

export const playCorrectSound = async () => {
  if (!audioContext) {
    await initAudioContext()
  }
  if (!audioContext) return
  
  try {
    const notes = [523.25, 659.25, 783.99, 1046.50]
    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1)
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.15)
      
      oscillator.start(audioContext.currentTime + i * 0.1)
      oscillator.stop(audioContext.currentTime + i * 0.1 + 0.15)
    })
  } catch (error) {
    console.warn('[SoundService] Failed to play correct sound:', error)
  }
}

export const playTimerWarningSound = async () => {
  if (!audioContext) {
    await initAudioContext()
  }
  if (!audioContext) return
  
  try {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  } catch (error) {
    console.warn('[SoundService] Failed to play timer warning sound:', error)
  }
}

export const getAudioContextStatus = () => audioContext?.state || 'not-initialized'

export default { 
  playQuestionSound, 
  playSubmitSound, 
  playCorrectSound, 
  playTimerWarningSound,
  initAudioContext,
  resumeAudioContext,
  getAudioContextStatus
}