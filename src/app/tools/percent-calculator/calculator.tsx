'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function PercentCalculator() {
  const tool = getToolBySlug('percent-calculator')!
  const toolSlug = 'percent-calculator'

  const [mode, setMode, modeLoaded] = useToolStorage<'percentage-of' | 'what-percent' | 'increase-decrease'>(toolSlug, 'mode', 'percentage-of')
  const [result, setResult] = useState<number | null>(null)

  // Mode 1: What is X% of Y?
  const [x1, setX1, x1Loaded] = useToolStorage<string>(toolSlug, 'x1', '')
  const [y1, setY1, y1Loaded] = useToolStorage<string>(toolSlug, 'y1', '')

  // Mode 2: X is what % of Y?
  const [x2, setX2, x2Loaded] = useToolStorage<string>(toolSlug, 'x2', '')
  const [y2, setY2, y2Loaded] = useToolStorage<string>(toolSlug, 'y2', '')

  // Mode 3: % increase/decrease from X to Y
  const [x3, setX3, x3Loaded] = useToolStorage<string>(toolSlug, 'x3', '')
  const [y3, setY3, y3Loaded] = useToolStorage<string>(toolSlug, 'y3', '')

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const handleCalculate = () => {
    let calc: number | null = null

    if (mode === 'percentage-of') {
      const x = parseFloat(x1)
      const y = parseFloat(y1)
      if (!isNaN(x) && !isNaN(y)) {
        calc = (x / 100) * y
      }
    } else if (mode === 'what-percent') {
      const x = parseFloat(x2)
      const y = parseFloat(y2)
      if (!isNaN(x) && !isNaN(y) && y !== 0) {
        calc = (x / y) * 100
      }
    } else if (mode === 'increase-decrease') {
      const x = parseFloat(x3)
      const y = parseFloat(y3)
      if (!isNaN(x) && !isNaN(y) && x !== 0) {
        calc = ((y - x) / x) * 100
      }
    }

    setResult(calc)
  }

  const formula =
    mode === 'percentage-of'
      ? '(X ÷ 100) × Y'
      : mode === 'what-percent'
      ? '(X ÷ Y) × 100'
      : '((Y - X) ÷ X) × 100'

  const faq = [
    {
      q: 'How to calculate percentage?',
      a: 'To calculate X% of Y, divide X by 100 and multiply by Y. For example, 20% of 150 = (20 ÷ 100) × 150 = 30.'
    },
    {
      q: 'How to find percentage increase?',
      a: 'Percentage increase = ((New Value - Original Value) ÷ Original Value) × 100. For example, from 100 to 150 is a 50% increase.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Mode selector */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setMode('percentage-of'); setResult(null) }}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              mode === 'percentage-of'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            X% of Y
          </button>
          <button
            onClick={() => { setMode('what-percent'); setResult(null) }}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              mode === 'what-percent'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            X is %Y
          </button>
          <button
            onClick={() => { setMode('increase-decrease'); setResult(null) }}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              mode === 'increase-decrease'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            % Change
          </button>
        </div>

        {/* Mode 1: What is X% of Y? */}
        {mode === 'percentage-of' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Percentage (X)</label>
              <input
                type="number"
                value={x1}
                onChange={(e) => setX1(e.target.value)}
                placeholder="Enter percentage"
                className="tool-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Value (Y)</label>
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                placeholder="Enter total value"
                className="tool-input"
              />
            </div>
          </div>
        )}

        {/* Mode 2: X is what % of Y? */}
        {mode === 'what-percent' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Value (X)</label>
              <input
                type="number"
                value={x2}
                onChange={(e) => setX2(e.target.value)}
                placeholder="Enter value"
                className="tool-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total (Y)</label>
              <input
                type="number"
                value={y2}
                onChange={(e) => setY2(e.target.value)}
                placeholder="Enter total"
                className="tool-input"
              />
            </div>
          </div>
        )}

        {/* Mode 3: % increase/decrease */}
        {mode === 'increase-decrease' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Original Value (X)</label>
              <input
                type="number"
                value={x3}
                onChange={(e) => setX3(e.target.value)}
                placeholder="Enter original value"
                className="tool-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Value (Y)</label>
              <input
                type="number"
                value={y3}
                onChange={(e) => setY3(e.target.value)}
                placeholder="Enter new value"
                className="tool-input"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="tool-result">
            <p className="text-sm text-gray-600 mb-2">Result:</p>
            <p className="text-3xl font-bold text-blue-600">
              {result.toFixed(2)}
              {mode === 'what-percent' || mode === 'increase-decrease' ? '%' : ''}
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
