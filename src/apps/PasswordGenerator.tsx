import React, { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let chars = ''
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) chars += '0123456789'
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'
    let pwd = ''
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(pwd)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  React.useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-slate-700 p-6 rounded-lg">
        <p className="text-gray-400 text-sm mb-2">Generated Password</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            className="flex-1 px-4 py-3 bg-slate-600 rounded font-mono text-lg text-white"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded font-bold flex items-center gap-2"
          >
            <Copy size={20} /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={e => setLength(+e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Uppercase', value: includeUppercase, setter: setIncludeUppercase },
            { label: 'Lowercase', value: includeLowercase, setter: setIncludeLowercase },
            { label: 'Numbers', value: includeNumbers, setter: setIncludeNumbers },
            { label: 'Symbols', value: includeSymbols, setter: setIncludeSymbols }
          ].map(opt => (
            <label key={opt.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={opt.value}
                onChange={e => opt.setter(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={generatePassword}
          className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded font-bold flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} /> Generate New
        </button>
      </div>
    </div>
  )
}

export default PasswordGenerator
