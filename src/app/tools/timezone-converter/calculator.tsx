'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function TimezoneConverter() {
  const tool = getToolBySlug('timezone-converter')!
  const toolSlug = 'timezone-converter'

  const [hour, setHour, hourLoaded] = useToolStorage<string>(toolSlug, 'hour', '12')
  const [minute, setMinute, minuteLoaded] = useToolStorage<string>(toolSlug, 'minute', '00')
  const [fromTz, setFromTz, fromTzLoaded] = useToolStorage<string>(toolSlug, 'fromTz', 'UTC')
  const [toTz, setToTz, toTzLoaded] = useToolStorage<string>(toolSlug, 'toTz', 'EST')

  const [result, setResult] = useState<{
    hour: string
    minute: string
    date: string
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const timezoneOffsets: Record<string, number> = {
    'EST': -5,
    'CST': -6,
    'MST': -7,
    'PST': -8,
    'UTC': 0,
    'GMT': 0,
    'CET': 1,
    'JST': 9,
    'KST': 9,
    'IST': 5.5,
    'AEST': 10,
    'CST (China)': 8,
  }

  const timezones = Object.keys(timezoneOffsets)

  const convertTime = () => {
    const h = parseInt(hour)
    const m = parseInt(minute)

    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
      return
    }

    const fromOffset = timezoneOffsets[fromTz]
    const toOffset = timezoneOffsets[toTz]

    if (fromOffset === undefined || toOffset === undefined) {
      return
    }

    const offsetDiff = toOffset - fromOffset
    let newHour = h + Math.floor(offsetDiff)
    let newMinute = m + ((offsetDiff % 1) * 60)

    if (newMinute >= 60) {
      newHour += 1
      newMinute -= 60
    } else if (newMinute < 0) {
      newHour -= 1
      newMinute += 60
    }

    let dayChange = ''
    if (newHour >= 24) {
      newHour -= 24
      dayChange = '+1 day'
    } else if (newHour < 0) {
      newHour += 24
      dayChange = '-1 day'
    }

    const formattedHour = String(newHour).padStart(2, '0')
    const formattedMinute = String(Math.round(newMinute)).padStart(2, '0')

    setResult({
      hour: formattedHour,
      minute: formattedMinute,
      date: dayChange
    })
  }

  const formula = 'Converted Time = Original Time + (To Timezone Offset - From Timezone Offset)'

  const faq = [
    {
      q: 'What is a time zone?',
      a: 'A time zone is a region that observes the same standard time. The world is divided into 24 time zones, each one hour apart, based on the Earth\'s rotation. Time zones are measured as offsets from UTC (Coordinated Universal Time), which is the reference point.'
    },
    {
      q: 'What is UTC?',
      a: 'UTC (Coordinated Universal Time) is the primary standard for time. It is not affected by daylight saving time. UTC is also known as GMT (Greenwich Mean Time). Most time zones are expressed as offsets from UTC (e.g., EST is UTC-5).'
    },
    {
      q: 'How do I calculate time zone differences?',
      a: 'To convert time between zones, find the offset of both time zones from UTC. Subtract the original zone\'s offset from the destination zone\'s offset. Add this difference to the original time. If the result is negative or exceeds 24 hours, adjust by one day.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Time (24-hour format)</label>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Hour</label>
              <input
                type="number"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="00"
                min="0"
                max="23"
                step="1"
                className="tool-input"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Minute</label>
              <input
                type="number"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="00"
                min="0"
                max="59"
                step="1"
                className="tool-input"
              />
            </div>
          </div>
        </div>

        {/* From Timezone */}
        <div>
          <label className="block text-sm font-medium mb-1">From Timezone</label>
          <select
            value={fromTz}
            onChange={(e) => setFromTz(e.target.value)}
            className="tool-input"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz} (UTC{timezoneOffsets[tz] >= 0 ? '+' : ''}{timezoneOffsets[tz]})
              </option>
            ))}
          </select>
        </div>

        {/* To Timezone */}
        <div>
          <label className="block text-sm font-medium mb-1">To Timezone</label>
          <select
            value={toTz}
            onChange={(e) => setToTz(e.target.value)}
            className="tool-input"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz} (UTC{timezoneOffsets[tz] >= 0 ? '+' : ''}{timezoneOffsets[tz]})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={convertTime}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Convert Time
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Converted Time</p>
              <p className="text-3xl font-bold text-blue-600">
                {result.hour}:{result.minute}
              </p>
            </div>

            {result.date && (
              <div className="tool-result">
                <p className="text-sm text-gray-600 mb-2">Date Change</p>
                <p className={`text-lg font-bold ${
                  result.date.includes('+') ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {result.date}
                </p>
              </div>
            )}

            <div className="tool-result">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{fromTz}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{toTz}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
