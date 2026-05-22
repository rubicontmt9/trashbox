import React, { useState } from 'react'

interface Tile {
  id: number
  value: number
  isNew?: boolean
}

const Game2048: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const initGame = () => {
    const newTiles = []
    for (let i = 0; i < 16; i++) {
      newTiles.push({ id: i, value: 0 })
    }
    addNewTile(newTiles)
    addNewTile(newTiles)
    setTiles(newTiles)
    setScore(0)
    setGameOver(false)
  }

  const addNewTile = (tilesToUpdate: Tile[]) => {
    const empty = tilesToUpdate.filter(t => t.value === 0)
    if (empty.length) {
      const randomTile = empty[Math.floor(Math.random() * empty.length)]
      randomTile.value = Math.random() < 0.9 ? 2 : 4
      randomTile.isNew = true
    }
  }

  const moveTiles = (direction: 'left' | 'right' | 'up' | 'down') => {
    let newTiles = JSON.parse(JSON.stringify(tiles))
    let moved = false
    let points = 0

    if (direction === 'left' || direction === 'right') {
      for (let row = 0; row < 4; row++) {
        const line = [0, 1, 2, 3].map(col => newTiles[row * 4 + col].value)
        const { combined, points: rowPoints } = combineLine(direction === 'left' ? line : line.reverse())
        points += rowPoints

        if (direction === 'right') combined.reverse()
        for (let i = 0; i < 4; i++) {
          const tile = newTiles[row * 4 + i]
          if (tile.value !== combined[i]) moved = true
          tile.value = combined[i]
          tile.isNew = false
        }
      }
    } else {
      for (let col = 0; col < 4; col++) {
        const line = [0, 1, 2, 3].map(row => newTiles[row * 4 + col].value)
        const { combined, points: colPoints } = combineLine(direction === 'up' ? line : line.reverse())
        points += colPoints

        if (direction === 'down') combined.reverse()
        for (let i = 0; i < 4; i++) {
          const tile = newTiles[i * 4 + col]
          if (tile.value !== combined[i]) moved = true
          tile.value = combined[i]
          tile.isNew = false
        }
      }
    }

    if (moved) {
      addNewTile(newTiles)
      setTiles(newTiles)
      setScore(score + points)
      if (checkGameOver(newTiles)) setGameOver(true)
    }
  }

  const combineLine = (line: number[]): { combined: number[]; points: number } => {
    const filtered = line.filter(v => v !== 0)
    let combined = []
    let points = 0

    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === filtered[i + 1]) {
        combined.push(filtered[i] * 2)
        points += filtered[i] * 2
        i++
      } else {
        combined.push(filtered[i])
      }
    }

    while (combined.length < 4) combined.push(0)
    return { combined, points }
  }

  const checkGameOver = (tilesToCheck: Tile[]) => {
    if (tilesToCheck.some(t => t.value === 0)) return false
    for (let i = 0; i < 16; i++) {
      if (i % 4 < 3 && tilesToCheck[i].value === tilesToCheck[i + 1].value) return false
      if (i < 12 && tilesToCheck[i].value === tilesToCheck[i + 4].value) return false
    }
    return true
  }

  React.useEffect(() => {
    initGame()
    const handleKeyPress = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        const dirMap = { ArrowLeft: 'left' as const, ArrowRight: 'right' as const, ArrowUp: 'up' as const, ArrowDown: 'down' as const }
        moveTiles(dirMap[e.key as keyof typeof dirMap])
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const getTileColor = (value: number) => {
    const colors: Record<number, string> = {
      2: 'bg-yellow-100', 4: 'bg-yellow-200', 8: 'bg-yellow-300', 16: 'bg-yellow-400',
      32: 'bg-orange-300', 64: 'bg-orange-400', 128: 'bg-orange-500', 256: 'bg-red-400',
      512: 'bg-red-500', 1024: 'bg-purple-500', 2048: 'bg-purple-600'
    }
    return colors[value] || 'bg-gray-600'
  }

  return (
    <div className="text-center">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">Score</p>
          <p className="text-3xl font-bold text-yellow-400">{score}</p>
        </div>
        <button onClick={initGame} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold">New Game</button>
      </div>
      <div className="inline-block bg-slate-700 p-4 rounded-lg">
        <div className="grid grid-cols-4 gap-2">
          {tiles.map((tile, idx) => (
            <div
              key={idx}
              className={`w-20 h-20 rounded flex items-center justify-center font-bold text-xl ${getTileColor(tile.value)} ${tile.isNew ? 'animate-bounce' : ''}`}
            >
              {tile.value || ''}
            </div>
          ))}
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-4">Use arrow keys to move</p>
      {gameOver && <p className="text-red-400 mt-4 text-lg font-bold">Game Over!</p>}
    </div>
  )
}

export default Game2048
