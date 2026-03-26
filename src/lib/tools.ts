export interface Tool {
  slug: string
  name: string
  description: string
  metaTitle: string
  metaDescription: string
  category: string
  categorySlug: string
}

export interface Category {
  slug: string
  name: string
  description: string
  metaTitle: string
  metaDescription: string
}

export const categories: Category[] = [
  {
    slug: 'unit-converters',
    name: 'Unit Converters',
    description: 'Convert between common units of measurement instantly. Length, weight, volume, and temperature conversions.',
    metaTitle: 'Free Unit Converters Online | UtiliCalc',
    metaDescription: 'Convert inches to cm, lbs to kg, cups to ml, and more. Fast, free, and accurate unit conversion tools.',
  },
  {
    slug: 'finance-calculators',
    name: 'Finance & Percentage Calculators',
    description: 'Calculate percentages, tips, discounts, and profit margins quickly and accurately.',
    metaTitle: 'Free Finance & Percentage Calculators | UtiliCalc',
    metaDescription: 'Calculate tips, discounts, profit margins, and percentages instantly. Free online financial calculators.',
  },
  {
    slug: 'date-time-tools',
    name: 'Date & Time Tools',
    description: 'Calculate ages, count days between dates, and figure out business days with ease.',
    metaTitle: 'Free Date & Time Calculators Online | UtiliCalc',
    metaDescription: 'Calculate your age, days between dates, and business days. Free online date and time tools.',
  },
  {
    slug: 'trending-tools',
    name: 'Trending Tools',
    description: 'Real-time calculators for gas prices, gold, crypto, currency exchange, and more.',
    metaTitle: 'Trending Calculators 2026 | Gas, Gold, Crypto | UtiliCalc',
    metaDescription: 'Trending calculators for 2026. Gas price, gold price, crypto profit, currency converter, and more.',
  },
  {
    slug: 'health-tools',
    name: 'Health & Fitness',
    description: 'BMI calculator, calorie tools, and health-related calculators.',
    metaTitle: 'Free Health & Fitness Calculators | UtiliCalc',
    metaDescription: 'Calculate your BMI, daily calories, and more. Free online health calculators.',
  },
]

