import React, { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'

interface Expense {
  id: number
  description: string
  amount: number
  category: string
  date: string
}

const BudgetTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Other']

  const addExpense = () => {
    if (!description || !amount) return
    setExpenses([...expenses, {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    }])
    setDescription('')
    setAmount('')
  }

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)
  const byCategory = categories.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-slate-700 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-slate-600 rounded mb-2 text-white"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-600 rounded text-white"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-3 py-2 bg-slate-600 rounded text-white"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button
            onClick={addExpense}
            className="w-full mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-bold flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {expenses.map(exp => (
            <div key={exp.id} className="bg-slate-700 p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-bold">{exp.description}</p>
                <p className="text-sm text-gray-400">{exp.category} • {exp.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-lg">${exp.amount.toFixed(2)}</p>
                <button onClick={() => deleteExpense(exp.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-purple-700 p-4 rounded-lg">
          <p className="text-gray-300 text-sm">Total Expenses</p>
          <p className="text-4xl font-bold text-yellow-300">${total.toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          {byCategory.map(item => (
            <div key={item.category} className="bg-slate-700 p-3 rounded">
              <p className="text-sm text-gray-400">{item.category}</p>
              <p className="font-bold">${item.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BudgetTracker
