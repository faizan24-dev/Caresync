import { cookies } from 'next/headers';
import Header from '../Components/Header.jsx';
import Hero from '../Components/Hero.jsx';
import About from '../Components/About.jsx';
import Modules from '../Components/Modules.jsx';
import Footer from '../Components/Footer.jsx';

// Force Next.js to dynamically render this page on every request
export const dynamic = 'force-dynamic';

export default async function Home() {
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