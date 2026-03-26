'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { getToolBySlug } from '@/lib/tools'
import { useToolStorage, recordToolVisit } from '@/lib/useLocalStorage'

export default function GasPriceCalculator() {
  const tool = getToolBySlug('gas-price-calculator')!
  const toolSlug = 'gas-price-calculator'

  const [isMetric, setIsMetric, isMetricLoaded] = useToolStorage<boolean>(toolSlug, 'isMetric', false)
  const [distance, setDistance, distanceLoaded] = useToolStorage<string>(toolSlug, 'distance', '')
  const [fuelEfficiency, setFuelEfficiency, fuelEfficiencyLoaded] = useToolStorage<string>(toolSlug, 'fuelEfficiency', '')
  const [gasPrice, setGasPrice, gasPriceLoaded] = useToolStorage<string>(toolSlug, 'gasPrice', '')
  const [result, setResult] = useState<{
    fuelNeeded: number
    totalCost: number
  } | null>(null)

  useEffect(() => {
    recordToolVisit(toolSlug)
  }, [])

  const handleCalculate = () => {
    const dist = parseFloat(distance)
    const fuel = parseFloat(fuelEfficiency)
    const price = parseFloat(gasPrice)

    if (!isNaN(dist) && !isNaN(fuel) && !isNaN(price) && dist > 0 && fuel > 0 && price > 0) {
      let fuelNeeded: number

      if (isMetric) {
        // For metric: L/100km - need to calculate liters needed
        // Liters needed = (Distance in km / 100) × (L per 100km)
        fuelNeeded = (dist / 100) * fuel
      } else {
        // For US: MPG - need to calculate gallons needed
        // Gallons needed = Distance / MPG
        fuelNeeded = dist / fuel
      }

      const totalCost = fuelNeeded * price

      setResult({
        fuelNeeded,
        totalCost
      })
    }
  }

  const distanceLabel = isMetric ? 'Distance (km)' : 'Distance (miles)'
  const efficiencyLabel = isMetric ? 'Fuel Efficiency (L/100km)' : 'Fuel Efficiency (MPG)'
  const priceLabel = isMetric ? 'Gas Price per Liter ($)' : 'Gas Price per Gallon ($)'
  const fuelUnit = isMetric ? 'Liters' : 'Gallons'

  const formula = isMetric
    ? 'Fuel Needed = (Distance ÷ 100) × Efficiency'
    : 'Fuel Needed = Distance ÷ MPG'

  const faq = [
    {
      q: 'How do I calculate fuel cost for a trip?',
      a: 'Divide your trip distance by your vehicle\'s fuel efficiency (MPG or L/100km) to find how much fuel you\'ll use. Then multiply by the current gas price per gallon or liter to get the total cost.'
    },
    {
      q: 'What is the difference between MPG and L/100km?',
      a: 'MPG (miles per gallon) is used in the US and shows how many miles your car travels on one gallon. L/100km is used in metric countries and shows how many liters are needed per 100 kilometers. Lower L/100km is better, higher MPG is better.'
    },
    {
      q: 'How can I improve my fuel efficiency?',
      a: 'Maintain your vehicle regularly, keep tires properly inflated, avoid excessive idling, reduce speeding, remove unnecessary weight, and use the correct fuel grade recommended by your vehicle manufacturer.'
    }
  ]

  return (
    <ToolLayout tool={tool} formula={formula} faq={faq}>
      <div className="space-y-6">
        {/* Metric Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2">Measurement System</label>
          <div className="flex gap-4">
            <button
              onClick={() => setIsMetric(false)}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                !isMetric
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              US (Miles/MPG/Gallon)
            </button>
            <button
              onClick={() => setIsMetric(true)}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                isMetric
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Metric (km/L per 100km/Liter)
            </button>
          </div>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium mb-1">{distanceLabel}</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder={`Enter distance in ${isMetric ? 'km' : 'miles'}`}
            step="0.1"
            className="tool-input"
          />
        </div>

        {/* Fuel Efficiency */}
        <div>
          <label className="block text-sm font-medium mb-1">{efficiencyLabel}</label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(e.target.value)}
            placeholder={`Enter fuel efficiency`}
            step="0.1"
            className="tool-input"
          />
        </div>

        {/* Gas Price */}
        <div>
          <label className="block text-sm font-medium mb-1">{priceLabel}</label>
          <input
            type="number"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
            placeholder={`Enter gas price`}
            step="0.01"
            className="tool-input"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
        >
          Calculate Fuel Cost
        </button>

        {result && (
          <div className="space-y-4">
            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Fuel Needed:</p>
              <p className="text-3xl font-bold text-green-600">{result.fuelNeeded.toFixed(2)} {fuelUnit}</p>
            </div>

            <div className="tool-result">
              <p className="text-sm text-gray-600 mb-2">Total Fuel Cost:</p>
              <p className="text-3xl font-bold text-blue-600">${result.totalCost.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
