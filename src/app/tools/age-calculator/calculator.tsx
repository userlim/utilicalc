'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

const tool = getToolBySlug('age-calculator')!

export default function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth, loaded] = useToolStorage<string>('age-calculator', 'dateOfBirth', '')
  const [results, setResults] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
    nextBirthdayDays: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit('age-calculator')
  }, [])

  const calculateAge = () => {
    if (!dateOfBirth) {
      setResults(null)
      return
    }

    const today = new Date()
    const birth = new Date(dateOfBirth)

    if (birth > today) {
      setResults(null)
      return
    }

    // Calculate years, months, days
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += previousMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    // Calculate total days lived
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))

    // Calculate next birthday countdown
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate())
    }
    const nextBirthdayDays = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    setResults({
      years,
      months,
      days,
      totalDays,
      nextBirthdayDays,
    })
  }

  const formula = `
Age = Today's Date - Date of Birth

Exact Age: ${results ? `${results.years} years, ${results.months} months, ${results.days} days` : 'Enter a date'}
Total Days Lived: ${results ? `${results.totalDays} days` : '-'}
Days Until Next Birthday: ${results ? `${results.nextBirthdayDays} days` : '-'}
  `.trim()

  const faq = [
    {
      q: 'How to calculate age?',
      a: 'Age is calculated by finding the difference between today\'s date and your date of birth. This tool calculates your exact age in years, months, and days for precise accuracy.',
    },
    {
      q: 'How old am I in days?',
      a: 'The total days lived is calculated by dividing the milliseconds difference between today and your birthdate by the number of milliseconds in a day (86,400,000). This gives you the exact number of days you have lived.',
    },
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-4">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value)
              if (e.target.value) {
                setTimeout(calculateAge, 0)
              }
            }}
            className="tool-input w-full"
          />
        </div>

        {results && (
          <div className="tool-result bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="text-lg font-semibold text-blue-900">
              Age: {results.years} years, {results.months} months, {results.days} days
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Days Lived</p>
                <p className="text-lg font-semibold text-gray-900">{results.totalDays}</p>
              </div>
              <div>
                <p className="text-gray-600">Days Until Next Birthday</p>
                <p className="text-lg font-semibold text-gray-900">{results.nextBirthdayDays}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
