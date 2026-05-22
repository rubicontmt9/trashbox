import React, { useState } from 'react'
import Game2048 from './apps/Game2048'
import PomodoroTimer from './apps/PomodoroTimer'
import PasswordGenerator from './apps/PasswordGenerator'
import QRCodeTool from './apps/QRCodeTool'
import BudgetTracker from './apps/BudgetTracker'
import HabitTracker from './apps/HabitTracker'
import SmartNotes from './apps/SmartNotes'
import Calculator from './apps/Calculator'
import TaskManager from './apps/TaskManager'
import MatchGame from './apps/MatchGame'
import TypingMaster from './apps/TypingMaster'
import WeatherDashboard from './apps/WeatherDashboard'
import { Zap, Grid, Home } from 'lucide-react'

type AppId = '2048' | 'pomodoro' | 'passgen' | 'qr' | 'budget' | 'habit' | 'notes' | 'calc' | 'todo' | 'matching' | 'typing' | 'weather'

interface AppConfig {
  id: AppId
  name: string
  icon: React.ReactNode
  description: string
  component: React.ComponentType
}

const APPS: AppConfig[] = [
  { id: '2048', name: '2048 Game', icon: '🎮', description: 'Puzzle Game', component: Game2048 },
  { id: 'pomodoro', name: 'Pomodoro', icon: '⏱️', description: 'Focus Timer', component: PomodoroTimer },
  { id: 'passgen', name: 'Password Gen', icon: '🔐', description: 'Secure Passwords', component: PasswordGenerator },
  { id: 'qr', name: 'QR Code', icon: '📱', description: 'QR Generator', component: QRCodeTool },
  { id: 'budget', name: 'Budget', icon: '💰', description: 'Expense Tracking', component: BudgetTracker },
  { id: 'habit', name: 'Habits', icon: '✅', description: 'Habit Tracking', component: HabitTracker },
  { id: 'notes', name: 'Notes', icon: '📝', description: 'Quick Notes', component: SmartNotes },
  { id: 'calc', name: 'Calculator', icon: '🧮', description: 'Math Tool', component: Calculator },
  { id: 'todo', name: 'Tasks', icon: '📋', description: 'Todo List', component: TaskManager },
  { id: 'matching', name: 'Match', icon: '🎯', description: 'Memory Game', component: MatchGame },
  { id: 'typing', name: 'Typing', icon: '⌨️', description: 'Speed Test', component: TypingMaster },
  { id: 'weather', name: 'Weather', icon: '🌤️', description: 'Weather App', component: WeatherDashboard },
]

const AppHub: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppId | null>(null)
  const selected = APPS.find(app => app.id === selectedApp)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {!selectedApp ? (
        <div className="min-h-screen p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
                🎯 TrashBox Apps
              </h1>
              <p className="text-gray-400 text-lg">12 Mini Apps Collection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {APPS.map(app => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app.id)}
                  className="group p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 hover:from-purple-700 hover:to-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 border border-slate-600 hover:border-purple-400 cursor-pointer transform hover:scale-105"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{app.icon}</div>
                  <h2 className="text-xl font-bold text-white mb-1">{app.name}</h2>
                  <p className="text-sm text-gray-400">{app.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedApp(null)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Home size={20} /> Back to Hub
              </button>
              <h1 className="text-3xl font-bold">{selected?.name}</h1>
              <div></div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
              {selected && <selected.component />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppHub
