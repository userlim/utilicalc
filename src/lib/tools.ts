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
