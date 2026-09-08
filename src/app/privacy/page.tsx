import Link from "next/link";
import { companyName, contactEmail } from "@/content/footer";

export const metadata = {
  title: "Privacy Policy | FitVilla",
  description: "How FitVilla collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Back button */}
      <div className="border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-fitvilla-light/90 transition-colors hover:text-fitvilla-cyan"
          >
            <span aria-hidden>←</span> Back to home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/page-hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(45,212,228,0.1),transparent_55%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-fitvilla-light/90">
            How we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-fitvilla-light/90">
            <p className="text-base leading-relaxed">
              Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}. {companyName} (&quot;FitVilla&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights regarding your data.
            </p>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">1. Information We Collect</h2>
              <p className="mb-2 leading-relaxed">
                We may collect the following types of information:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li><strong className="text-white/90">Contact details:</strong> Name, email address, phone number when you enquire, sign up for a trial, or become a member.</li>
                <li><strong className="text-white/90">Membership and usage:</strong> Membership type, visit history, class bookings, and preferences related to our gym services.</li>
                <li><strong className="text-white/90">Health and fitness:</strong> Information you provide for body composition analysis (BCA), fitness goals, or trainer consultations, where applicable.</li>
                <li><strong className="text-white/90">Website usage:</strong> Device type, IP address, and pages visited when you use our website, to improve our services and security.</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">2. How We Use Your Information</h2>
              <p className="leading-relaxed">
                We use your information to: provide and manage your membership; process enquiries and bookings; send service-related communications (e.g. class reminders, opening hours); improve our facilities and website; comply with legal obligations; and, with your consent where required, send marketing about offers and events. We do not sell your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">3. Sharing of Information</h2>
              <p className="leading-relaxed">
                We may share your information with: service providers who assist us (e.g. payment processors, IT support); legal or regulatory authorities when required by law; and partners such as wellness or nutrition providers only where you have agreed or where necessary for the service. We require such parties to protect your data and use it only for the purposes we specify.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">4. Cookies and Similar Technologies</h2>
              <p className="leading-relaxed">
                Our website may use cookies and similar technologies to remember your preferences, analyse site traffic, and improve user experience. You can control cookies through your browser settings. Disabling some cookies may affect how the site works.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">5. Data Security</h2>
              <p className="leading-relaxed">
                We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. No method of transmission over the internet is 100% secure; we encourage you to use strong passwords and keep your contact details up to date.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">6. Your Rights</h2>
              <p className="leading-relaxed">
                Depending on applicable law, you may have the right to: access the personal data we hold about you; request correction or deletion; object to or restrict certain processing; and withdraw consent where we rely on it. To exercise these rights or for any privacy-related questions, contact us at{" "}
                <a href={`mailto:${contactEmail}`} className="text-fitvilla-cyan hover:underline">{contactEmail}</a>.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">7. Retention</h2>
              <p className="leading-relaxed">
                We retain your information for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. Membership and health-related data may be retained for a period after the end of your membership as required by law or our policies.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">8. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. We encourage you to review this page periodically. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">9. Contact Us</h2>
              <p className="leading-relaxed">
                For privacy enquiries or to exercise your rights, contact {companyName} at{" "}
                <a href={`mailto:${contactEmail}`} className="text-fitvilla-cyan hover:underline">{contactEmail}</a> or visit our{" "}
                <Link href="/contact" className="text-fitvilla-cyan hover:underline">Contact</Link> page.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-fitvilla-cyan hover:text-fitvilla-glow"
            >
              ← Back to home
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 text-sm font-medium text-fitvilla-light/90 hover:text-fitvilla-cyan"
            >
              Terms & Conditions →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
