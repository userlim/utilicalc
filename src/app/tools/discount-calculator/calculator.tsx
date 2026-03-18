'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function DiscountCalculator() {
  const tool = getToolBySlug('discount-calculator')!
  const toolSlug = 'discount-calculator'

  const [originalPrice, setOriginalPrice, priceLoaded] = useToolStorage<string>(toolSlug, 'originalPrice', '')
  const [discountPercentage, setDiscountPercentage, discountLoaded] = useToolStorage<string>(toolSlug, 'discountPercentage', '')
  const [result, setResult] = useState<{
    discountAmount: number
    finalPrice: number
    savings: string
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const commonDiscounts = [10, 15, 20, 25, 30, 50]

  const handleCalculate = () => {
    const price = parseFloat(originalPrice)
    const discount = parseFloat(discountPercentage)

    if (!isNaN(price) && !isNaN(discount) && price > 0 && discount >= 0) {
      const discountAmount = (price * discount) / 100
      const finalPrice = price - discountAmount

      setResult({
        discountAmount,
        finalPrice,
        savings: `You save $${discountAmount.toFixed(2)}`
      })
    }
  }

  const handlePresetDiscount = (discount: number) => {
    setDiscountPercentage(discount.toString())
  }

  const formula = 'Final Price = Original Price - (Original Price × Discount % ÷ 100)'

  const faq = [
    {
      q: 'How to calculate discount?',
      a: 'Multiply the original price by the discount percentage and divide by 100 to get the discount amount. Subtract this from the original price to get the final price. For example, 20% off $100 = $100 - ($100 × 20 ÷ 100) = $80.'
    },
    {
      q: 'What is 20% off?',
      a: '20% off means you pay 80% of the original price. For a $100 item, 20% off = $20 discount, and you pay $80.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Original Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Original Price ($)</label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter original price"
            step="0.01"
            className="tool-input"
          />
        </div>

        {/* Discount Percentage */}
        <div>
          <label className="block text-sm font-medium mb-2">Discount Percentage (%)</label>
          <div className="grid grid-cols-6 gap-2 mb-3">
            {commonDiscounts.map((discount) => (
              <button
                key={discount}
                onClick={() => handlePresetDiscount(discount)}
                className={`py-2 rounded font-medium transition-colors text-sm ${
                  discountPercentage === discount.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {discount}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="Enter discount percentage"
            min="0"
            max="100"
            className="tool-input"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Discount
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Discount Amount:</p>
              <p className="text-3xl font-bold text-red-600">${result.discountAmount.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Final Price:</p>
              <p className="text-3xl font-bold text-green-600">${result.finalPrice.toFixed(2)}</p>
            </div>

            <div className="tool-result bg-green-50 border-green-200">
              <p className="text-lg font-semibold text-green-800">{result.savings}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
