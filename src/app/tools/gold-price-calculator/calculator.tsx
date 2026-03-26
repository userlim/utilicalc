'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function GoldPriceCalculator() {
  const tool = getToolBySlug('gold-price-calculator')!
  const toolSlug = 'gold-price-calculator'

  const [weight, setWeight, weightLoaded] = useToolStorage<string>(toolSlug, 'weight', '')
  const [unit, setUnit, unitLoaded] = useToolStorage<string>(toolSlug, 'unit', 'grams')
  const [purity, setPurity, purityLoaded] = useToolStorage<string>(toolSlug, 'purity', '24K')
  const [result, setResult] = useState<{
    goldValue: number
    weight: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const goldPricePerTroyOz = 4551 // USD per troy ounce, March 2026

  // Purity percentages
  const purityMap: { [key: string]: number } = {
    '24K': 1.0,
    '22K': 0.9167,
    '18K': 0.75,
    '14K': 0.5833,
  }

  // Conversion factors to troy ounces
  const conversionToTroyOz: { [key: string]: number } = {
    'grams': 1 / 31.1035,
    'ounces': 1 / 31.1035 * 28.3495, // avoirdupois ounces
    'troy-ounces': 1,
  }

  const handleCalculate = () => {
    const w = parseFloat(weight)

    if (!isNaN(w) && w > 0) {
      // Convert to troy ounces
      const troyOz = w * conversionToTroyOz[unit]

      // Apply purity percentage
      const purityFactor = purityMap[purity]
      const pureGoldTroyOz = troyOz * purityFactor

      // Calculate value
      const goldValue = pureGoldTroyOz * goldPricePerTroyOz

      setResult({
        goldValue,
        weight: w,
      })
    }
  }

  const formula = 'Gold Value = Weight (in troy oz) × Purity % × Price per troy oz'

  const faq = [
    {
      q: 'What is the difference between purity levels?',
      a: '24K gold is pure gold (100%), 22K is 91.67% gold, 18K is 75% gold, and 14K is 58.33% gold. The remaining percentage is other metals like copper or silver.',
    },
    {
      q: 'What is the difference between ounces and troy ounces?',
      a: 'A troy ounce (used for precious metals) equals 31.1035 grams, while an avoirdupois ounce (common ounce) equals 28.3495 grams. Always use troy ounces for gold pricing.',
    },
    {
      q: 'Why does gold purity matter?',
      a: 'Gold purity determines the actual amount of gold in an item. Lower purity items contain less pure gold, so they are worth less despite having the same weight.',
    },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Note about price */}
        <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-800">
          <p className="font-medium mb-1">Gold Price: ${goldPricePerTroyOz}/troy oz</p>
          <p className="text-xs">Price as of March 2026. Update manually based on current market rates.</p>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium mb-1">Gold Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            step="0.01"
            className="tool-input"
          />
        </div>

        {/* Unit Selector */}
        <div>
          <label className="block text-sm font-medium mb-1">Unit of Measurement</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="tool-input"
          >
            <option value="grams">Grams</option>
            <option value="ounces">Ounces (Avoirdupois)</option>
            <option value="troy-ounces">Troy Ounces</option>
          </select>
        </div>

        {/* Purity Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Gold Purity</label>
          <div className="grid grid-cols-4 gap-2">
            {['24K', '22K', '18K', '14K'].map((p) => (
              <button
                key={p}
                onClick={() => setPurity(p)}
                className={`py-2 rounded font-medium transition-colors text-sm ${
                  purity === p
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Gold Value
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Estimated Gold Value (USD)</p>
              <p className="text-3xl font-bold text-green-600">${result.goldValue.toFixed(2)}</p>
            </div>

            <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Input Weight:</span> {result.weight} {unit === 'grams' ? 'g' : unit === 'ounces' ? 'oz' : 'troy oz'}</p>
              <p><span className="font-medium">Gold Purity:</span> {purity}</p>
              <p><span className="font-medium">Price per Troy Oz:</span> ${goldPricePerTroyOz}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
