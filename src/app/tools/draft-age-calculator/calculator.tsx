'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

interface AgeResult {
  currentAge: number
  inSelectiveServiceRange: boolean
  gender: string
  ageMin: number
  ageMax: number
}

export default function DraftAgeCalculator() {
  const tool = getToolBySlug('draft-age-calculator')!
  const toolSlug = 'draft-age-calculator'

  const [dateOfBirth, setDateOfBirth, dateOfBirthLoaded] = useToolStorage<string>(toolSlug, 'dateOfBirth', '')
  const [gender, setGender, genderLoaded] = useToolStorage<string>(toolSlug, 'gender', 'male')
  const [result, setResult] = useState<AgeResult | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const calculateAge = (birthDate: Date): number => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const handleCalculate = () => {
    if (!dateOfBirth) return

    const birthDate = new Date(dateOfBirth)
    const today = new Date()

    if (birthDate > today) {
      alert('Date of birth cannot be in the future')
      return
    }

    const age = calculateAge(birthDate)
    const ageMin = 18
    const ageMax = 25

    const inRange = gender === 'male' && age >= ageMin && age <= ageMax

    setResult({
      currentAge: age,
      inSelectiveServiceRange: inRange,
      gender,
      ageMin,
      ageMax
    })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value)
  }

  const formula = 'Selective Service Age Range: 18-25 years old (males only, as of 2026)'

  const faq = [
    {
      q: 'What is the Selective Service System?',
      a: 'The Selective Service System is a federal agency responsible for registering male U.S. citizens ages 18-25 with the government. In case of emergency, men in this age range may be required to serve in the military. Registration is mandatory for all eligible males.'
    },
    {
      q: 'Who must register with Selective Service in 2026?',
      a: 'All males ages 18-25 who are U.S. citizens, immigrants, or undocumented immigrants must register within 30 days of turning 18. Failure to register can result in loss of federal financial aid, loss of employment, and civil penalties.'
    },
    {
      q: 'What happens if I do not register?',
      a: 'Males who do not register can face serious consequences including loss of federal student aid, inability to work for federal contractors, loss of federal job opportunities, and potential criminal charges with fines up to $250,000 and up to 5 years in prison.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Information Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> This calculator is for informational purposes only. Based on U.S. Selective Service System rules as of 2026. Current law only requires males to register.
          </p>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={handleDateChange}
            className="tool-input"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">Female</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">Other</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Check Eligibility
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Current Age:</p>
              <p className="text-3xl font-bold text-blue-600">{result.currentAge} years old</p>
            </div>

            <div className={`tool-result ${result.inSelectiveServiceRange ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <p className="text-sm text-gray-600 mb-2">Selective Service Registration Required:</p>
              <p className={`text-3xl font-bold ${result.inSelectiveServiceRange ? 'text-red-600' : 'text-green-600'}`}>
                {result.inSelectiveServiceRange ? 'YES' : 'NO'}
              </p>
            </div>

            {result.inSelectiveServiceRange && (
              <div className="bg-amber-50 border border-amber-200 rounded p-4">
                <p className="text-sm font-semibold text-amber-900 mb-2">Registration Required</p>
                <p className="text-sm text-amber-800 mb-2">
                  As a male in the age range {result.ageMin}-{result.ageMax}, you are required to register with Selective Service if you are a U.S. citizen or resident.
                </p>
                <p className="text-sm text-amber-800">
                  <strong>Register at:</strong> <span className="text-blue-600">www.sss.gov</span>
                </p>
              </div>
            )}

            {!result.inSelectiveServiceRange && (
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <p className="text-sm text-green-900">
                  {result.gender === 'male'
                    ? `You are not currently in the Selective Service registration age range (${result.ageMin}-${result.ageMax}).`
                    : 'Current law does not require females to register with Selective Service.'}
                </p>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">What is Selective Service?</p>
              <p className="text-sm text-gray-700">
                The Selective Service System maintains a database of men ages {result.ageMin}-{result.ageMax} in case Congress and the President authorize a draft in a national emergency. Registration is required by law for all eligible males.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
