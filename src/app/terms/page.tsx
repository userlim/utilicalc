import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - UtiliCalc',
  description: 'Terms of Service for UtiliCalc.',
  robots: { index: false, follow: true },
}

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 30, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
        <p className="text-gray-300 leading-relaxed">
          By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Use of Service</h2>
        <p className="text-gray-300 leading-relaxed">
          This website provides free online calculator tools for informational and educational purposes only. The results provided by our calculators are estimates and should not be considered as professional financial, medical, legal, or any other type of advice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Accuracy of Information</h2>
        <p className="text-gray-300 leading-relaxed">
          While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, reliability, or completeness of any information on this site. Use the results at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Intellectual Property</h2>
        <p className="text-gray-300 leading-relaxed">
          All content on this website, including text, graphics, logos, and software, is the property of this website and protected by applicable intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
        <p className="text-gray-300 leading-relaxed">
          In no event shall this website be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of this website or any information provided herein.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Advertisements</h2>
        <p className="text-gray-300 leading-relaxed">
          This website displays advertisements through Google AdSense. We are not responsible for the content of these advertisements or any products or services they promote.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
        <p className="text-gray-300 leading-relaxed">
          We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the new terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have any questions about these Terms of Service, please contact us at lth1283910@gmail.com.
        </p>
      </section>
    </div>
  )
}
