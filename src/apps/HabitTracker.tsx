import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Habit {
  id: number
  name: string
  completedDates: string[]
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabit, setNewHabit] = useState('')
  const today = new Date().toDateString()

  const addHabit = () => {
    if (!newHabit) return
    setHabits([...habits, { id: Date.now(), name: newHabit, completedDates: [] }])
    setNewHabit('')
  }

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const completed = h.completedDates.includes(today)
        return {
          ...h,
          completedDates: completed ? h.completedDates.filter(d => d !== today) : [...h.completedDates, today]
        }
      }
      return h
    }))
  }

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id))
  }

  const getStreak = (habit: Habit) => {
    let streak = 0
    let date = new Date()
    while (habit.completedDates.includes(date.toDateString())) {
      streak++
      date.setDate(date.getDate() - 1)
    }
    return streak
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-700 p-4 rounded-lg flex gap-2">
        <input
          type="text"
          placeholder="Add new habit..."
          value={newHabit}
          onChange={e => setNewHabit(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addHabit()}
          className="flex-1 px-3 py-2 bg-slate-600 rounded text-white"
        />
        <button
          onClick={addHabit}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-bold flex items-center gap-2"
        >
          <Plus size={20} /> Add
        </button>
      </div>

      <div className="space-y-2">
        {habits.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No habits yet. Add one to get started!</p>
        ) : (
          habits.map(habit => (
            <div
              key={habit.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                habit.completedDates.includes(today)
                  ? 'bg-green-700 border-green-500'
                  : 'bg-slate-700 border-slate-600'
              }`}
              onClick={() => toggleHabit(habit.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{habit.name}</p>
                  <p className="text-sm text-gray-300">
                    🔥 {getStreak(habit)} day streak • {habit.completedDates.length} total
                  </p>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    deleteHabit(habit.id)
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HabitTracker
