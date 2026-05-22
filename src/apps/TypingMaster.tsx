import React, { useState, useEffect } from 'react'
import { RotateCcw, Zap } from 'lucide-react'

const TypingMaster: React.FC = () => {
  const testTexts = [
    'The quick brown fox jumps over the lazy dog',
    'React is a JavaScript library for building user interfaces',
    'Practice makes perfect when learning to type faster',
    'Speed and accuracy are both important in typing',
    'Web development requires attention to detail'
  ]

  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [started, setStarted] = useState(false)
  const [time, setTime] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setText(testTexts[Math.floor(Math.random() * testTexts.length)])
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (started && !finished) {
      interval = setInterval(() => setTime(t => t + 1), 100)
    }
    return () => clearInterval(interval)
  }, [started, finished])

  const handleStart = () => {
    setStarted(true)
    setUserInput('')
    setTime(0)
    setFinished(false)
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value
    setUserInput(input)

    if (input === text) {
      setFinished(true)
    }
  }

  const handleReset = () => {
    setText(testTexts[Math.floor(Math.random() * testTexts.length)])
    setUserInput('')
    setStarted(false)
    setTime(0)
    setFinished(false)
  }

  const accuracy = userInput.length > 0
    ? Math.round((userInput.split('').filter((c, i) => c === text[i]).length / text.length) * 100)
    : 0

  const wpm = time > 0 ? Math.round((userInput.length / 5) / (time / 600)) : 0

  const renderText = () => {
    return text.split('').map((char, idx) => {
      let color = 'text-gray-400'
      if (idx < userInput.length) {
        color = userInput[idx] === char ? 'text-green-400' : 'text-red-400'
      } else if (idx === userInput.length) {
        color = 'text-yellow-400 bg-yellow-900 animate-pulse'
      }
      return (
        <span key={idx} className={color}>
          {char}
        </span>
      )
    })
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-700 p-4 rounded text-center">
          <p className="text-gray-400 text-sm">WPM</p>
          <p className="text-3xl font-bold text-blue-400">{wpm}</p>
        </div>
        <div className="bg-slate-700 p-4 rounded text-center">
          <p className="text-gray-400 text-sm">Accuracy</p>
          <p className="text-3xl font-bold text-green-400">{accuracy}%</p>
        </div>
        <div className="bg-slate-700 p-4 rounded text-center">
          <p className="text-gray-400 text-sm">Time</p>
          <p className="text-3xl font-bold text-purple-400">{(time / 10).toFixed(1)}s</p>
        </div>
      </div>

      <div className="bg-slate-700 p-6 rounded-lg font-mono text-lg leading-relaxed min-h-24">
        {renderText()}
      </div>

      <textarea
        value={userInput}
        onChange={handleInput}
        placeholder="Click 'Start' then type here..."
        disabled={!started || finished}
        className="w-full px-4 py-3 bg-slate-700 rounded text-white font-mono resize-none disabled:opacity-50"
        rows={4}
      />

      <div className="flex gap-3 justify-center">
        {!started ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold flex items-center gap-2"
          >
            <Zap size={20} /> Start Test
          </button>
        ) : (
          <>
            {!finished && (
              <p className="text-gray-400 self-center">Keep typing...</p>
            )}
            {finished && (
              <div className="text-center">
                <p className="text-yellow-400 text-xl font-bold mb-2">🎉 Perfect!</p>
              </div>
            )}
          </>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-slate-600 hover:bg-slate-700 rounded-lg font-bold flex items-center gap-2"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>
    </div>
  )
}

export default TypingMaster
