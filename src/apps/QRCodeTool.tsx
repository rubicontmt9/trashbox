import React, { useState } from 'react'
import { Download } from 'lucide-react'

const QRCodeTool: React.FC = () => {
  const [text, setText] = useState('https://github.com')
  const [qrCode, setQrCode] = useState('')
  const [size, setSize] = useState(300)

  const generateQR = (value: string) => {
    if (!value) return
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(value)}`
    setQrCode(url)
  }

  React.useEffect(() => {
    generateQR(text)
  }, [size])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-gray-400 text-sm">Text or URL</label>
        <textarea
          value={text}
          onChange={e => {
            setText(e.target.value)
            generateQR(e.target.value)
          }}
          className="w-full px-4 py-3 bg-slate-700 rounded text-white border border-slate-600 focus:border-purple-400 outline-none resize-none"
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          min="100"
          max="500"
          step="50"
          value={size}
          onChange={e => setSize(+e.target.value)}
          className="px-4 py-2 bg-slate-700 rounded text-white border border-slate-600"
        />
        <span className="text-gray-400 self-center">Size: {size}px</span>
      </div>

      {qrCode && (
        <div className="text-center">
          <img src={qrCode} alt="QR Code" className="inline-block border-4 border-slate-600 p-2 bg-white rounded" />
          <div className="mt-4">
            <a href={qrCode} download="qrcode.png" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold">
              <Download size={20} /> Download QR
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default QRCodeTool
