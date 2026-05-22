import React, { useState } from 'react'
import { Plus, Trash2, CheckCircle2 } from 'lucide-react'

interface Task {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false, priority }])
    setNewTask('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-700 p-4 rounded-lg">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add a task..."
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTask()}
            className="flex-1 px-3 py-2 bg-slate-600 rounded text-white"
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as any)}
            className="px-3 py-2 bg-slate-600 rounded text-white"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={addTask}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-bold"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-sm font-bold ${
                filter === f ? 'bg-purple-600' : 'bg-slate-600 hover:bg-slate-500'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No tasks</p>
        ) : (
          filtered.map(task => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                task.completed
                  ? 'bg-slate-700 border-slate-600 opacity-60'
                  : 'bg-slate-700 border-slate-600 hover:border-purple-400'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 ${getPriorityColor(task.priority)}`}
              >
                <CheckCircle2 size={24} fill={task.completed ? 'currentColor' : 'none'} />
              </button>
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskManager
