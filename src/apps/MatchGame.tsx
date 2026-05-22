import React, { useState, useEffect } from 'react'
import { RotateCcw } from 'lucide-react'

interface Card {
  id: number
  emoji: string
  matched: boolean
}

const MatchGame: React.FC = () => {
  const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧', '🎸', '🎹', '🎺']
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const initGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5)
    const newCards = shuffled.map((emoji, idx) => ({ id: idx, emoji, matched: false }))
    setCards(newCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  useEffect(() => {
    initGame()
  }, [])

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second])
      }
      setTimeout(() => setFlipped([]), 500)
      setMoves(moves + 1)
    }
  }, [flipped])

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true)
    }
  }, [matched])

  const toggleCard = (id: number) => {
    if (flipped.includes(id) || matched.includes(id)) return
    if (flipped.length >= 2) return
    setFlipped([...flipped, id])
  }

  return (
    <div className="text-center">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-400">Moves</p>
          <p className="text-3xl font-bold text-purple-400">{moves}</p>
        </div>
        <div>
          <p className="text-gray-400">Matched</p>
          <p className="text-3xl font-bold text-green-400">{Math.floor(matched.length / 2)}/12</p>
        </div>
        <button onClick={initGame} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-bold flex items-center gap-2">
          <RotateCcw size={20} /> New Game
        </button>
      </div>

      <div className="inline-block grid grid-cols-6 gap-2">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => toggleCard(card.id)}
            className={`w-16 h-16 rounded-lg font-bold text-3xl transition-all transform ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-700 hover:bg-slate-600'
            } ${matched.includes(card.id) ? 'ring-2 ring-green-400' : ''}`}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? card.emoji : '?'}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="mt-6 text-center">
          <p className="text-4xl font-bold text-yellow-300 mb-2">🎉 You Won!</p>
          <p className="text-xl text-gray-300">Completed in {moves} moves</p>
          <button onClick={initGame} className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold">
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default MatchGame
