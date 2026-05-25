let audioCtx: AudioContext | null = null
let musicGain: GainNode | null = null

export const initAudio = (): AudioContext => {
  audioCtx = new AudioContext()
  return audioCtx
}

export const getAudioCtx = () => audioCtx

export const playEffect = (
  freq: number,
  duration: number,
  volume: number = 0.15,
  type: OscillatorType = "sine"
) => {
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.frequency.value = freq
  osc.type = type
  gain.gain.setValueAtTime(volume, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
  osc.start(audioCtx.currentTime)
  osc.stop(audioCtx.currentTime + duration)
}

export const playStep = () => {
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.frequency.value = 120 + Math.random() * 40
  osc.type = "sine"
  gain.gain.setValueAtTime(0.04, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08)
  osc.start(audioCtx.currentTime)
  osc.stop(audioCtx.currentTime + 0.08)
}

export const playOpen = () => {
  [523, 659, 784].forEach((freq, i) => {
    setTimeout(() => playEffect(freq, 0.15, 0.12, "sine"), i * 80)
  })
}

export const playClose = () => {
  [784, 523, 392].forEach((freq, i) => {
    setTimeout(() => playEffect(freq, 0.12, 0.1, "sine"), i * 70)
  })
}

export const playUnlock = () => {
  [523, 659, 784, 1046].forEach((freq, i) => {
    setTimeout(() => playEffect(freq, 0.2, 0.15, "sine"), i * 100)
  })
}

export const startMusic = (ctx: AudioContext) => {
  musicGain = ctx.createGain()
  musicGain.gain.value = 0.04
  musicGain.connect(ctx.destination)

  const melody = [392, 440, 494, 523, 494, 440, 392, 349, 392, 349, 330, 294, 330, 349, 392, 392]
  const bass = [196, 196, 220, 220, 247, 247, 261, 261, 196, 196, 175, 175, 165, 175, 196, 196]

  let i = 0
  setInterval(() => {
    if (!musicGain) return

    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.connect(gain1)
    gain1.connect(musicGain)
    osc1.frequency.value = melody[i % melody.length]
    osc1.type = "square"
    gain1.gain.setValueAtTime(0.5, ctx.currentTime)
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
    osc1.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 0.35)

    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.connect(gain2)
    gain2.connect(musicGain)
    osc2.frequency.value = bass[i % bass.length]
    osc2.type = "triangle"
    gain2.gain.setValueAtTime(0.3, ctx.currentTime)
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
    osc2.start(ctx.currentTime)
    osc2.stop(ctx.currentTime + 0.35)
    i++
  }, 350)
}

export const toggleMusic = (muted: boolean) => {
  if (!musicGain || !audioCtx) return
  if (muted) {
    musicGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3)
  } else {
    musicGain.gain.setTargetAtTime(0.04, audioCtx.currentTime, 0.3)
  }
}