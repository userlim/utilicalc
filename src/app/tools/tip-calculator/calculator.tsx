'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function TipCalculator() {
  const tool = getToolBySlug('tip-calculator')!
  const toolSlug = 'tip-calculator'

  const [billAmount, setBillAmount, billLoaded] = useToolStorage<string>(toolSlug, 'billAmount', '')
  const [tipPercentage, setTipPercentage, tipLoaded] = useToolStorage<number>(toolSlug, 'tipPercentage', 15)
  const [customTip, setCustomTip] = useState('')
  const [numPeople, setNumPeople, numPeopleLoaded] = useToolStorage<string>(toolSlug, 'numPeople', '1')
  const [result, setResult] = useState<{
    tipAmount: number
    totalAmount: number
    perPerson: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const presetTips = [10, 15, 18, 20, 25]

  const handleCalculate = () => {
    const bill = parseFloat(billAmount)
    const tip = customTip ? parseFloat(customTip) : tipPercentage
    const people = parseInt(numPeople)

    if (!isNaN(bill) && !isNaN(tip) && !isNaN(people) && people > 0) {
      const tipAmount = (bill * tip) / 100
      const totalAmount = bill + tipAmount
      const perPerson = totalAmount / people

      setResult({
        tipAmount,
        totalAmount,
        perPerson
      })
    }
  }

  const formula = 'Tip = Bill × (Tip % ÷ 100)'

  const faq = [
    {
      q: 'How much should I tip?',
      a: 'Standard tipping guidelines are 15-20% for good service, 18-25% for excellent service, and 10-15% for basic service. This varies by country and type of service.'
    },
    {
      q: 'How to calculate tip?',
      a: 'Multiply the bill amount by the tip percentage and divide by 100. For example, 20% tip on $50 bill = ($50 × 20) ÷ 100 = $10.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Bill Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Bill Amount ($)</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="Enter bill amount"
            step="0.01"
            className="tool-input"
          />
        </div>

        {/* Tip Percentage - Preset Buttons */}
        <div>
          <label className="block text-sm font-medium mb-2">Tip Percentage</label>
          <div className="grid grid-cols-5 gap-2 mb-3">
            {presetTips.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setTipPercentage(preset)
                  setCustomTip('')
                }}
                className={`py-2 rounded font-medium transition-colors ${
                  tipPercentage === preset && customTip === ''
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {preset}%
              </button>
            ))}
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Custom Tip (%)</label>
            <input
              type="number"
              value={customTip}
              onChange={(e) => {
                setCustomTip(e.target.value)
                if (e.target.value) setTipPercentage(0)
              }}
              placeholder="Enter custom percentage"
              className="tool-input"
            />
          </div>
        </div>

        {/* Number of People */}
        <div>
          <label className="block text-sm font-medium mb-1">Number of People</label>
          <input
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            placeholder="Enter number of people"
            min="1"
            className="tool-input"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Tip
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Tip Amount:</p>
              <p className="text-3xl font-bold text-green-600">${result.tipAmount.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Amount:</p>
              <p className="text-3xl font-bold text-blue-600">${result.totalAmount.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Per Person:</p>
              <p className="text-3xl font-bold text-purple-600">${result.perPerson.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
