'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function CryptoProfitCalculator() {
  const tool = getToolBySlug('crypto-profit-calculator')!
  const toolSlug = 'crypto-profit-calculator'

  const [buyPrice, setBuyPrice, buyPriceLoaded] = useToolStorage<string>(toolSlug, 'buyPrice', '')
  const [sellPrice, setSellPrice, sellPriceLoaded] = useToolStorage<string>(toolSlug, 'sellPrice', '')
  const [coinAmount, setCoinAmount, coinAmountLoaded] = useToolStorage<string>(toolSlug, 'coinAmount', '')
  const [investmentFee, setInvestmentFee, investmentFeeLoaded] = useToolStorage<string>(toolSlug, 'investmentFee', '0')
  const [result, setResult] = useState<{
    totalInvestment: number
    totalReturn: number
    profit: number
    profitPercentage: number
    roi: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const handleCalculate = () => {
    const buy = parseFloat(buyPrice)
    const sell = parseFloat(sellPrice)
    const amount = parseFloat(coinAmount)
    const fee = parseFloat(investmentFee) || 0

    if (!isNaN(buy) && !isNaN(sell) && !isNaN(amount) && amount > 0 && buy > 0) {
      const totalInvestment = buy * amount
      const feeAmount = (totalInvestment * fee) / 100
      const adjustedInvestment = totalInvestment + feeAmount
      const totalReturn = sell * amount
      const profit = totalReturn - adjustedInvestment
      const profitPercentage = (profit / adjustedInvestment) * 100
      const roi = profitPercentage

      setResult({
        totalInvestment: adjustedInvestment,
        totalReturn,
        profit,
        profitPercentage,
        roi
      })
    }
  }

  const formula = 'Profit = (Sell Price × Coins) - (Buy Price × Coins × (1 + Fee%))'

  const faq = [
    {
      q: 'How is cryptocurrency profit calculated?',
      a: 'Cryptocurrency profit is calculated by subtracting your total investment (including fees) from your total return. Profit = (Sell Price × Amount) - (Buy Price × Amount + Investment Fees).'
    },
    {
      q: 'What is ROI in crypto investing?',
      a: 'Return on Investment (ROI) is the percentage profit you make on your investment. It shows how much your money has grown. A higher ROI percentage indicates a better return on your investment.'
    },
    {
      q: 'Why do investment fees matter?',
      a: 'Investment fees (exchange fees, trading fees, etc.) reduce your overall profit. Even small fees of 1-2% can significantly impact your returns, especially on large investments. Always account for fees when calculating crypto profits.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Buy Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Buy Price per Coin ($)</label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="Enter purchase price per coin"
            step="0.01"
            className="tool-input"
          />
        </div>

        {/* Sell Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Sell Price per Coin ($)</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            placeholder="Enter selling price per coin"
            step="0.01"
            className="tool-input"
          />
        </div>

        {/* Coin Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount of Coins</label>
          <input
            type="number"
            value={coinAmount}
            onChange={(e) => setCoinAmount(e.target.value)}
            placeholder="Enter number of coins"
            step="0.00000001"
            className="tool-input"
          />
        </div>

        {/* Investment Fee */}
        <div>
          <label className="block text-sm font-medium mb-1">Investment Fee (%) <span className="text-xs text-gray-600">(Optional)</span></label>
          <input
            type="number"
            value={investmentFee}
            onChange={(e) => setInvestmentFee(e.target.value)}
            placeholder="Enter fee percentage"
            step="0.1"
            className="tool-input"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Profit
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Investment:</p>
              <p className="text-3xl font-bold text-blue-600">${result.totalInvestment.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Return:</p>
              <p className="text-3xl font-bold text-blue-600">${result.totalReturn.toFixed(2)}</p>
            </div>

            <div className={`tool-result ${result.profit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className="text-sm text-gray-600 mb-2">Profit / Loss:</p>
              <p className={`text-3xl font-bold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.profit >= 0 ? '+' : ''} ${result.profit.toFixed(2)}
              </p>
            </div>

            <div className={`tool-result ${result.profitPercentage >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className="text-sm text-gray-600 mb-2">Profit / Loss (%):</p>
              <p className={`text-3xl font-bold ${result.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.profitPercentage >= 0 ? '+' : ''} {result.profitPercentage.toFixed(2)}%
              </p>
            </div>

            <div className={`tool-result ${result.roi >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <p className="text-sm text-gray-600 mb-2">ROI (%):</p>
              <p className={`text-3xl font-bold ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {result.roi >= 0 ? '+' : ''} {result.roi.toFixed(2)}%
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
