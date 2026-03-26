'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function LoanCalculator() {
  const tool = getToolBySlug('loan-calculator')!
  const toolSlug = 'loan-calculator'

  const [loanAmount, setLoanAmount, loanAmountLoaded] = useToolStorage<string>(toolSlug, 'loanAmount', '')
  const [interestRate, setInterestRate, interestRateLoaded] = useToolStorage<string>(
    toolSlug,
    'interestRate',
    ''
  )
  const [loanTerm, setLoanTerm, loanTermLoaded] = useToolStorage<string>(toolSlug, 'loanTerm', '')
  const [result, setResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
    firstYearPayment: number
    firstYearInterest: number
    firstYearPrincipal: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const calculateLoanPayment = (
    principal: number,
    annualRate: number,
    years: number
  ): {
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
    firstYearPayment: number
    firstYearInterest: number
    firstYearPrincipal: number
  } => {
    const monthlyRate = annualRate / 100 / 12
    const numberOfPayments = years * 12

    // Handle 0% interest
    if (monthlyRate === 0) {
      const monthlyPayment = principal / numberOfPayments
      return {
        monthlyPayment,
        totalPayment: principal,
        totalInterest: 0,
        firstYearPayment: monthlyPayment * 12,
        firstYearInterest: 0,
        firstYearPrincipal: monthlyPayment * 12,
      }
    }

    // M = P[r(1+r)^n]/[(1+r)^n-1]
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1
    const monthlyPayment = principal * (numerator / denominator)

    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principal

    // Calculate first year breakdown
    let remainingBalance = principal
    let firstYearInterest = 0
    let firstYearPayment = 0

    for (let i = 0; i < 12 && i < numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate
      firstYearInterest += interestPayment
      firstYearPayment += monthlyPayment
      remainingBalance -= monthlyPayment - interestPayment
    }

    const firstYearPrincipal = firstYearPayment - firstYearInterest

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      firstYearPayment,
      firstYearInterest,
      firstYearPrincipal,
    }
  }

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount)
    const annual = parseFloat(interestRate)
    const years = parseFloat(loanTerm)

    if (!isNaN(principal) && !isNaN(annual) && !isNaN(years) && principal > 0 && years > 0) {
      const calculation = calculateLoanPayment(principal, annual, years)
      setResult(calculation)
    }
  }

  const formula = 'M = P[r(1+r)^n] / [(1+r)^n - 1], where M=payment, P=principal, r=monthly rate, n=number of payments'

  const faq = [
    {
      q: 'What is the difference between a mortgage and a loan?',
      a: 'A mortgage is a specific type of loan secured by real estate (a house). Regular loans can be secured (backed by collateral like a car) or unsecured (like personal loans). Mortgages typically have longer terms (15-30 years) and lower interest rates than other loans.',
    },
    {
      q: 'How does amortization work?',
      a: 'Amortization is the process of paying off a loan through regular payments over time. Early payments are weighted toward interest, while later payments pay down more principal. As the balance decreases, less of each payment goes to interest.',
    },
    {
      q: 'What affects your loan interest rate?',
      a: 'Interest rates depend on credit score, loan type, term length, down payment amount, and current market rates set by the Federal Reserve. Better credit scores, larger down payments, and shorter terms typically get lower rates. Economic conditions also affect available rates.',
    },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
            step="1000"
            className="tool-input"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">Annual Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter interest rate"
            step="0.1"
            className="tool-input"
          />
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (Years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="Enter loan term in years"
            step="1"
            min="1"
            className="tool-input"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Loan Payment
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Monthly Payment:</p>
              <p className="text-3xl font-bold text-blue-600">${result.monthlyPayment.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Payment (Over Life of Loan):</p>
              <p className="text-3xl font-bold text-gray-800">${result.totalPayment.toFixed(2)}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Interest Paid:</p>
              <p className="text-3xl font-bold text-red-600">${result.totalInterest.toFixed(2)}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <p className="font-medium text-sm text-gray-700 mb-3">First Year Breakdown:</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Principal Paid</p>
                  <p className="font-bold text-blue-600">${result.firstYearPrincipal.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Interest Paid</p>
                  <p className="font-bold text-red-600">${result.firstYearInterest.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Total Payment</p>
                  <p className="font-bold text-gray-800">${result.firstYearPayment.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
              <p className="font-medium mb-2">Interest Percentage of Total Cost:</p>
              <p>
                {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}% of the total amount paid is interest
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
