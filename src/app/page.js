import { cookies } from 'next/headers';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Footer from '../components/Footer';

// Force Next.js to dynamically render this page on every request
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Securely check the cookies on the server to see if a token exists
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('token');

  return (
    <div className="min-h-screen bg-pure-white text-ink-black font-sans">
      <Header isLoggedIn={isLoggedIn} />
      <Hero isLoggedIn={isLoggedIn} />
      <About />
      <Modules />
      <Footer />
    </div>
  );
}