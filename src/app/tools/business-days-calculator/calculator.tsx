'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

const tool = getToolBySlug('business-days-calculator')!

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate, startDateLoaded] = useToolStorage<string>('business-days-calculator', 'startDate', '')
  const [endDate, setEndDate, endDateLoaded] = useToolStorage<string>('business-days-calculator', 'endDate', '')
  const [results, setResults] = useState<{
    businessDays: number
    totalDays: number
    weekendDays: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit('business-days-calculator')
  }, [])

  const calculateBusinessDays = () => {
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

    let businessDays = 0
    let weekendDays = 0
    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    const currentDate = new Date(start)
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++
      } else {
        weekendDays++
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    setResults({
      businessDays,
      totalDays,
      weekendDays,
    })
  }

  const handleDateChange = () => {
    setTimeout(calculateBusinessDays, 0)
  }

  const formula = `
Business Days = Total Days - Weekend Days (Saturdays & Sundays)

Business Days: ${results ? results.businessDays : '-'}
Total Calendar Days: ${results ? results.totalDays : '-'}
Weekend Days Excluded: ${results ? results.weekendDays : '-'}
  `.trim()

  const faq = [
    {
      q: 'What are business days?',
      a: 'Business days are weekdays (Monday through Friday) excluding weekends (Saturday and Sunday). They represent the days when most businesses are operating and conducting regular business activities.',
    },
    {
      q: 'How to count business days?',
      a: 'To count business days between two dates, iterate through each day and count only the days that fall on Monday through Friday (excluding Saturdays and Sundays). This tool automatically performs this calculation for the date range you select.',
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
          <div className="tool-result bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
            <div className="text-lg font-semibold text-purple-900">
              Business Days: {results.businessDays}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Calendar Days</p>
                <p className="text-lg font-semibold text-gray-900">{results.totalDays}</p>
              </div>
              <div>
                <p className="text-gray-600">Weekend Days Excluded</p>
                <p className="text-lg font-semibold text-gray-900">{results.weekendDays}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
