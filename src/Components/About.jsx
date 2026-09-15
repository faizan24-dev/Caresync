export default function About() {
  return (
    <section id="about" className="py-20 bg-pure-white">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-mist-gray rounded-[24px] p-8 text-center border border-ink-black/5">
            <div className="w-20 h-20 bg-pure-white text-forest-grove rounded-[12px] flex items-center justify-center mx-auto mb-4 border border-ink-black/5">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
            </div>
            <h4 className="text-lg font-semibold text-ink-black">Unified Clinical Hub</h4>
            <p className="text-sm text-slate-mid mt-2">Bridging the gap between patients, labs, and specialists.</p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="label-caps text-forest-grove">Why CareSync</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-ink-black leading-[1.15] tracking-[-0.02em]">
            Pioneering the future of <br className="hidden md:block"/>digital healthcare
          </h2>
          <p className="text-graphite text-base leading-relaxed max-w-[520px]">
            CareSync equips state-of-the-art clinics and leading hospitals with intelligent scheduling, unified electronic medical records (EMR), and real-time patient monitoring. We eliminate administrative friction, allowing medical professionals to focus entirely on delivering exceptional, life-saving care while providing patients with full control over their health journeys.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {[
              'Instant Specialist Referrals',
              'End-to-End Encrypted EMR',
              'Automated Prescription Refills',
              'Integrated Lab Result Tracking',
              'Paperless Administrative Workflows',
              'HIPAA & GDPR Compliant Infrastructure',
              'Secure Patient-Doctor Messaging',
              'Smart Queue & Triage Management'
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 text-forest-grove shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                <span className="text-graphite text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