export const tools: Tool[] = [
  // Unit Converters
  {
    slug: 'inches-to-cm',
    name: 'Inches to CM Converter',
    description: 'Convert inches to centimeters and centimeters to inches instantly.',
    metaTitle: 'Inches to CM Converter | Free & Accurate | UtiliCalc',
    metaDescription: 'Convert inches to centimeters instantly. Free online inches to cm converter with formula and examples. 1 inch = 2.54 cm.',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
  },
  {
    slug: 'feet-to-meters',
    name: 'Feet to Meters Converter',
    description: 'Convert feet to meters and meters to feet with precision.',
    metaTitle: 'Feet to Meters Converter | Free Online Tool | UtiliCalc',
    metaDescription: 'Convert feet to meters instantly. Free online ft to m converter with formula. 1 foot = 0.3048 meters.',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
  },
  {
    slug: 'lbs-to-kg',
    name: 'Pounds to Kilograms Converter',
    description: 'Convert pounds (lbs) to kilograms (kg) and vice versa.',
    metaTitle: 'Pounds to KG Converter | Free & Instant | UtiliCalc',
    metaDescription: 'Convert lbs to kg instantly. Free online pounds to kilograms converter. 1 lb = 0.4536 kg.',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
  },
  {
    slug: 'cups-to-ml',
    name: 'Cups to Milliliters Converter',
    description: 'Convert cups to milliliters for cooking and baking recipes.',
    metaTitle: 'Cups to ML Converter | Cooking Measurement Tool | UtiliCalc',
    metaDescription: 'Convert cups to milliliters for recipes. Free online cups to ml converter. 1 US cup = 236.588 ml.',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
  },
  {
    slug: 'fahrenheit-to-celsius',
    name: 'Fahrenheit to Celsius Converter',
    description: 'Convert temperatures between Fahrenheit and Celsius scales.',
    metaTitle: 'Fahrenheit to Celsius Converter | Free Tool | UtiliCalc',
    metaDescription: 'Convert Fahrenheit to Celsius instantly. Free online temperature converter with formula. °C = (°F - 32) × 5/9.',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
  },
  // Finance & Percentage
  {
    slug: 'percent-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages: what is X% of Y, percentage increase/decrease, and more.',
    metaTitle: 'Percentage Calculator | Free Online Tool | UtiliCalc',
    metaDescription: 'Calculate percentages easily. What is X% of Y? Percentage increase or decrease? Free online percentage calculator.',
    category: 'Finance & Percentage Calculators',
    categorySlug: 'finance-calculators',
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips for restaurants, delivery, and services. Split bills easily.',
    metaTitle: 'Tip Calculator | Split Bills Easily | UtiliCalc',
    metaDescription: 'Calculate tips instantly. Choose tip percentage, split between people. Free online tip calculator for restaurants and services.',
    category: 'Finance & Percentage Calculators',
    categorySlug: 'finance-calculators',
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate sale prices and savings from percentage discounts.',
    metaTitle: 'Discount Calculator | Calculate Sale Prices | UtiliCalc',
    metaDescription: 'Calculate discounted prices instantly. Enter original price and discount percentage. Free online discount calculator.',
    category: 'Finance & Percentage Calculators',
    categorySlug: 'finance-calculators',
  },
  {
    slug: 'margin-calculator',
    name: 'Profit Margin Calculator',
    description: 'Calculate profit margin, markup, and cost from revenue and costs.',
    metaTitle: 'Profit Margin Calculator | Free Business Tool | UtiliCalc',
    metaDescription: 'Calculate profit margin, markup percentage, and gross margin. Free online profit margin calculator for businesses.',
    category: 'Finance & Percentage Calculators',
    categorySlug: 'finance-calculators',
  },
  // Date & Time
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days from your birthday.',
    metaTitle: 'Age Calculator | How Old Am I? | UtiliCalc',
    metaDescription: 'Calculate your exact age in years, months, and days. Free online age calculator from date of birth.',
    category: 'Date & Time Tools',
    categorySlug: 'date-time-tools',
  },
  {
    slug: 'days-between-dates',
    name: 'Days Between Dates Calculator',
    description: 'Calculate the number of days, weeks, and months between two dates.',
    metaTitle: 'Days Between Dates Calculator | Free Tool | UtiliCalc',
    metaDescription: 'Calculate the number of days between two dates. Free online date difference calculator in days, weeks, and months.',
    category: 'Date & Time Tools',
    categorySlug: 'date-time-tools',
  },
  {
    slug: 'business-days-calculator',
    name: 'Business Days Calculator',
    description: 'Calculate the number of business days (weekdays) between two dates, excluding weekends.',
    metaTitle: 'Business Days Calculator | Exclude Weekends | UtiliCalc',
    metaDescription: 'Calculate business days between two dates. Excludes weekends automatically. Free online working days calculator.',
    category: 'Date & Time Tools',
    categorySlug: 'date-time-tools',
  },
  {
    slug: 'timezone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones worldwide. See what time it is anywhere.',
    metaTitle: 'Time Zone Converter | World Clock | UtiliCalc',
    metaDescription: 'Convert time between time zones instantly. Free online world clock and time zone converter.',
    category: 'Date & Time Tools',
    categorySlug: 'date-time-tools',
  },
  // Trending Tools
  {
    slug: 'gas-price-calculator',
    name: 'Gas & Fuel Cost Calculator',
    description: 'Calculate fuel cost for your trip based on distance, fuel efficiency, and gas price.',
    metaTitle: 'Gas Price Calculator | Fuel Cost Estimator 2026 | UtiliCalc',
    metaDescription: 'Calculate fuel cost for any trip. Enter distance, MPG, and gas price. Free gas cost calculator updated for 2026 oil prices.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between USD, EUR, KRW, JPY, GBP and 10+ currencies with latest rates.',
    metaTitle: 'Currency Converter | USD KRW EUR JPY | UtiliCalc',
    metaDescription: 'Convert currencies instantly. USD to KRW, EUR, JPY, GBP and more. Free online currency converter with live exchange rates.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  {
    slug: 'gold-price-calculator',
    name: 'Gold Price Calculator',
    description: 'Calculate the value of gold by weight. Grams, ounces, and troy ounces.',
    metaTitle: 'Gold Price Calculator 2026 | Value by Weight | UtiliCalc',
    metaDescription: 'Calculate gold value by weight. Enter grams or ounces and get current gold price estimate. Free gold calculator.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  {
    slug: 'inflation-calculator',
    name: 'Inflation Calculator',
    description: 'Calculate how inflation changes the value of money over time.',
    metaTitle: 'Inflation Calculator | Purchasing Power Over Time | UtiliCalc',
    metaDescription: 'Calculate how inflation affects your money. See purchasing power changes over years. Free inflation calculator.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  {
    slug: 'salary-tax-calculator',
    name: 'Salary & Tax Calculator',
    description: 'Calculate take-home pay after taxes. See federal and state tax estimates.',
    metaTitle: 'Salary Tax Calculator 2026 | Take-Home Pay | UtiliCalc',
    metaDescription: 'Calculate your take-home pay after taxes. Estimate federal, state taxes and net salary. Free 2026 tax calculator.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  {
    slug: 'loan-calculator',
    name: 'Loan & Mortgage Calculator',
    description: 'Calculate monthly payments, total interest, and amortization for any loan.',
    metaTitle: 'Loan Calculator | Mortgage Payment Estimator | UtiliCalc',
    metaDescription: 'Calculate loan and mortgage payments. Enter amount, rate, and term. See monthly payments and total interest. Free calculator.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  {
    slug: 'crypto-profit-calculator',
    name: 'Crypto Profit Calculator',
    description: 'Calculate profit or loss on Bitcoin, Ethereum, and other cryptocurrency investments.',
    metaTitle: 'Crypto Profit Calculator | Bitcoin & ETH | UtiliCalc',
    metaDescription: 'Calculate crypto investment profit or loss. Enter buy price, sell price, and amount. Free Bitcoin and crypto calculator.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  {
    slug: 'draft-age-calculator',
    name: 'Military Draft Age Calculator',
    description: 'Check if you are within the military draft age range. Based on Selective Service rules.',
    metaTitle: 'Military Draft Age Calculator 2026 | Am I Eligible? | UtiliCalc',
    metaDescription: 'Check your military draft eligibility by age. Based on US Selective Service System rules. Free draft age checker.',
    category: 'Trending Tools',
    categorySlug: 'trending-tools',
  },
  // Health
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) and see if you are underweight, normal, overweight, or obese.',
    metaTitle: 'BMI Calculator | Body Mass Index | UtiliCalc',
    metaDescription: 'Calculate your BMI instantly. Enter height and weight to see your Body Mass Index category. Free online BMI calculator.',
    category: 'Health & Fitness',
    categorySlug: 'health-tools',
  },
]

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(t => t.categorySlug === categorySlug)
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
