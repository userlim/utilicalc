'use client'

import { useState, useEffect } from 'react'
import { getToolBySlug } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function Calculator() {
  const tool = getToolBySlug('cups-to-ml')!
  const [cups, setCups, cupsLoaded] = useToolStorage<string>('cups-to-ml', 'cups', '')
  const [ml, setMl, mlLoaded] = useToolStorage<string>('cups-to-ml', 'ml', '')

  useEffect(() => {
    recordToolVisit('cups-to-ml')
  }, [])

  const CONVERSION_FACTOR = 236.588

  const handleCupsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCups(value)
    if (value === '' || value === '-') {
      setMl('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setMl((numValue * CONVERSION_FACTOR).toFixed(2))
      }
    }
  }

  const handleMlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMl(value)
    if (value === '' || value === '-') {
      setCups('')
    } else {
      const numValue = parseFloat(value)
      if (!isNaN(numValue)) {
        setCups((numValue / CONVERSION_FACTOR).toFixed(4))
      }
    }
  }

  const formula = `1 US cup = ${CONVERSION_FACTOR} ml`
  const faq = [
    { q: 'How many ml in a cup?', a: `${CONVERSION_FACTOR} ml` },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Cups (US)</label>
          <input
            type="number"
            value={cups}
            onChange={handleCupsChange}
            placeholder="Enter cups"
            className="tool-input w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Milliliters (ml)</label>
          <input
            type="number"
            value={ml}
            onChange={handleMlChange}
            placeholder="Enter milliliters"
            className="tool-input w-full"
          />
        </div>
      </div>

      {(cups || ml) && (
        <div className="tool-result bg-blue-50 border border-blue-200 rounded p-4">
          {cups && (
            <p className="text-lg">
              <strong>{cups}</strong> cups = <strong>{ml}</strong> ml
            </p>
          )}
          {ml && !cups && (
            <p className="text-lg">
              <strong>{ml}</strong> ml = <strong>{cups}</strong> cups
            </p>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
