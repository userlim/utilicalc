import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - UtiliCalc',
  description: 'Privacy Policy for UtiliCalc. Learn how we collect, use, and protect your information.',
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 30, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed">
          We do not collect any personal information directly. Our site uses Google Analytics to understand how visitors interact with our website. This may include information such as your browser type, referring site, and the date and time of each visitor request.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          We use cookies through third-party services like Google Analytics and Google AdSense. These cookies help us analyze website traffic and serve relevant advertisements. You can control cookie settings through your browser preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Google AdSense</h2>
        <p className="text-gray-700 leading-relaxed">
          We use Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Google Analytics</h2>
        <p className="text-gray-700 leading-relaxed">
          We use Google Analytics to analyze the use of our website. Google Analytics gathers information about website use by means of cookies. The information gathered is used to create reports about the use of our website. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Data Storage</h2>
        <p className="text-gray-700 leading-relaxed">
          Some features may use your browser's local storage to save your preferences. This data is stored only on your device and is not transmitted to our servers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Third-Party Links</h2>
        <p className="text-gray-700 leading-relaxed">
          Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at lth1283910@gmail.com.
        </p>
      </section>
    </div>
  )
}
