'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

const tool = getToolBySlug('days-between-dates')!

export default function DaysBetweenDatesCalculator() {
  const [startDate, setStartDate, startDateLoaded] = useToolStorage<string>('days-between-dates', 'startDate', '')
  const [endDate, setEndDate, endDateLoaded] = useToolStorage<string>('days-between-dates', 'endDate', '')
  const [results, setResults] = useState<{
    days: number
    weeks: number
    months: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit('days-between-dates')
  }, [])

  const calculateDays = () => {
    if (!startDate || !endDate) {
      setResults(null)
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > end) {
      setResults(null)
      return
    }

    // Calculate days
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    // Calculate weeks
    const weeks = Math.floor(days / 7)

    // Calculate months (approximate)
    let months = 0
    let tempDate = new Date(start)
    while (tempDate < end) {
      tempDate.setMonth(tempDate.getMonth() + 1)
      if (tempDate <= end) {
        months++
      }
    }

    setResults({
      days,
      weeks,
      months,
    })
  }

  const handleDateChange = () => {
    setTimeout(calculateDays, 0)
  }

  const formula = `
Days Between Dates = End Date - Start Date

Days: ${results ? results.days : '-'}
Weeks: ${results ? results.weeks : '-'}
Months (approximate): ${results ? results.months : '-'}
  `.trim()

  const faq = [
    {
      q: 'How to calculate days between two dates?',
      a: 'To calculate days between two dates, subtract the start date from the end date. The difference in milliseconds is then divided by the number of milliseconds in a day (86,400,000) to get the total number of days. This tool also breaks it down into weeks and approximate months for easier understanding.',
    },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)
              handleDateChange()
            }}
            className="tool-input w-full"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
              handleDateChange()
            }}
            className="tool-input w-full"
          />
        </div>

        {results && (
          <div className="tool-result bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Days</p>
                <p className="text-2xl font-semibold text-gray-900">{results.days}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Weeks</p>
                <p className="text-2xl font-semibold text-gray-900">{results.weeks}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Months</p>
                <p className="text-2xl font-semibold text-gray-900">{results.months}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
