import { useEffect, useRef, useState } from 'react'

const PRESETS_MIN = [5, 10, 15, 20]

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// A plain countdown timer, no guided audio — that's intentionally out of
// scope for now (no session audio to play yet).
//
// The countdown is driven by wall-clock time (an `endTime` timestamp), not
// by decrementing a counter once per setInterval tick. setInterval ticks
// drift under load (a slow tab, a backgrounded browser), so counting down
// "one tick = one second" quietly loses accuracy over a 10-20 minute
// session. Instead each tick just recomputes secondsLeft from
// `endTime - Date.now()`, so the displayed time is always correct even if
// a tick fires late.
export function MeditationTimer() {
  const [durationMin, setDurationMin] = useState(10)
  const [secondsLeft, setSecondsLeft] = useState(10 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const endTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) return

    const tick = () => {
      const remaining = Math.max(0, Math.round((endTimeRef.current! - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) {
        setIsRunning(false)
        setIsComplete(true)
      }
    }

    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [isRunning])

  function selectDuration(min: number) {
    setDurationMin(min)
    setSecondsLeft(min * 60)
    setIsComplete(false)
  }

  function start() {
    endTimeRef.current = Date.now() + secondsLeft * 1000
    setIsComplete(false)
    setIsRunning(true)
  }

  function pause() {
    setIsRunning(false)
  }

  function reset() {
    setIsRunning(false)
    setIsComplete(false)
    setSecondsLeft(durationMin * 60)
  }

  return (
    <section className="rounded-xl border border-border bg-white px-6 py-9 text-center">
      <div className="flex justify-center gap-2">
        {PRESETS_MIN.map((min) => (
          <button
            key={min}
            onClick={() => selectDuration(min)}
            disabled={isRunning}
            className={`rounded-full border px-3 py-1 text-sm transition-colors disabled:opacity-40 ${
              durationMin === min && secondsLeft === min * 60
                ? 'border-accent bg-accent text-white'
                : 'border-border text-muted hover:border-accent hover:text-ink'
            }`}
          >
            {min} min
          </button>
        ))}
      </div>

      <p className="mt-8 font-serif text-6xl tabular-nums text-ink sm:text-7xl">
        {formatTime(secondsLeft)}
      </p>

      {isComplete && <p className="mt-3 text-sm text-muted">Session complete.</p>}

      <div className="mt-6 flex justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={start}
            disabled={secondsLeft === 0}
            className="rounded-lg bg-accent px-5 py-2 text-white transition-colors hover:bg-accent-hover disabled:opacity-40"
          >
            {secondsLeft === durationMin * 60 ? 'Start' : 'Resume'}
          </button>
        ) : (
          <button onClick={pause} className="rounded-lg bg-accent px-5 py-2 text-white transition-colors hover:bg-accent-hover">
            Pause
          </button>
        )}
        <button
          onClick={reset}
          className="rounded-lg border border-border px-5 py-2 text-muted transition-colors hover:border-accent hover:text-ink"
        >
          Reset
        </button>
      </div>
    </section>
  )
}
