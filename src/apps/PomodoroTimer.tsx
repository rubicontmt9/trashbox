import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const PomodoroTimer: React.FC = () => {
  const [workTime, setWorkTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkSession, setIsWorkSession] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsWorkSession(!isWorkSession)
      setTimeLeft((isWorkSession ? breakTime : workTime) * 60)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isWorkSession, workTime, breakTime])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-center">
      <div className="inline-block mb-8">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
          <div className="text-6xl font-bold text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
        <p className="text-2xl font-bold text-purple-400">
          {isWorkSession ? '🔥 Work Session' : '☕ Break Time'}
        </p>
      </div>

      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold flex items-center gap-2"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false)
            setIsWorkSession(true)
            setTimeLeft(workTime * 60)
          }}
          className="px-6 py-3 bg-slate-600 hover:bg-slate-700 rounded-lg font-bold flex items-center gap-2"
        >
          <RotateCcw size={20} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Work Time (min)</p>
          <input
            type="number"
            min="1"
            max="60"
            value={workTime}
            onChange={e => {
              setWorkTime(+e.target.value)
              if (!isRunning && isWorkSession) setTimeLeft(+e.target.value * 60)
            }}
            className="w-full px-3 py-2 bg-slate-600 rounded text-white text-center text-xl font-bold"
          />
        </div>
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-2">Break Time (min)</p>
          <input
            type="number"
            min="1"
            max="30"
            value={breakTime}
            onChange={e => setBreakTime(+e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 rounded text-white text-center text-xl font-bold"
          />
        </div>
      </div>
    </div>
  )
}

export default PomodoroTimer
