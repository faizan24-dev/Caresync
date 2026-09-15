import Link from 'next/link';

// Accept the isLoggedIn prop from page.js
export default function Hero({ isLoggedIn }) {
  return (
    <section id="home" className="relative bg-pure-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Content */}
        <div className="space-y-6">
          {/* Announcement Pill */}
          <span className="inline-flex items-center gap-2 border border-forest-grove text-forest-grove rounded-full px-4 py-1.5 label-caps">
            Patient-first telemedicine
          </span>

          {/* Hero Headline */}
          <h1 className="font-serif font-normal text-ink-black text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.12] tracking-[-0.02em] max-w-[560px]">
            Transforming healthcare with <span className="text-forest-grove">CareSync</span>.
          </h1>

          {/* Subhead */}
          <p className="text-graphite text-base lg:text-lg font-normal leading-[1.5] max-w-[480px]">
            Connect with board-certified specialists, manage your records, and book instant telemedicine consultations — anytime, anywhere.
          </p>

          {/* CTA Pair — Filled Dark + Outlined */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href={isLoggedIn ? "/patient/book" : "/patient/signup"}
              className="inline-flex justify-center items-center bg-ink-black hover:bg-pine-shadow text-pure-white font-medium px-6 py-3 rounded-full text-sm transition-all"
            >
              Book a Consultation
            </Link>
            <Link
              href={isLoggedIn ? "/patient/book" : "/patient/signup"}
              className="inline-flex justify-center items-center border border-ink-black text-ink-black hover:bg-mist-gray font-medium px-6 py-3 rounded-full text-sm transition-all"
            >
              Find a Specialist
            </Link>
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-3 pt-4">
            {[
              'Board-certified doctors',
              'Bank-grade data security',
              '24/7 urgent telemedicine',
              'Zero wait-time scheduling',
            ].map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 bg-mist-gray text-graphite text-sm font-medium rounded-full px-4 py-2"
              >
                <svg className="w-3.5 h-3.5 text-forest-grove" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Floating Product Mockup Card */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-md bg-mist-gray rounded-[20px] p-6 border border-ink-black/5 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.35),0px_1px_2px_0px_rgba(0,0,0,0.25)_inset]">
            {/* Doctor surface */}
            <div className="bg-pure-white rounded-[16px] p-8 flex flex-col items-center text-center border border-ink-black/5">
              <div className="w-24 h-24 rounded-full bg-forest-grove/10 text-forest-grove flex items-center justify-center mb-4">
                <span className="text-3xl">🩺</span>
              </div>
              <h3 className="text-xl font-semibold text-ink-black">Dr. Sarah Ahmad, MD</h3>
              <p className="text-sm text-slate-mid mt-1 max-w-xs">Cardiology Specialist • 15+ Years Experience</p>
            </div>

            {/* Chat bubbles */}
            <div className="mt-4 space-y-3">
              <div className="inline-flex items-center gap-2 bg-forest-grove text-pure-white text-sm font-medium rounded-full px-4 py-2">
                Hi, I&apos;m ready when you are.
              </div>
              <div className="flex justify-end">
                <div className="inline-flex items-center gap-2 bg-pure-white border border-ink-black/10 text-graphite text-xs font-medium rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-forest-grove"></span>
                  Available for teleconsultation now
                </div>
              </div>
              <p className="text-ink-black text-lg font-medium leading-snug pt-1">
                &ldquo;What symptoms would you like to discuss today?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
