'use client'

import { useState, useEffect } from 'react'
import { getToolBySlug } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function Calculator() {
  const tool = getToolBySlug('inches-to-cm')!
  const [inches, setInches, inchesLoaded] = useToolStorage<string>('inches-to-cm', 'inches', '')
  const [cm, setCm, cmLoaded] = useToolStorage<string>('inches-to-cm', 'cm', '')

  useEffect(() => {
    recordToolVisit('inches-to-cm')
  }, [])

  const CONVERSION_FACTOR = 2.54

  const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInches(value)
    if (value === '' || value === '-') {
      setCm('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setCm((numValue * CONVERSION_FACTOR).toFixed(4))
      }
    }
  }

  const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCm(value)
    if (value === '' || value === '-') {
      setInches('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setInches((numValue / CONVERSION_FACTOR).toFixed(4))
      }
    }
  }

  const formula = `1 inch = ${CONVERSION_FACTOR} cm`
  const faq = [
    { q: 'How many cm in an inch?', a: `${CONVERSION_FACTOR} cm` },
    { q: 'How to convert inches to cm?', a: 'Multiply inches by 2.54' },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Inches</label>
          <input
            type="number"
            value={inches}
            onChange={handleInchesChange}
            placeholder="Enter inches"
            className="tool-input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Centimeters</label>
          <input
            type="number"
            value={cm}
            onChange={handleCmChange}
            placeholder="Enter centimeters"
            className="tool-input w-full"
          />
        </div>
      </div>

      {(inches || cm) && (
        <div className="tool-result bg-blue-50 border border-blue-200 rounded p-4">
          {inches && (
            <p className="text-lg">
              <strong>{inches}</strong> inches = <strong>{cm}</strong> cm
            </p>
          )}
          {cm && !inches && (
            <p className="text-lg">
              <strong>{cm}</strong> cm = <strong>{inches}</strong> inches
            </p>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
