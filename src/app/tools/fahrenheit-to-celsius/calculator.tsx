'use client'

import { useState, useEffect } from 'react'
import { getToolBySlug } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function Calculator() {
  const tool = getToolBySlug('fahrenheit-to-celsius')!
  const [fahrenheit, setFahrenheit, fahrenheitLoaded] = useToolStorage<string>('fahrenheit-to-celsius', 'fahrenheit', '')
  const [celsius, setCelsius, celsiusLoaded] = useToolStorage<string>('fahrenheit-to-celsius', 'celsius', '')

  useEffect(() => {
    recordToolVisit('fahrenheit-to-celsius')
  }, [])

  const handleFahrenheitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFahrenheit(value)
    if (value === '' || value === '-') {
      setCelsius('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        const result = ((numValue - 32) * 5) / 9
        setCelsius(result.toFixed(2))
      }
    }
  }

  const handleCelsiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCelsius(value)
    if (value === '' || value === '-') {
      setFahrenheit('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        const result = (numValue * 9) / 5 + 32
        setFahrenheit(result.toFixed(2))
      }
    }
  }

  const formula = '°C = (°F - 32) × 5/9'
  const faq = [
    { q: 'What is 72°F in Celsius?', a: '22.22°C' },
    { q: 'What is 0°C in Fahrenheit?', a: '32°F' },
    { q: 'At what temperature are Celsius and Fahrenheit equal?', a: '-40° is the same in both scales' },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Fahrenheit (°F)</label>
          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            placeholder="Enter Fahrenheit"
            className="tool-input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Celsius (°C)</label>
          <input
            type="number"
            value={celsius}
            onChange={handleCelsiusChange}
            placeholder="Enter Celsius"
            className="tool-input w-full"
          />
        </div>
      </div>

      {(fahrenheit || celsius) && (
        <div className="tool-result bg-blue-50 border border-blue-200 rounded p-4">
          {fahrenheit && (
            <p className="text-lg">
              <strong>{fahrenheit}°F</strong> = <strong>{celsius}°C</strong>
            </p>
          )}
          {celsius && !fahrenheit && (
            <p className="text-lg">
              <strong>{celsius}°C</strong> = <strong>{fahrenheit}°F</strong>
            </p>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
