'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function MarginCalculator() {
  const tool = getToolBySlug('margin-calculator')!
  const toolSlug = 'margin-calculator'

  const [costPrice, setCostPrice, costLoaded] = useToolStorage<string>(toolSlug, 'costPrice', '')
  const [sellingPrice, setSellingPrice, sellingLoaded] = useToolStorage<string>(toolSlug, 'sellingPrice', '')
  const [result, setResult] = useState<{
    profit: number
    profitMargin: number
    markup: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const handleCalculate = () => {
    const cost = parseFloat(costPrice)
    const selling = parseFloat(sellingPrice)

    if (!isNaN(cost) && !isNaN(selling) && cost > 0 && selling > 0) {
      const profit = selling - cost
      const profitMargin = (profit / selling) * 100
      const markup = (profit / cost) * 100

      setResult({
        profit,
        profitMargin,
        markup
      })
    }
  }

  const formula = 'Profit Margin = (Revenue - Cost) ÷ Revenue × 100\nMarkup = (Revenue - Cost) ÷ Cost × 100'

  const faq = [
    {
      q: 'What is profit margin?',
      a: 'Profit margin is the percentage of revenue that remains as profit after covering costs. A 30% profit margin means for every dollar of revenue, 30 cents is profit. Formula: (Revenue - Cost) ÷ Revenue × 100.'
    },
    {
      q: 'Margin vs markup?',
      a: 'Margin is based on selling price: (Selling - Cost) ÷ Selling × 100. Markup is based on cost: (Selling - Cost) ÷ Cost × 100. They are different calculations and can\'t be used interchangeably.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Cost Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Cost Price ($)</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="Enter cost price"
            step="0.01"
            className="tool-input"
          />
        </div>

        {/* Selling Price / Revenue */}
        <div>
          <label className="block text-sm font-medium mb-1">Selling Price / Revenue ($)</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Enter selling price or revenue"
            step="0.01"
            className="tool-input"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Margin
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Profit:</p>
              <p className="text-3xl font-bold text-green-600">${result.profit.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Profit Margin (%):</p>
              <p className="text-3xl font-bold text-blue-600">{result.profitMargin.toFixed(2)}%</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Markup (%):</p>
              <p className="text-3xl font-bold text-purple-600">{result.markup.toFixed(2)}%</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
              <p className="font-semibold mb-2">Breakdown:</p>
              <ul className="space-y-1">
                <li>Cost: ${parseFloat(costPrice).toFixed(2)}</li>
                <li>Revenue: ${parseFloat(sellingPrice).toFixed(2)}</li>
                <li>Profit: ${result.profit.toFixed(2)}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
