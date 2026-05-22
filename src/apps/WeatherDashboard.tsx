import React, { useState, useEffect } from 'react'
import { Cloud, CloudRain, Droplets, Wind } from 'lucide-react'

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  location: string
}

const WeatherDashboard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState('Tokyo')

  const mockWeatherData: Record<string, WeatherData> = {
    tokyo: { temperature: 22, condition: 'Partly Cloudy', humidity: 65, windSpeed: 12, location: 'Tokyo' },
    london: { temperature: 15, condition: 'Rainy', humidity: 80, windSpeed: 18, location: 'London' },
    newyork: { temperature: 18, condition: 'Sunny', humidity: 55, windSpeed: 8, location: 'New York' },
    sydney: { temperature: 26, condition: 'Clear', humidity: 50, windSpeed: 10, location: 'Sydney' },
    paris: { temperature: 17, condition: 'Cloudy', humidity: 70, windSpeed: 14, location: 'Paris' }
  }

  const fetchWeather = (city: string) => {
    setLoading(true)
    setTimeout(() => {
      const data = mockWeatherData[city.toLowerCase()] || mockWeatherData.tokyo
      setWeather(data)
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    fetchWeather(location)
  }, [])

  const handleSearch = () => {
    fetchWeather(location)
  }

  const getWeatherIcon = () => {
    if (!weather) return null
    switch (weather.condition) {
      case 'Sunny':
      case 'Clear':
        return '☀️'
      case 'Rainy':
        return '🌧️'
      case 'Cloudy':
      case 'Partly Cloudy':
        return '⛅'
      default:
        return '🌤️'
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-slate-700 p-4 rounded-lg mb-6 flex gap-2">
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          placeholder="Enter city..."
          className="flex-1 px-3 py-2 bg-slate-600 rounded text-white"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-bold"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : weather ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">{weather.location}</h2>
            <div className="text-6xl my-4">{getWeatherIcon()}</div>
            <p className="text-5xl font-bold mb-2">{weather.temperature}°C</p>
            <p className="text-xl text-blue-100">{weather.condition}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Droplets size={20} /> Humidity
              </div>
              <p className="text-2xl font-bold">{weather.humidity}%</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Wind size={20} /> Wind
              </div>
              <p className="text-2xl font-bold">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="font-bold mb-3">Other Cities</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(mockWeatherData).map(city => (
                <button
                  key={city}
                  onClick={() => {
                    setLocation(mockWeatherData[city].location)
                    fetchWeather(city)
                  }}
                  className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm font-bold transition-colors"
                >
                  {mockWeatherData[city].location}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default WeatherDashboard
