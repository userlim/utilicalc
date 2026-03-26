'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function BMICalculator() {
  const tool = getToolBySlug('bmi-calculator')!
  const toolSlug = 'bmi-calculator'

  const [heightUnit, setHeightUnit] = useState<'cm' | 'feet-inches'>('cm')
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')

  const [cm, setCm, cmLoaded] = useToolStorage<string>(toolSlug, 'cm', '')
  const [feet, setFeet, feetLoaded] = useToolStorage<string>(toolSlug, 'feet', '')
  const [inches, setInches, inchesLoaded] = useToolStorage<string>(toolSlug, 'inches', '')
  const [kg, setKg, kgLoaded] = useToolStorage<string>(toolSlug, 'kg', '')
  const [lbs, setLbs, lbsLoaded] = useToolStorage<string>(toolSlug, 'lbs', '')

  const [result, setResult] = useState<{
    bmi: number
    category: string
    color: string
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const calculateBMI = () => {
    let heightInMeters: number | null = null
    let weightInKg: number | null = null

    // Calculate height in meters
    if (heightUnit === 'cm') {
      const cmValue = parseFloat(cm)
      if (!isNaN(cmValue) && cmValue > 0) {
        heightInMeters = cmValue / 100
      }
    } else {
      const feetValue = parseFloat(feet)
      const inchesValue = parseFloat(inches)
      if (!isNaN(feetValue) && !isNaN(inchesValue) && feetValue >= 0 && inchesValue >= 0) {
        const totalInches = feetValue * 12 + inchesValue
        heightInMeters = totalInches * 0.0254
      }
    }

    // Calculate weight in kg
    if (weightUnit === 'kg') {
      const kgValue = parseFloat(kg)
      if (!isNaN(kgValue) && kgValue > 0) {
        weightInKg = kgValue
      }
    } else {
      const lbsValue = parseFloat(lbs)
      if (!isNaN(lbsValue) && lbsValue > 0) {
        weightInKg = lbsValue * 0.453592
      }
    }

    if (heightInMeters && weightInKg) {
      const bmi = weightInKg / (heightInMeters * heightInMeters)

      let category = ''
      let color = ''

      if (bmi < 18.5) {
        category = 'Underweight'
        color = 'text-blue-600'
      } else if (bmi < 25) {
        category = 'Normal'
        color = 'text-green-600'
      } else if (bmi < 30) {
        category = 'Overweight'
        color = 'text-orange-600'
      } else {
        category = 'Obese'
        color = 'text-red-600'
      }

      setResult({
        bmi: Math.round(bmi * 10) / 10,
        category,
        color
      })
    }
  }

  const formula = 'BMI = Weight (kg) ÷ Height (m)²'

  const faq = [
    {
      q: 'What is BMI?',
      a: 'Body Mass Index (BMI) is a measure of body fat based on height and weight. It is calculated as weight in kilograms divided by height in meters squared. BMI is used as a general screening tool to identify potential weight categories.'
    },
    {
      q: 'What are the BMI categories?',
      a: 'BMI categories are: Underweight (below 18.5), Normal (18.5-24.9), Overweight (25-29.9), and Obese (30 and above). These categories are used to assess whether someone is at a healthy weight for their height.'
    },
    {
      q: 'Is BMI accurate for everyone?',
      a: 'BMI is a useful screening tool but has limitations. It does not account for muscle mass, bone density, or overall body composition. Athletes may have high BMI despite being fit. For personalized health assessments, consult a healthcare professional.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Height Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Height</label>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setHeightUnit('cm')}
              className={`flex-1 py-2 rounded font-medium transition-colors ${
                heightUnit === 'cm'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setHeightUnit('feet-inches')}
              className={`flex-1 py-2 rounded font-medium transition-colors ${
                heightUnit === 'feet-inches'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Feet/Inches
            </button>
          </div>

          {heightUnit === 'cm' ? (
            <div>
              <label className="block text-xs text-gray-600 mb-1">Centimeters</label>
              <input
                type="number"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                placeholder="Enter height in cm"
                step="0.1"
                className="tool-input"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Feet</label>
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  placeholder="Enter feet"
                  step="1"
                  min="0"
                  className="tool-input"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Inches</label>
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  placeholder="Enter inches"
                  step="0.1"
                  min="0"
                  max="11"
                  className="tool-input"
                />
              </div>
            </div>
          )}
        </div>

        {/* Weight Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Weight</label>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setWeightUnit('kg')}
              className={`flex-1 py-2 rounded font-medium transition-colors ${
                weightUnit === 'kg'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              KG
            </button>
            <button
              onClick={() => setWeightUnit('lbs')}
              className={`flex-1 py-2 rounded font-medium transition-colors ${
                weightUnit === 'lbs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              LBS
            </button>
          </div>

          {weightUnit === 'kg' ? (
            <div>
              <label className="block text-xs text-gray-600 mb-1">Kilograms</label>
              <input
                type="number"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
                placeholder="Enter weight in kg"
                step="0.1"
                className="tool-input"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs text-gray-600 mb-1">Pounds</label>
              <input
                type="number"
                value={lbs}
                onChange={(e) => setLbs(e.target.value)}
                placeholder="Enter weight in lbs"
                step="0.1"
                className="tool-input"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate BMI
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">BMI</p>
              <p className={`text-3xl font-bold ${result.color}`}>{result.bmi}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Category</p>
              <p className={`text-2xl font-bold ${result.color}`}>{result.category}</p>
            </div>

            <div className="tool-result">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Underweight</span>
                  <span className="text-gray-600">&lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Normal</span>
                  <span className="text-gray-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Overweight</span>
                  <span className="text-gray-600">25 - 29.9</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Obese</span>
                  <span className="text-gray-600">≥ 30</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
