import HomeContent from '@/components/HomeContent'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is UtiliCalc really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all 50+ calculators and converters are completely free with no signup, no ads paywall, and no usage limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of calculators are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer unit converters (length, weight, temperature, volume), financial calculators (tips, percentages, discounts), date & time tools, text utilities, and more — organized by category for easy browsing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do the calculators work offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most calculators work entirely in your browser and don't require an internet connection after the page loads. Some tools that fetch live data (like currency rates) do need connectivity.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use UtiliCalc on my phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. UtiliCalc is fully responsive and optimized for mobile, tablet, and desktop. All tools work seamlessly on any screen size.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomeContent />
    </>
  )
}
