'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function InflationCalculator() {
  const tool = getToolBySlug('inflation-calculator')!
  const toolSlug = 'inflation-calculator'

  const [startAmount, setStartAmount, startAmountLoaded] = useToolStorage<string>(toolSlug, 'startAmount', '')
  const [startYear, setStartYear, startYearLoaded] = useToolStorage<string>(toolSlug, 'startYear', '2016')
  const [endYear, setEndYear, endYearLoaded] = useToolStorage<string>(toolSlug, 'endYear', '2026')
  const [result, setResult] = useState<{
    adjustedValue: number
    totalInflation: number
    purchasingPower: number
    years: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const averageAnnualInflationRate = 0.032 // 3.2% per year

  const years = Array.from({ length: 67 }, (_, i) => 1960 + i) // 1960-2026

  const handleCalculate = () => {
    const amount = parseFloat(startAmount)
    const start = parseInt(startYear)
    const end = parseInt(endYear)

    if (!isNaN(amount) && amount > 0 && start < end) {
      const yearsDiff = end - start

      // Calculate adjusted value using compound inflation formula
      // Future Value = Present Value × (1 + inflation rate) ^ years
      const adjustedValue = amount * Math.pow(1 + averageAnnualInflationRate, yearsDiff)

      // Total inflation percentage
      const totalInflation = ((adjustedValue - amount) / amount) * 100

      // Purchasing power (inverse calculation)
      const purchasingPower = (amount / adjustedValue) * 100

      setResult({
        adjustedValue,
        totalInflation,
        purchasingPower,
        years: yearsDiff,
      })
    }
  }

  const formula = 'Adjusted Value = Original Amount × (1 + Inflation Rate) ^ Years'

  const faq = [
    {
      q: 'What does inflation mean?',
      a: 'Inflation is the rate at which the general price level of goods and services rises, reducing the purchasing power of money. If inflation is 3%, something that cost $100 last year might cost $103 today.',
    },
    {
      q: 'Why is the 3.2% average inflation rate used?',
      a: 'The average US inflation rate over the past several decades has been approximately 3.2% per year. This is a reasonable long-term average, though actual rates vary by year and are affected by economic conditions.',
    },
    {
      q: 'What is purchasing power?',
      a: 'Purchasing power is how much goods or services you can buy with a specific amount of money. As inflation increases, your purchasing power decreases. For example, $100 today can buy less than $100 could buy 10 years ago.',
    },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Starting Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Starting Amount ($)</label>
          <input
            type="number"
            value={startAmount}
            onChange={(e) => setStartAmount(e.target.value)}
            placeholder="Enter amount"
            step="0.01"
            min="0"
            className="tool-input"
          />
        </div>

        {/* Start Year */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Year</label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="tool-input"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* End Year */}
        <div>
          <label className="block text-sm font-medium mb-1">End Year</label>
          <select
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="tool-input"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Inflation
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Adjusted Value ({result.years} years)</p>
              <p className="text-3xl font-bold text-green-600">${result.adjustedValue.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Inflation</p>
              <p className="text-3xl font-bold text-blue-600">{result.totalInflation.toFixed(2)}%</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Purchasing Power</p>
              <p className="text-3xl font-bold text-purple-600">{result.purchasingPower.toFixed(2)}%</p>
            </div>

            <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Original Amount:</span> ${parseFloat(startAmount).toFixed(2)}</p>
              <p><span className="font-medium">Time Period:</span> {startYear} - {endYear} ({result.years} years)</p>
              <p><span className="font-medium">Average Annual Inflation:</span> {(averageAnnualInflationRate * 100).toFixed(2)}%</p>
              <p className="text-xs text-gray-600 mt-3 pt-2 border-t border-gray-300">
                This means ${parseFloat(startAmount).toFixed(2)} in {startYear} would have the same purchasing power as ${result.adjustedValue.toFixed(2)} in {endYear}.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
