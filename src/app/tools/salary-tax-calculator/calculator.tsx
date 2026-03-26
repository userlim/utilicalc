'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function SalaryTaxCalculator() {
  const tool = getToolBySlug('salary-tax-calculator')!
  const toolSlug = 'salary-tax-calculator'

  const [salary, setSalary, salaryLoaded] = useToolStorage<string>(toolSlug, 'salary', '')
  const [filingStatus, setFilingStatus, filingStatusLoaded] = useToolStorage<string>(toolSlug, 'filingStatus', 'single')
  const [state, setState, stateLoaded] = useToolStorage<string>(toolSlug, 'state', 'California')
  const [result, setResult] = useState<{
    federalTax: number
    stateTax: number
    totalTax: number
    takeHome: number
    effectiveRate: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  // 2026 Federal Tax Brackets
  const federalBrackets: { [key: string]: Array<[number, number]> } = {
    single: [
      [11600, 0.1],
      [47150, 0.12],
      [100525, 0.22],
      [191950, 0.24],
      [243725, 0.32],
      [609350, 0.35],
      [Infinity, 0.37],
    ],
    married: [
      [23200, 0.1],
      [94300, 0.12],
      [201050, 0.22],
      [383900, 0.24],
      [487450, 0.32],
      [731200, 0.35],
      [Infinity, 0.37],
    ],
  }

  // State tax rates (approximate for 2026)
  const stateTaxRates: { [key: string]: number } = {
    'California': 0.093,
    'Texas': 0,
    'Florida': 0,
    'New York': 0.0685,
    'Illinois': 0.0495,
    'Ohio': 0.0575,
    'Pennsylvania': 0.0307,
    'Georgia': 0.055,
    'North Carolina': 0.0499,
    'Arizona': 0.0432,
  }

  const states = Object.keys(stateTaxRates).sort()

  const calculateFederalTax = (annualSalary: number, status: string): number => {
    const brackets = federalBrackets[status] || federalBrackets['single']
    let tax = 0
    let previousLimit = 0

    for (const [limit, rate] of brackets) {
      if (annualSalary <= previousLimit) break
      const taxableInThisBracket = Math.min(annualSalary, limit) - previousLimit
      tax += taxableInThisBracket * rate
      previousLimit = limit
    }

    return tax
  }

  const calculateStateTax = (annualSalary: number, selectedState: string): number => {
    const rate = stateTaxRates[selectedState] || 0
    return annualSalary * rate
  }

  const handleCalculate = () => {
    const annualSalary = parseFloat(salary)

    if (!isNaN(annualSalary) && annualSalary > 0) {
      const federalTax = calculateFederalTax(annualSalary, filingStatus)
      const stateTax = calculateStateTax(annualSalary, state)
      const totalTax = federalTax + stateTax
      const takeHome = annualSalary - totalTax
      const effectiveRate = (totalTax / annualSalary) * 100

      setResult({
        federalTax,
        stateTax,
        totalTax,
        takeHome,
        effectiveRate,
      })
    }
  }

  const formula = 'Federal Tax = Calculate using tax brackets | State Tax = Salary × State Tax Rate'

  const faq = [
    {
      q: 'What is an effective tax rate?',
      a: 'The effective tax rate is the percentage of your total income that goes to taxes. It is calculated as (Total Tax ÷ Gross Income) × 100%. It is lower than your marginal tax rate because the U.S. uses a progressive tax system.',
    },
    {
      q: 'Which states have no income tax?',
      a: 'As of 2026, nine states have no personal income tax: Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming, and New Hampshire (interest and dividends only).',
    },
    {
      q: 'What is a tax bracket?',
      a: 'A tax bracket is a range of income taxed at a specific rate. The U.S. uses a progressive system where higher portions of income are taxed at higher rates. Your marginal tax rate is the rate on your last dollar earned, while your effective rate is your average rate across all income.',
    },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Annual Salary */}
        <div>
          <label className="block text-sm font-medium mb-1">Annual Salary ($)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter annual salary"
            step="1000"
            className="tool-input"
          />
        </div>

        {/* Filing Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
            className="tool-input"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)} className="tool-input">
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Taxes
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Federal Tax:</p>
              <p className="text-3xl font-bold text-red-600">${result.federalTax.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">State Tax:</p>
              <p className="text-3xl font-bold text-orange-600">${result.stateTax.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Tax:</p>
              <p className="text-3xl font-bold text-red-700">${result.totalTax.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Take-Home Pay (Annual):</p>
              <p className="text-3xl font-bold text-green-600">${result.takeHome.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Effective Tax Rate:</p>
              <p className="text-3xl font-bold text-blue-600">{result.effectiveRate.toFixed(2)}%</p>
            </div>

            <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
              <p className="font-medium mb-2">Monthly Breakdown:</p>
              <ul className="space-y-1">
                <li>Monthly Gross: ${(parseFloat(salary) / 12).toFixed(2)}</li>
                <li>Monthly Take-Home: ${(result.takeHome / 12).toFixed(2)}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
