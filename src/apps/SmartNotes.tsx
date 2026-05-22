import React, { useState } from 'react'
import { Plus, Trash2, Copy } from 'lucide-react'

interface Note {
  id: number
  title: string
  content: string
  date: string
}

const SmartNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('smartnotes')
    return saved ? JSON.parse(saved) : []
  })
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')

  const saveNotes = (updated: Note[]) => {
    setNotes(updated)
    localStorage.setItem('smartnotes', JSON.stringify(updated))
  }

  const addNote = () => {
    if (!title || !content) return
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleString()
    }
    saveNotes([newNote, ...notes])
    setTitle('')
    setContent('')
  }

  const deleteNote = (id: number) => {
    saveNotes(notes.filter(n => n.id !== id))
  }

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-bold text-lg">New Note</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 rounded text-white"
        />
        <textarea
          placeholder="Content..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 rounded text-white resize-none"
          rows={8}
        />
        <button
          onClick={addNote}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-bold flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Save Note
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg mb-2">Notes ({filtered.length})</h3>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 rounded text-white mb-4"
          />
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No notes yet</p>
          ) : (
            filtered.map(note => (
              <div key={note.id} className="bg-slate-700 p-3 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">{note.title}</h4>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-300 mb-2">{note.content.substring(0, 100)}...</p>
                <p className="text-xs text-gray-500">{note.date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SmartNotes
