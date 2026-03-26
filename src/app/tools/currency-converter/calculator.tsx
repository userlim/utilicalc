'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

// Hardcoded exchange rates to USD (base currency)
const exchangeRates: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  KRW: 1285.5,
  JPY: 148.75,
  GBP: 0.79,
  CNY: 7.25,
  INR: 83.15,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
}

const currencies = ['USD', 'EUR', 'KRW', 'JPY', 'GBP', 'CNY', 'INR', 'CAD', 'AUD', 'CHF'].sort()

export default function CurrencyConverter() {
  const tool = getToolBySlug('currency-converter')!
  const toolSlug = 'currency-converter'

  const [amount, setAmount, amountLoaded] = useToolStorage<string>(toolSlug, 'amount', '')
  const [fromCurrency, setFromCurrency, fromCurrencyLoaded] = useToolStorage<string>(toolSlug, 'fromCurrency', 'USD')
  const [toCurrency, setToCurrency, toCurrencyLoaded] = useToolStorage<string>(toolSlug, 'toCurrency', 'EUR')
  const [result, setResult] = useState<{
    convertedAmount: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const handleConvert = () => {
    const amountValue = parseFloat(amount)

    if (!isNaN(amountValue) && amountValue > 0 && fromCurrency && toCurrency) {
      // Convert from source currency to USD first, then to target currency
      const amountInUSD = amountValue / exchangeRates[fromCurrency]
      const convertedAmount = amountInUSD * exchangeRates[toCurrency]

      setResult({
        convertedAmount
      })
    }
  }

  // Also convert on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConvert()
    }
  }

  const formula = `${fromCurrency} to ${toCurrency}: Amount ÷ Rate(${fromCurrency}) × Rate(${toCurrency})`

  const faq = [
    {
      q: 'Why are my exchange rates different from the market rate?',
      a: 'These are approximate hardcoded rates provided for estimation purposes only. Real exchange rates change constantly throughout the day. For accurate conversions, always check with your bank or a live currency exchange service.'
    },
    {
      q: 'What factors affect currency exchange rates?',
      a: 'Exchange rates are influenced by interest rates, inflation, political stability, economic growth, and supply and demand of currencies. Central bank policies, trade balances, and geopolitical events can cause rates to fluctuate significantly.'
    },
    {
      q: 'Is there a fee for currency conversion?',
      a: 'Banks and money transfer services typically charge fees or add a spread (margin) on top of the exchange rate. It\'s worth comparing rates from different providers to get the best deal for your conversion.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter amount"
            step="0.01"
            className="tool-input"
          />
        </div>

        {/* From Currency */}
        <div>
          <label className="block text-sm font-medium mb-1">From Currency</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="tool-input"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* To Currency */}
        <div>
          <label className="block text-sm font-medium mb-1">To Currency</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="tool-input"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Convert Currency
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Converted Amount:</p>
              <p className="text-3xl font-bold text-green-600">
                {result.convertedAmount.toFixed(2)} {toCurrency}
              </p>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-700">
              <p className="font-medium mb-1">Note:</p>
              <p>Rates are approximate. For accurate conversions, check with your bank or a live currency exchange service.</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
