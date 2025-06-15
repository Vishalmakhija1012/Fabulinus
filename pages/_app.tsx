import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotificationBanner from '../components/NotificationBanner';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const isCourses = router.pathname.startsWith('/courses');
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <title>Fabulinus | Express | Communicate | Dominate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-paleLilac via-white to-softBlue">
        {!isCourses && <NotificationBanner />}
        {/* Always show Header except on /courses pages */}
        {!isCourses && <Header />}
        <main className="flex-1 pt-24 pb-8 fade-in">
          {isHome ? (
            <Component {...pageProps} />
          ) : (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
              <Component {...pageProps} />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
