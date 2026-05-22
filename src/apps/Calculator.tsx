import React, { useState } from 'react'
import { Delete } from 'lucide-react'

interface HistoryItem {
  id: number
  operation: string
  result: number
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [lastNum, setLastNum] = useState('')
  const [operation, setOperation] = useState('')

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num)
    } else {
      setDisplay(display + num)
    }
  }

  const handleOperation = (op: string) => {
    if (operation && display !== lastNum) {
      calculate()
    }
    setLastNum(display)
    setOperation(op)
    setDisplay('0')
  }

  const calculate = () => {
    if (!operation || lastNum === '') return

    const num1 = parseFloat(lastNum)
    const num2 = parseFloat(display)
    let result = 0

    switch (operation) {
      case '+': result = num1 + num2; break
      case '-': result = num1 - num2; break
      case '×': result = num1 * num2; break
      case '÷': result = num1 / num2; break
      case '%': result = num1 % num2; break
      default: return
    }

    setDisplay(result.toString())
    setHistory([...history, { id: Date.now(), operation: `${lastNum} ${operation} ${num2}`, result }])
    setOperation('')
    setLastNum('')
  }

  const handleEquals = () => {
    calculate()
  }

  const handleClear = () => {
    setDisplay('0')
    setLastNum('')
    setOperation('')
  }

  const buttonClass = 'p-4 rounded font-bold text-xl hover:opacity-80 transition-opacity'
  const numButtonClass = `${buttonClass} bg-slate-700 hover:bg-slate-600`
  const opButtonClass = `${buttonClass} bg-purple-600 hover:bg-purple-700`
  const eqButtonClass = `${buttonClass} bg-green-600 hover:bg-green-700`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-slate-700 p-6 rounded-lg text-right">
          <p className="text-5xl font-bold text-purple-300 break-words">{display}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button onClick={handleClear} className={`${buttonClass} bg-red-600 col-span-2`}>AC</button>
          <button onClick={() => handleOperation('/')} className={opButtonClass}>÷</button>
          <button onClick={() => handleOperation('×')} className={opButtonClass}>×</button>

          {[7, 8, 9].map(n => <button key={n} onClick={() => handleNumber(n.toString())} className={numButtonClass}>{n}</button>)}
          <button onClick={() => handleOperation('-')} className={opButtonClass}>-</button>

          {[4, 5, 6].map(n => <button key={n} onClick={() => handleNumber(n.toString())} className={numButtonClass}>{n}</button>)}
          <button onClick={() => handleOperation('+')} className={opButtonClass}>+</button>

          {[1, 2, 3].map(n => <button key={n} onClick={() => handleNumber(n.toString())} className={numButtonClass}>{n}</button>)}
          <button onClick={() => handleOperation('%')} className={opButtonClass}>%</button>

          <button onClick={() => handleNumber('0')} className={`${numButtonClass} col-span-2`}>0</button>
          <button onClick={() => handleNumber('.')} className={numButtonClass}>.</button>
          <button onClick={handleEquals} className={eqButtonClass}>=</button>
        </div>
      </div>

      <div className="bg-slate-700 p-4 rounded-lg">
        <h3 className="font-bold mb-3">History</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No history</p>
          ) : (
            history.map(item => (
              <div key={item.id} className="text-xs bg-slate-600 p-2 rounded">
                <p className="text-gray-300">{item.operation}</p>
                <p className="font-bold text-purple-300">= {item.result}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Calculator
