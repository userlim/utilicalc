'use client'

import { useState, useEffect } from 'react'
import { getToolBySlug } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function Calculator() {
  const tool = getToolBySlug('feet-to-meters')!
  const [feet, setFeet, feetLoaded] = useToolStorage<string>('feet-to-meters', 'feet', '')
  const [meters, setMeters, metersLoaded] = useToolStorage<string>('feet-to-meters', 'meters', '')

  useEffect(() => {
    recordToolVisit('feet-to-meters')
  }, [])

  const CONVERSION_FACTOR = 0.3048

  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFeet(value)
    if (value === '' || value === '-') {
      setMeters('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setMeters((numValue * CONVERSION_FACTOR).toFixed(4))
      }
    }
  }

  const handleMetersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMeters(value)
    if (value === '' || value === '-') {
      setFeet('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setFeet((numValue / CONVERSION_FACTOR).toFixed(4))
      }
    }
  }

  const formula = `1 ft = ${CONVERSION_FACTOR} m`
  const faq = [
    { q: 'How many meters in a foot?', a: `${CONVERSION_FACTOR} m` },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Feet</label>
          <input
            type="number"
            value={feet}
            onChange={handleFeetChange}
            placeholder="Enter feet"
            className="tool-input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Meters</label>
          <input
            type="number"
            value={meters}
            onChange={handleMetersChange}
            placeholder="Enter meters"
            className="tool-input w-full"
          />
        </div>
      </div>

      {(feet || meters) && (
        <div className="tool-result bg-blue-50 border border-blue-200 rounded p-4">
          {feet && (
            <p className="text-lg">
              <strong>{feet}</strong> ft = <strong>{meters}</strong> m
            </p>
          )}
          {meters && !feet && (
            <p className="text-lg">
              <strong>{meters}</strong> m = <strong>{feet}</strong> ft
            </p>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
