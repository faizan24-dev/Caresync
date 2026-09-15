"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pure-white/90 backdrop-blur-md border-b border-ink-black/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-mist-gray flex items-center justify-center text-forest-grove border border-ink-black/5">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-semibold text-ink-black tracking-tight">
            Care<span className="text-forest-grove">Sync</span>
          </span>
        </Link>

        {/* Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-8 text-slate-mid text-sm">
          <Link href="/#home" className="text-forest-grove font-medium">
            Home
          </Link>
          <Link href="/#about" className="hover:text-ink-black transition-colors">
            About
          </Link>
          <Link href="/#modules" className="hover:text-ink-black transition-colors">
            Modules
          </Link>
          <Link href="/#footer" className="hover:text-ink-black transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Side: Action Buttons (Always Visible) + Hamburger Button */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Action Buttons (Visible on both mobile & desktop) */}
          <div className="flex items-center gap-3">
            {Boolean(isLoggedIn) === true ? (
              <>
                <Link
                  href="/patient/history"
                  className="hidden sm:inline-block text-slate-mid hover:text-ink-black font-medium text-sm transition-colors"
                >
                  My Appointments
                </Link>
                <Link
                  href="/patient/book"
                  className="bg-ink-black hover:bg-pine-shadow text-pure-white font-medium px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-all"
                >
                  Book Appointment
                </Link>
                <a
                  href="/api/patient/logout"
                  className="hidden sm:inline-flex items-center border border-ink-black text-ink-black hover:bg-mist-gray font-medium px-5 py-2 rounded-full text-xs sm:text-sm transition-all"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/patient/login"
                  className="hidden sm:inline-flex items-center border border-ink-black text-ink-black hover:bg-mist-gray font-medium px-5 py-2 rounded-full text-xs sm:text-sm transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/patient/signup"
                  className="bg-ink-black hover:bg-pine-shadow text-pure-white font-medium px-3 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-all"
                >
                  Book Appointment
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ink-black hover:text-forest-grove focus:outline-none p-1"
              aria-label="Toggle Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Menu Dropdown (Only Navigation Links: Home, About, Modules, Contact) */}
      {isOpen && (
        <div className="md:hidden bg-pure-white border-t border-ink-black/10 px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-3 text-slate-mid text-sm">
            <Link
              href="/#home"
              onClick={() => setIsOpen(false)}
              className="text-forest-grove font-medium py-1"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="hover:text-ink-black transition-colors py-1"
            >
              About
            </Link>
            <Link
              href="/#modules"
              onClick={() => setIsOpen(false)}
              className="hover:text-ink-black transition-colors py-1"
            >
              Modules
            </Link>
            <Link
              href="/#footer"
              onClick={() => setIsOpen(false)}
              className="hover:text-ink-black transition-colors py-1"
            >
              Contact
            </Link>
            {Boolean(isLoggedIn) === true && (
              <>
                <Link
                  href="/patient/history"
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden text-slate-mid hover:text-ink-black transition-colors py-1"
                >
                  My Appointments
                </Link>
                <a
                  href="/api/patient/logout"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-mid hover:text-ink-black transition-colors py-1"
                >
                  Logout
                </a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
