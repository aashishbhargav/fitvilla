import Link from "next/link";
import { companyName } from "@/content/footer";

export const metadata = {
  title: "Terms & Conditions | FitVilla",
  description: "Terms and conditions for using FitVilla Gym services and website.",
};

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="mt-4 text-fitvilla-light/90">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-fitvilla-light/90">
            <p className="text-base leading-relaxed">
              Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}. These Terms and Conditions govern your use of the FitVilla website and membership services operated by {companyName}.
            </p>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing or using our website, visiting our gyms, or signing up for membership, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">2. Membership & Services</h2>
              <p className="leading-relaxed">
                Membership fees, packages, and access are as per the plan you choose. We reserve the right to modify membership terms, fees, or facility access with reasonable notice. Use of our facilities (gym equipment, group classes, steam, sauna, etc.) is subject to safety rules and staff guidance.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">3. Health & Safety</h2>
              <p className="leading-relaxed">
                You confirm that you are in good physical condition to participate in fitness activities. You agree to follow all safety instructions and use equipment properly. FitVilla is not liable for injuries resulting from misuse of equipment or failure to follow instructions. Consult a doctor before starting any new exercise program if you have health concerns.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">4. Conduct</h2>
              <p className="leading-relaxed">
                You agree to behave respectfully towards staff and other members. We reserve the right to suspend or terminate membership without refund for misconduct, breach of these terms, or behaviour that affects the safety or experience of others.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">5. Cancellation & Refunds</h2>
              <p className="leading-relaxed">
                Cancellation and refund policies depend on your membership type and are communicated at the time of enrolment. Please contact us for any cancellation or refund requests.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">6. Privacy</h2>
              <p className="leading-relaxed">
                Your use of our services is also governed by our Privacy Policy. For details on how we collect, use, and protect your personal information, please read our{" "}
                <Link href="/privacy" className="font-medium text-fitvilla-cyan hover:text-fitvilla-glow underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">7. Contact</h2>
              <p className="leading-relaxed">
                For questions about these Terms and Conditions, contact us at{" "}
                <a href="mailto:contact@fitvilla.in" className="text-fitvilla-cyan hover:underline">contact@fitvilla.in</a> or visit our{" "}
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
              href="/privacy"
              className="inline-flex items-center gap-2 text-sm font-medium text-fitvilla-light/90 hover:text-fitvilla-cyan"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
