'use client'

import { useState, useEffect } from 'react'
import { getToolBySlug } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function Calculator() {
  const tool = getToolBySlug('lbs-to-kg')!
  const [lbs, setLbs, lbsLoaded] = useToolStorage<string>('lbs-to-kg', 'lbs', '')
  const [kg, setKg, kgLoaded] = useToolStorage<string>('lbs-to-kg', 'kg', '')

  useEffect(() => {
    recordToolVisit('lbs-to-kg')
  }, [])

  const CONVERSION_FACTOR = 0.453592

  const handleLbsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLbs(value)
    if (value === '' || value === '-') {
      setKg('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setKg((numValue * CONVERSION_FACTOR).toFixed(4))
      }
    }
  }

  const handleKgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setKg(value)
    if (value === '' || value === '-') {
      setLbs('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setLbs((numValue / CONVERSION_FACTOR).toFixed(4))
      }
    }
  }

  const formula = `1 lb = ${CONVERSION_FACTOR} kg`
  const faq = [
    { q: 'How many kg in a pound?', a: `${CONVERSION_FACTOR} kg` },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Pounds (lbs)</label>
          <input
            type="number"
            value={lbs}
            onChange={handleLbsChange}
            placeholder="Enter pounds"
            className="tool-input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Kilograms (kg)</label>
          <input
            type="number"
            value={kg}
            onChange={handleKgChange}
            placeholder="Enter kilograms"
            className="tool-input w-full"
          />
        </div>
      </div>

      {(lbs || kg) && (
        <div className="tool-result bg-blue-50 border border-blue-200 rounded p-4">
          {lbs && (
            <p className="text-lg">
              <strong>{lbs}</strong> lbs = <strong>{kg}</strong> kg
            </p>
          )}
          {kg && !lbs && (
            <p className="text-lg">
              <strong>{kg}</strong> kg = <strong>{lbs}</strong> lbs
            </p>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
