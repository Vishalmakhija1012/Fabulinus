import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return; // Prevent SSR mismatch
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isDesktop;
}

function TestimonialCarousel() {
  const testimonials = [
    {
      text: "I took classes at my time of convenience, and when I missed I used recording, Aparna Ma'am helped me in understanding aspects of good English communication.",
      name: "Sonal Kapoor",
      tag: "Student",
      sub: "Young Learner Program",
      img: "/3.png",
    },
    {
      text: "I'm extremely grateful to Aparna Ma'am and Fabulinus teachers for helping me clear my concepts and supporting me every step of the way.",
      name: "Darshan Nagpal",
      tag: "Student",
      sub: "Advantage English Program",
      img: "/1.png",
    },
    {
      text: "I was able to crack my job interview—Fabulinus truly transformed my communication, a big Thank you! :)",
      name: "Sneha Gupta",
      tag: "Professional",
      sub: "Competitive Edge Program",
      img: "/2.png",
    },
  ];

  // Only 3 testimonies, no scroll effect, same for desktop and mobile
  const visibleTestimonials = testimonials;
  // Hydration fix: default to false, only update after mount
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return; // Prevent SSR mismatch
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Always render the same structure on server and client
  // Use a wrapper div with a fixed layout, and only change flex direction after mount
  return (
    <div className="relative w-full flex items-center justify-center pb-16">
      <div
        className={
          isMobile
            ? "flex flex-col items-end justify-start gap-0 w-full max-w-5xl px-3 md:px-0"
            : "flex flex-row items-stretch justify-center gap-8 w-full max-w-5xl px-3 md:px-0"
        }
      >
        {visibleTestimonials.map((t, i) => (
          <>
            <div
              key={i}
              className={
                'flex flex-col transition-all duration-300' +
                (isMobile
                  ? ' mb-8 w-full max-w-[370px] min-h-[320px] px-0 py-0 rounded-2xl shadow-sm testimonial-mobile-card'
                  : ' bg-white rounded-2xl shadow-xl px-4 py-6 md:px-8 md:py-8 mx-3')
              }
              style={
                isMobile
                  ? {
                      minWidth: 0,
                      maxWidth: '370px',
                      minHeight: '320px',
                      margin: '32px 20px',
                      background: '#fff',
                      borderRadius: '20px',
                      boxShadow: '0 4px 24px 0 rgba(44,62,80,0.10)',
                      border: '1.5px solid #f3f3f3',
                      padding: '32px 28px 28px 28px',
                      alignItems: 'stretch',
                      justifyContent: 'center',
                      height: '100%',
                      position: 'relative',
                    }
                  : {
                      minWidth: 320,
                      maxWidth: 370,
                      minHeight: 320,
                      boxShadow: '0 2px 8px 0 rgba(44,62,80,0.06)',
                      zIndex: 1,
                    }
              }
            >
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'center' : 'flex-start', height: '100%'}}>
                <div
                  style={
                    isMobile
                      ? {
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '1em', // match Aparna bio section
                          color: '#23242b',
                          fontWeight: 400,
                          textAlign: 'left', // left align
                          marginBottom: 22,
                          marginTop: 0,
                          lineHeight: 1.5,
                          minHeight: 90,
                          width: '100%',
                          display: 'block',
                          letterSpacing: '-0.01em',
                          paddingLeft: 2,
                          paddingRight: 2,
                        }
                      : {
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '1em', // match Aparna bio section
                          color: '#23242b',
                          fontWeight: 400,
                          textAlign: 'left', // left align
                          marginBottom: 24,
                          marginTop: 0,
                          lineHeight: 1.5,
                          minHeight: 100,
                          width: '100%',
                          display: 'block',
                        }
                  }
                >
                  {t.text}
                </div>
                {isMobile ? (
                  <div className="flex flex-row items-center w-full" style={{marginTop: 'auto', gap: 14}}>
                    {/* Avatar - left */}
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2.5px solid #fff',
                        background: '#fff',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 0,
                        boxShadow: '0 2px 12px 0 rgba(44,62,80,0.10)',
                      }}
                    >
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-white shadow object-cover"
                        style={{objectFit: 'cover', width: 60, height: 60}}
                      />
                    </div>
                    {/* Text - right */}
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, flex: 1, gap: 2}}>
                      <span style={{ fontFamily: 'Questrial, sans-serif', fontWeight: 700, fontSize: '1.18em', color: '#23242b', lineHeight: 1.1, textAlign: 'left', display: 'block', letterSpacing: '-0.01em' }}>{t.name}</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1em', color: '#888', textAlign: 'left', display: 'block', marginTop: 2 }}>
                        {t.tag} &ndash; {t.sub}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Desktop version (unchanged)
                  <div className="flex items-center gap-2 md:gap-4 mt-auto">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={54}
                      height={54}
                      className="rounded-full border-2 border-white shadow object-cover"
                    />
                    <div>
                      <span className="font-bold text-[#23242b]" style={{ fontFamily: 'Quesrial, sans-serif', fontSize: '1.1em' }}>{t.name}</span>
                      <span className="block text-xs text-[#888]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{t.tag} &ndash; {t.sub}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {isMobile && (
              <hr className="mobile-section-divider-testimony" key={`divider-${i}`}/>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

// --- Unified Mobile CTA Group (button + avatars in a single white, pill-shaped box) ---
function MobileCTAGroup() {
  return (
    <div
      className="flex flex-col w-full items-center px-4"
      style={{
        gap: 16,
        margin: '18px auto 32px auto',
        padding: '0 20px',
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 2px 12px 0 rgba(44,62,80,0.06)',
        border: '1px solid #f3f3f3',
        maxWidth: 420,
      }}
    >
      <Link
        href="/persona"
        className="font-bold rounded-2xl px-8 py-4 text-base uppercase tracking-wide border-2 border-[#ef5a63] text-[#ef5a63] bg-white shadow-lg hover:bg-[#fff0f2] transition-all duration-200 text-center min-w-[180px] whitespace-nowrap active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ef5a63] focus:ring-opacity-50"
        style={{
          fontFamily: 'Sora, sans-serif',
          boxShadow: '0 4px 16px 0 rgba(239,90,99,0.12)',
          letterSpacing: '0.03em',
          marginBottom: 16,
        }}
      >
        EXPLORE COURSES
      </Link>
      <div
        className="flex items-center gap-2 w-full justify-center"
        style={{ marginTop: 0, marginBottom: 4 }}
      >
        <div className="flex -space-x-3">
          <Image src="/1.png" alt="Learner avatar 1" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
          <Image src="/2.png" alt="Learner avatar 2" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
          <Image src="/3.png" alt="Learner avatar 3" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
        </div>
        <span className="text-base text-[#23242b] ml-2" style={{fontFamily: 'Questrial, sans-serif', fontWeight: 400}}>Trusted by 2,000k learners</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState<null | 'trial' | 'courses'>(null);
  const [persona, setPersona] = useState(null);
  const router = useRouter();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPersona(localStorage.getItem('personaType'));
    }
  }, []);

  const handlePersonaClick = (persona: string) => {
    if (modalOpen === 'trial') {
      window.location.href = `/contact?type=${persona}`;
    } else if (modalOpen === 'courses') {
      window.location.href = `/courses?type=${persona}`;
    }
  };

  // Desktop-only hero image: only render after mount if desktop
  const [showHeroImage, setShowHeroImage] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return; // Prevent SSR mismatch
    const checkDesktop = () => setShowHeroImage(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, [mounted]);

  const [isMobileGREAT, setIsMobileGREAT] = useState(false);
  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return; // Prevent SSR mismatch
    const check = () => setIsMobileGREAT(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [mounted]);
  if (!mounted) {
    // Render a neutral fallback to avoid hydration mismatch
    return <main className="w-full min-h-screen flex flex-col bg-[#fafafa] overflow-x-hidden" />;
  }
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#fafafa] overflow-x-hidden">
      {/* Add padding to main content to account for fixed header */}
      <div style={{ paddingTop: 72 }} className="w-full max-w-[100vw] overflow-x-hidden">
        {/* Hero Section - Refactored to a two-column layout */}
        <section
          id="why"
          tabIndex={-1}
          className="relative flex flex-col md:flex-row items-center min-h-[750px] md:min-h-[760px] h-[750px] md:h-[760px] w-full max-w-full bg-white md:bg-[#fafafa] px-0 md:px-[82px] py-0 md:py-16 overflow-x-hidden border-none shadow-none outline-none mt-0 mb-0 mx-auto justify-center scroll-mt-[100px] rounded-none md:rounded-3xl"
          style={{
            top: '-75px',
            position: 'relative',
            minHeight: '750px',
            height: '750px',
            marginBottom: 0
          }}
        >
          <div className="flex-1 flex flex-col justify-between items-stretch max-w-2xl w-full z-10 h-full pl-0 md:pl-[40px]"
            style={typeof window !== 'undefined' && window.innerWidth >= 768 ? { paddingTop: 64 } : {}} // 64px top padding for desktop only
          >
            {/* Top: Title, subtitle, paragraph (spaced to fill ~620px) */}
            <div className="flex flex-col flex-grow md:items-start" style={{height: 'auto', justifyContent: 'flex-start'}}>
              <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight tracking-tight mb-2 md:mb-3 mt-0 md:mt-0 text-left" style={{fontFamily: 'Quesrial, sans-serif', textAlign: 'left'}}>
                Master English Communication
              </h1>
              <div className="flex flex-col items-start w-full mb-1 mt-1">
                <span className="text-2xl font-semibold text-[#232323] tracking-tight text-left" style={{fontFamily: 'Quesrial, sans-serif', letterSpacing: '-0.01em', textAlign: 'left', lineHeight: 1.3}}>
                  Express<span className="mx-1 text-[#ef5a63]">.</span> <br className="block md:hidden" />
                  Communicate<span className="mx-1 text-[#ef5a63]">.</span> <br className="block md:hidden" />
                  Dominate<span className="mx-1 text-[#ef5a63]">.</span>
                </span>
              </div>
              <p className="text-base md:text-xl text-[#555] mb-0 md:mb-2 mt-0 md:mt-0 max-w-2xl text-left" style={{fontFamily: 'Inter, sans-serif', lineHeight: 1.5, marginTop: 0, marginBottom: 0, textAlign: 'left'}}>
                Get personalized guidance from top English instructors through one-on-one sessions. Build fluency, precision, and confidence. Advance your career and daily communication with measurable results
              </p>
              {/* Add spacing below the paragraph, matching the spacing above between Express/Communicate/Dominate and the paragraph */}
              {!isDesktop && <div style={{ height: 32 }} />}
            </div>
            {/* Desktop: Button and trust indicator remain as before */}
            <div className="hidden md:flex flex-col w-full px-6 pb-8 md:pb-0">
              <div className="flex flex-row flex-nowrap gap-4 mb-0 w-full justify-center md:justify-start"
                style={{
                  marginTop: isDesktop ? '-200px' : undefined
                }}
              >
                <Link href="/persona" className="bg-[#ef5a63] text-white font-bold rounded-2xl px-6 py-3 text-base md:text-xl uppercase tracking-wide shadow-lg hover:bg-[#e04a54] transition-all duration-200 text-center min-w-[160px] md:min-w-[220px] whitespace-nowrap border-2 border-[#ef5a63] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ef5a63] focus:ring-opacity-50 hero-cta-desktop" style={{fontFamily: 'Sora, sans-serif', boxShadow: '0 4px 16px 0 rgba(239,90,99,0.12)'}}>
                  Explore Courses
                </Link>
              </div>
              <div className="flex items-center gap-2 w-full justify-center md:justify-start mt-2 md:mt-3 pb-2 md:pb-0">
                <div className="flex -space-x-3">
                  <Image src="/1.png" alt="Learner avatar 1" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
                  <Image src="/2.png" alt="Learner avatar 2" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
                  <Image src="/3.png" alt="Learner avatar 3" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
                </div>
                <span className="text-base text-gray-500 ml-2" style={{fontFamily: 'Questrial, sans-serif', fontWeight: 400}}>Trusted by 2,000k learners</span>
              </div>
            </div>
          </div>
          {/* Right: Main Image (desktop only, client-only render) */}
          <div className="flex-1 items-end justify-center w-full md:w-1/2 h-full z-0 hidden md:flex">
            <div className="relative w-full max-w-2xl flex justify-end">
              {showHeroImage && (
                <Image
                  src="/Fab 1.png"
                  alt="Fabulinus English learning illustration"
                  width={1600}
                  height={1800}
                  className="object-contain w-full h-auto max-h-[600px] md:max-h-[700px] drop-shadow-xl rounded-2xl"
                  priority
                />
              )}
            </div>
          </div>
          {/* Mobile-only thin red divider at the end of section 1 */}
          <hr className="mobile-section-divider" />
        </section>
        <section
          id="teachers"
          tabIndex={-1}
          className="w-full flex flex-col items-center justify-center py-0 px-4 md:px-0 mx-auto mb-4 max-w-[420px] md:max-w-[420px]"
          style={{
            marginTop: 0, // Remove gap before teachers for all views
            minHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? 'calc(100% + 30px)' : undefined
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full py-8 px-4 md:px-8"
            style={typeof window !== 'undefined' && window.innerWidth < 768 ? {
              padding: '24px 0', // Remove left/right padding for mobile
              margin: '12px 0',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent', // Remove box background
              boxShadow: 'none', // Remove shadow
              border: 'none', // Remove border
              borderRadius: 0, // Remove border radius for mobile
            } : {}}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#23242b] mb-2 text-center" style={{ fontFamily: 'Quesrial, sans-serif' }}>
              Learn from the best!
            </h2>
            <h3 className="text-xl md:text-2xl font-normal text-[#23242b]/90 mb-2 text-center" style={{ fontFamily: 'Quesrial, sans-serif', fontWeight: 400 }}>
              Meet <span style={{ color: '#ef5a63', fontWeight: 400 }}>Aparna Sinha</span>, your teacher
            </h3>
            <div className="flex flex-col items-center w-full" style={{ position: 'relative' }}>
              <div style={{ height: '16px' }} />
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden bg-white flex items-center justify-center mx-auto mb-3 md:mb-4 border-0 shadow-none">
                <img src="/Aparna.png" alt="Aparna Sinha" className="object-cover w-full h-full" />
              </div>
              <img src="/Fabulinus_logo.svg" alt="Fabulinus Logo" className="h-12 w-auto mb-0 mt-4 md:mt-2" />
              <span className="text-lg mt-2 md:mt-1 block text-center" style={{ fontFamily: 'Quesrial, sans-serif', letterSpacing: '0.01em', color: '#23242b', fontWeight: 400 }}>
                Express<span style={{ color: '#ef5a63', fontWeight: 700 }}>.</span> Communicate<span style={{ color: '#ef5a63', fontWeight: 700 }}>.</span> Dominate<span style={{ color: '#ef5a63', fontWeight: 700 }}>.</span>
              </span>
            </div>
          </div>
          {/* Remove the achievements/bio box for mobile (no box, no shadow, no border) */}
          <div
            className="hidden md:flex flex-col items-start justify-center w-full h-full bg-white p-8 rounded-3xl mt-6 shadow-xl md:block"
            style={{
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            <span className="block text-2xl font-bold text-[#23242b] leading-tight mb-0" style={{ fontFamily: 'Quesrial, Arial, sans-serif', lineHeight: 1.1 }}>
              Aparna Sinha
            </span>
            <span className="block text-base font-semibold text-[#ef5a63] mt-1 mb-0" style={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: '0.01em', fontWeight: 500 }}>
              20 Years Experience
            </span>
            <span className="block text-base font-normal text-[#ef5a63] mt-0 mb-2" style={{ fontFamily: 'Inter, Arial, sans-serif', letterSpacing: '0.01em', fontWeight: 400 }}>
              Author & Entrepreneur
            </span>
            <div className="mb-4 text-base" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 400, color: '#23242b', lineHeight: 1.5 }}>
              Aparna Sinha is a celebrated Indian author and entrepreneur, recognized for her impactful writing and leadership. With six published books and numerous awards, she has inspired thousands. Her work is widely featured and she is a sought-after voice in media and interviews.
            </div>
            <span className="block mb-1 text-base font-bold text-[#ef5a63]" style={{ fontFamily: 'Questrial, Arial, sans-serif' }}>
              Achievements
            </span>
            <ul className="list-disc pl-5 mb-4 text-base" style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, color: '#23242b' }}>
              <li>Best-selling Indian author</li>
              <li>7 books published</li>
              <li>Known as "Queen of Thrillers!"</li>
              <li>2X Entrepreneur</li>
              <li>Multiple national & international awards</li>
              <li>Published in Indian & International Magazines</li>
            </ul>
            <div className="mt-2 mb-4 text-left w-full">
              <a href="https://www.google.com/search?q=Aparna+Sinha+Author" target="_blank" rel="noopener noreferrer" className="text-[#ef5a63] underline font-medium hover:text-[#c72d3b] transition-colors text-base" style={{ fontFamily: 'Quesrial, Arial, sans-serif' }}>
                Google Aparna Sinha (Author)
              </a>
            </div>
            {/* LOGOS BAR: Desktop version always, mobile version is now identical (no animation, no extra bar, just static row and progress bar) */}
            <div className="fabulinus-logos-bar w-full overflow-x-hidden whitespace-nowrap py-4 px-2 relative scrollbar-hide">
              <div className="fabulinus-logos-bar-inner inline-flex items-center gap-10">
                <img src="/republic.png" alt="Republic TV" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200" />
                <img src="/thehindu.png" alt="The Hindu" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200" />
                <img src="/hindustantimes.png" alt="Hindustan Times" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200" />
                <img src="/bt.png" alt="Business Times" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200" />
                <img src="/dainikbhaskar.png" alt="Dainik Bhaskar" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200" />
                <img src="/dainikjagran.png" alt="Dainik Jagran" className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200" />
              </div>
              <div className="fabulinus-logos-bar-progress" />
            </div>
          </div>
        </section>
        {/* Mobile-only thin red divider between section 2 and 3 */}
        <hr className="mobile-section-divider-between" />
        <section
          id="testimonies"
          tabIndex={-1}
          className="w-full min-h-[90vh] h-[90vh] py-0 px-6 md:px-32 bg-white flex flex-col items-center justify-center rounded-3xl mx-auto mb-8 max-w-[1400px] scroll-mt-[100px]"
          style={{
            minHeight: isDesktop ? '90vh' : '72vh',
            height: isDesktop ? '90vh' : '72vh',
            paddingBottom: isDesktop ? 0 : 12, // reduce bottom padding for mobile
            marginBottom: isDesktop ? '2rem' : '0.5rem', // less margin below section for mobile
          }}
        >
          <div className="max-w-6xl w-full mx-auto flex flex-col items-center justify-center h-full"
            style={isDesktop ? {} : {paddingBottom: 0, marginBottom: 0, height: '100%'}}>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#23242b] mb-12 text-center mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0"
              style={{ fontFamily: 'Quesrial, sans-serif', letterSpacing: '-0.01em', marginTop: isDesktop ? '150px' : '32px', marginBottom: isDesktop ? '48px' : '18px', paddingBottom: isDesktop ? 0 : 0 }}
            >
              What Our Students Say?
            </h2>
            <div className="w-full flex flex-col items-center"
              style={isDesktop ? {} : {paddingBottom: 0, marginBottom: 0}}>
              <TestimonialCarousel />
              {/* Carousel indicator dots moved further down and made visible */}
              <div className="flex flex-row justify-center items-center gap-4 mt-20 mb-2 z-20 relative w-full min-h-[40px]"
                style={isDesktop ? {} : {marginTop: 12, marginBottom: 0, minHeight: 0}}>
                {/* If your carousel component exposes indicators, render them here, or ensure this div is used for the circles */}
                {/* ...carousel indicator circles... */}
              </div>
            </div>
          </div>
        </section>
        <section
          id="methodology"
          tabIndex={-1}
          className="great-framework-section-red w-full flex flex-col md:flex-row items-center justify-center py-0 px-4 md:px-16 rounded-3xl mx-auto mb-8 max-w-[1400px] overflow-hidden shadow-xl border border-[#e5e7eb] bg-white scroll-mt-[100px]"
          style={
            isDesktop
              ? {
                  minHeight: '1000px',
                  height: '1000px',
                  marginTop: '64px',
                  marginBottom: '64px',
                  borderRadius: '32px',
                  background: '#fff',
                  boxShadow: '0 8px 32px 0 rgba(44,62,80,0.06)',
                }
              : {
                  minHeight: '90vh',
                  height: '90vh',
                  marginBottom: 48, // add extra gap below GREAT section for mobile
                  paddingTop: '-8px', // reduce top padding for mobile (12px - 20px)
                  paddingBottom: '-8px', // reduce bottom padding for mobile (12px - 20px)
                }
          }
        >
          {/* Left: Heading, Description, Buttons, Trust Indicator */}
          <div className="flex-1 flex flex-col justify-center items-start max-w-2xl w-full px-2 md:px-16 mb-10 md:mb-0 mt-0 md:mt-[-12px] h-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-[#23242b] md:text-white text-left" style={{ fontFamily: 'Quesrial, sans-serif' }}>
              {isDesktop ? (
                <>Excel in English Communication with the GREAT Approach</>
              ) : (
                <>
                  Excel in English Communication with the <span style={{ color: '#ef5a63' }}>GREAT</span> Approach
                </>
              )}
            </h2>
            <p className="text-lg md:text-xl mb-4 max-w-2xl text-[#23242b] md:text-white/90 text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
              {isDesktop ? (
                <>Unlock your full potential in public speaking, communication, and English proficiency—both verbal and written—through our structured and results-driven GREAT Approach.</>
              ) : (
                <>
                  Unlock your full potential in public speaking, communication, and English proficiency—both verbal and written—through our structured and results-driven <span style={{ color: '#ef5a63' }}>GREAT</span> Approach.
                </>
              )}
            </p>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-[#23242b] md:text-white/90 text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
              {isDesktop ? (
                <>Whether you're a student, a working professional, or someone striving to build confidence, our methodology ensures consistent progress and measurable success.</>
              ) : (
                <>Whether you're a student, a working professional, or someone striving to build confidence, <span style={{ color: '#ef5a63' }}>our methodology</span> ensures consistent progress and measurable success.</>
              )}
            </p>
            {/* Buttons and Trust Indicator - both buttons white */}
            <div className={isDesktop ? "flex flex-col md:flex-row gap-4 mb-8 w-full" : "hidden"}>
              <Link href="/persona" className="bg-white border border-[#ef5a63] text-[#ef5a63] font-bold rounded-xl px-8 py-4 text-lg md:text-xl uppercase tracking-wide shadow hover:bg-[#fff0f2] transition-all duration-200 text-center min-w-[180px] md:min-w-[220px] whitespace-nowrap" style={{fontFamily: 'Sora, sans-serif'}}>Explore Courses</Link>
            </div>
            {/* Trust Indicator - exactly as in hero section */}
            <div className={isDesktop ? "flex items-center gap-2 -mt-3 md:-mt-5" : "hidden"}>
              <div className="flex -space-x-3">
                <Image src="/1.png" alt="Learner avatar 1" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
                <Image src="/2.png" alt="Learner avatar 2" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
                <Image src="/3.png" alt="Learner avatar 3" width={40} height={40} className="rounded-full border-2 border-white bg-white shadow-md object-cover w-10 h-10" />
              </div>
              <span className="text-base ml-2 text-[#23242b] md:text-white" style={{fontFamily: 'Quesrial, sans-serif', fontWeight: 400}}>Trusted by 2,000k learners</span>
            </div>
          </div>
          {/* Right: Info Cards Stacked Vertically */}
          <div
            className="flex flex-col gap-6 w-full md:w-auto px-2 md:px-0 justify-center h-full"
            style={
              isDesktop
                ? {
                    position: 'static',
                    right: 'unset',
                    top: 'unset',
                    transform: 'none',
                    marginTop: '0',
                    marginRight: '0',
                    width: '532px',
                    maxWidth: '532px',
                    // Remove the following for desktop:
                    // background: '#fff',
                    // borderRadius: '32px',
                    // boxShadow: '0 8px 32px 0 rgba(44,62,80,0.06)',
                    // padding: '48px 32px',
                  }
                : {
                    maxWidth: '100vw',
                    overflow: 'visible',
                  }
            }
          >
            {/* Grading */}
            {isMobileGREAT ? (
              <div className="flex great-card-mobile great-card-row-mobile bg-white rounded-xl p-3 shadow-md w-full max-w-[95vw]" style={{fontSize:'0.97rem',lineHeight:1.35,padding:'14px 10px',margin:'8px 0',maxWidth:'95vw'}}>
                <div className="great-card-alpha-mobile">G</div>
                <div className="flex flex-col w-full great-card-content-mobile">
                  <div className="text-base text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Grading</span></span>
                    {`: Tailored assessments and defined benchmarks to track your development`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white rounded-xl p-3 sm:p-6 shadow-md w-full max-w-[95vw] sm:max-w-full">
                <div className="flex flex-col w-full">
                  <div className="text-base sm:text-lg text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Grading</span></span>
                    {`: Tailored assessments and defined benchmarks to track your development`}
                  </div>
                </div>
              </div>
            )}
            {/* Regular Monitoring */}
            {isMobileGREAT ? (
              <div className="flex great-card-mobile great-card-row-mobile bg-white rounded-xl p-3 shadow-md w-full max-w-[95vw]" style={{fontSize:'0.97rem',lineHeight:1.35,padding:'14px 10px',margin:'8px 0',maxWidth:'95vw'}}>
                <div className="great-card-alpha-mobile">R</div>
                <div className="flex flex-col w-full great-card-content-mobile">
                  <div className="text-base text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Regular Monitoring</span></span>
                    {`: Continuous feedback and performance evaluations to guide improvement`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white rounded-xl p-3 sm:p-6 shadow-md w-full max-w-[95vw] sm:max-w-full">
                <div className="flex flex-col w-full">
                  <div className="text-base sm:text-lg text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Regular Monitoring</span></span>
                    {`: Continuous feedback and performance evaluations to guide improvement`}
                  </div>
                </div>
              </div>
            )}
            {/* Experts */}
            {isMobileGREAT ? (
              <div className="flex great-card-mobile great-card-row-mobile bg-white rounded-xl p-3 shadow-md w-full max-w-[95vw]" style={{fontSize:'0.97rem',lineHeight:1.35,padding:'14px 10px',margin:'8px 0',maxWidth:'95vw'}}>
                <div className="great-card-alpha-mobile">E</div>
                <div className="flex flex-col w-full great-card-content-mobile">
                  <div className="text-base text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Experts</span></span>
                    {`: Learn from Aparna Sinha, and other expert educators, using time-tested strategies`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white rounded-xl p-3 sm:p-6 shadow-md w-full max-w-[95vw] sm:max-w-full">
                <div className="flex flex-col w-full">
                  <div className="text-base sm:text-lg text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Experts</span></span>
                    {`: Learn from Aparna Sinha, and other expert educators, using time-tested strategies`}
                  </div>
                </div>
              </div>
            )}
            {/* Accessibility */}
            {isMobileGREAT ? (
              <div className="flex great-card-mobile great-card-row-mobile bg-white rounded-xl p-3 shadow-md w-full max-w-[95vw]" style={{fontSize:'0.97rem',lineHeight:1.35,padding:'14px 10px',margin:'8px 0',maxWidth:'95vw'}}>
                <div className="great-card-alpha-mobile">A</div>
                <div className="flex flex-col w-full great-card-content-mobile">
                  <div className="text-base text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Accessibility</span></span>
                    {`: Flexible scheduling, on-demand resources, and a supportive learning environment`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white rounded-xl p-3 sm:p-6 shadow-md w-full max-w-[95vw] sm:max-w-full">
                <div className="flex flex-col w-full">
                  <div className="text-base sm:text-lg text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Accessibility</span></span>
                    {`: Flexible scheduling, on-demand resources, and a supportive learning environment`}
                  </div>
                </div>
              </div>
            )}
            {/* Transparency */}
            {isMobileGREAT ? (
              <div className="flex great-card-mobile great-card-row-mobile bg-white rounded-xl p-3 shadow-md w-full max-w-[95vw]" style={{fontSize:'0.97rem',lineHeight:1.35,padding:'14px 10px',margin:'8px 0',maxWidth:'95vw'}}>
                <div className="great-card-alpha-mobile">T</div>
                <div className="flex flex-col w-full great-card-content-mobile">
                  <div className="text-base text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Transparency</span></span>
                    {`: Clear objectives, honest feedback, and absolutely no hidden costs`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white rounded-xl p-3 sm:p-6 shadow-md w-full max-w-[95vw] sm:max-w-full">
                <div className="flex flex-col w-full">
                  <div className="text-base sm:text-lg text-[#23242b] font-normal" style={{display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                    <span style={{ fontWeight: 700 }}><span style={{ color: '#ef5a63' }}>Transparency</span></span>
                    {`: Clear objectives, honest feedback, and absolutely no hidden costs`}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* Mobile-only CTA + avatars group after GREAT cards (Section 4) */}
        {!isDesktop && <MobileCTAGroup />}
        {/* Mobile-only divider and extra gap between GREAT and FAQ sections */}
        <hr className="mobile-section-divider-faq" />
        {/* Move Explore Courses group up by 15px for mobile only */}
        <div className="explore-courses-mobile-gap-adjust" style={{ position: 'relative', zIndex: 10 }}>
          <section
            id="faqs"
            tabIndex={-1}
            className="w-full py-16 px-6 md:px-32 bg-[#fafafa] flex flex-col items-center rounded-3xl mx-auto mb-8 max-w-[1200px] min-h-[65vh] mt-20 scroll-mt-[100px] faqs-mobile-clean"
            style={
              isDesktop
                ? {
                    marginTop: '64px',
                    marginBottom: '64px',
                    borderRadius: '32px',
                    background: '#fafafa',
                    boxShadow: '0 8px 32px 0 rgba(44,62,80,0.06)',
                  }
                : {
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: '32px',
                    marginBottom: '24px',
                    paddingLeft: 0,
                    paddingRight: 0,
                    minHeight: '90vh', // increase height for mobile only
                  }
            }
          >
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center faqs-mobile-inner"
              style={isDesktop ? {} : {alignItems: 'flex-start', textAlign: 'left', width: '100%'}}>
              <h2 className="text-4xl md:text-5xl font-bold text-[#23242b] mb-10 md:mb-20 text-center mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0" style={{fontFamily: 'Quesrial, sans-serif', textAlign: isDesktop ? 'center' : 'left'}}>
                Frequently Asked Questions
              </h2>
              <ol className="faqs-mobile-list relative border-l-4 border-[#ef5a63] pl-8" style={isDesktop ? {} : {paddingLeft: 16}}>
                {/* 1 */}
                <li className="mb-12 ml-6">
                  <div className="absolute w-6 h-6 bg-[#ef5a63] rounded-full -left-3 border-4 border-white"></div>
                  <h3 className="font-bold text-xl text-[#ef5a63] mb-2 mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0" style={{fontFamily: 'Quesrial, sans-serif', textAlign: 'left'}}>
                    Who are the teachers at Fabulinus?
                  </h3>
                  <p className="text-[#23242b] text-base mb-2" style={{fontFamily: 'Inter, sans-serif', textAlign: 'left'}}>
                    Aparna Sinha, a bestselling author, is supported by highly qualified, English language and communication experts
                  </p>
                </li>
                {/* 2 */}
                <li className="mb-12 ml-6">
                  <div className="absolute w-6 h-6 bg-[#ef5a63] rounded-full -left-3 border-4 border-white"></div>
                  <h3 className="font-bold text-xl text-[#ef5a63] mb-2 mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0" style={{fontFamily: 'Quesrial, sans-serif', textAlign: 'left'}}>
                    What is the GREAT Approach?
                  </h3>
                  <p className="text-[#23242b] text-base mb-2" style={{fontFamily: 'Inter, sans-serif', textAlign: 'left'}}>
                    The GREAT Approach is our unique and structured methodology, built on five pillars: Grading, Regular Monitoring, Experts, Accessibility, and Transparency. It is designed to ensure measurable improvement in communication and public speaking skills.
                  </p>
                </li>
                {/* 3 */}
                <li className="mb-12 ml-6">
                  <div className="absolute w-6 h-6 bg-[#ef5a63] rounded-full -left-3 border-4 border-white"></div>
                  <h3 className="font-bold text-xl text-[#ef5a63] mb-2 mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0" style={{fontFamily: 'Quesrial, sans-serif', textAlign: 'left'}}>
                    How are classes conducted?
                  </h3>
                  <p className="text-[#23242b] text-base mb-2" style={{fontFamily: 'Inter, sans-serif', textAlign: 'left'}}>
                    Classes are delivered one-on-one in an online format, offering personalized attention and flexible scheduling. You can book sessions at your convenience and access learning resources anytime.
                  </p>
                </li>
                {/* 4 */}
                <li className="mb-12 ml-6">
                  <div className="absolute w-6 h-6 bg-[#ef5a63] rounded-full -left-3 border-4 border-white"></div>
                  <h3 className="font-bold text-xl text-[#ef5a63] mb-2 mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0" style={{fontFamily: 'Quesrial, sans-serif', textAlign: 'left'}}>
                    What age groups do you cater to?
                  </h3>
                  <p className="text-[#23242b] text-base mb-2" style={{fontFamily: 'Inter, sans-serif', textAlign: 'left'}}>
                    We offer programs for all age groups—including young learners, students, working professionals, and anyone aiming to enhance their English and communication abilities.
                  </p>
                </li>
                {/* 5 */}
                <li className="mb-12 ml-6">
                  <div className="absolute w-6 h-6 bg-[#ef5a63] rounded-full -left-3 border-4 border-white"></div>
                  <h3 className="font-bold text-xl text-[#ef5a63] mb-2 mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0" style={{fontFamily: 'Quesrial, sans-serif', textAlign: 'left'}}>
                    How do I track my progress?
                  </h3>
                  <p className="text-[#23242b] text-base mb-2" style={{fontFamily: 'Inter, sans-serif', textAlign: 'left'}}>
                    You will receive regular feedback, detailed progress reports, and clear learning benchmarks after each session. Our transparent system ensures you stay informed and on track throughout your learning journey.
                  </p>
                </li>
                {/* 6 */}
                <li className="mb-12 ml-6">
                  <div className="absolute w-6 h-6 bg-[#ef5a63] rounded-full -left-3 border-4 border-white"></div>
                  <h3 className="font-bold text-xl text-[#ef5a63] mb-2 mx-4 my-2 px-2 py-2 md:mx-0 md:my-0 md:px-0 md:py-0" style={{fontFamily: 'Quesrial, sans-serif', textAlign: 'left'}}>
                    How do I get appointment with Aparna Mam?
                  </h3>
                  <p className="text-[#23242b] text-base mb-2" style={{fontFamily: 'Inter, sans-serif', textAlign: 'left'}}>
                    Click the "Explore Courses" button anywhere on the site, fill in your details, and our team will contact you to schedule your session with Aparna Mam!
                  </p>
                </li>
              </ol>
              {/* Main CTA Buttons */}
              <div className="w-full flex flex-col items-center mt-10">
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl mb-8 justify-center explore-courses-overlap-mobile">
                  <Link
                    href="/persona?cta=courses"
                    className="font-bold rounded-full px-8 py-4 text-lg md:text-xl uppercase tracking-wide border-2 border-[#ef5a63] text-white bg-[#ef5a63] shadow-lg hover:bg-[#e04a54] transition-all duration-200 text-center min-w-[200px] whitespace-nowrap mx-auto hero-cta-mobile"
                    style={{
                      fontFamily: 'Sora, sans-serif',
                      boxShadow: '0 4px 16px 0 rgba(239,90,99,0.12)',
                      letterSpacing: '0.03em',
                      marginBottom: 0,
                      display: 'block',
                      padding: '18px 32px', // default desktop/tablet
                      position: 'relative',
                    }}
                  >
                    EXPLORE COURSES
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          #teachers {
            background: #fff !important;
            border-radius: 0 !important;
            min-height: calc(100% + 30px) !important;
          }
          .mobile-section-divider {
            display: block;
            border: none;
            border-top: 0.5px solid #ef5a63;
            width: 25vw;
            margin: 18px auto 8px auto;
            background: none;
            height: 0;
          }
          .mobile-section-divider-between {
            display: block;
            border: none;
            border-top: 0.5px solid #ef5a63;
            width: 25vw;
            margin: 18px auto 8px auto;
            background: none;
            height: 0;
          }
          .mobile-section-divider-testimony {
            display: block;
            border: none;
            border-top: 0.5px solid #ef5a63;
            width: 25vw;
            margin: 18px auto 8px auto;
            background: none;
            height: 0;
          }
          .mobile-section-divider-faq {
            display: block;
            border: none;
            border-top: 0.5px solid #ef5a63;
            width: 25vw;
            margin: 36px auto 36px auto; /* increased gap above and below divider */
            background: none;
            height: 0;
          }
          .great-card-alpha-mobile {
            font-size: 2.5em !important;
            color: #ef5a63 !important;
            font-weight: 900 !important;
            line-height: 1 !important;
            margin-right: 12px !important;
            margin-left: 2px !important;
            letter-spacing: 0.04em !important;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            min-width: 1.5em;
            text-align: left !important;
          }
          /* Add extra gap above FAQ section for mobile */
          #faqs {
            margin-top: 36px !important;
            padding-top: 0 !important;
          }
        }
        @media (min-width: 641px) {
          .mobile-section-divider,
          .mobile-section-divider-between,
          .mobile-section-divider-testimony,
          .mobile-section-divider-faq {
            display: none;
          }
        }
        @media (max-width: 640px) {
          #teachers {
            background: #fff !important;
            border-radius: 0 !important;
          }
          .hero-cta-mobile {
            background: #fff !important;
            color: #ef5a63 !important;
            border: 2px solid #ef5a63 !important;
            border-radius: 0 !important; /* no rounded edges */
            font-weight: 700 !important;
            font-size: 1.25rem !important;
            padding: 18px 0 !important;
            width: 80vw !important;
            min-width: 0 !important;
            max-width: 95vw !important;
            margin-left: auto !important;
            margin-right: auto !important;
            box-shadow: 0 4px 16px 0 rgba(239,90,99,0.12) !important;
            text-transform: uppercase !important;
            letter-spacing: 0.03em !important;
            display: block !important;
            transition: box-shadow 0.2s, background 0.2s;
          }
          .hero-cta-mobile:active {
            box-shadow: 0 1px 6px 0 rgba(239,90,99,0.13) !important;
            background: #fff0f2 !important;
            color: #ef5a63 !important;
          }
          .hero-cta-desktop {
            background: #fff !important;
            color: #ef5a63 !important;
            border: 2px solid #ef5a63 !important;
            border-radius: 9999px !important; /* pill shape */
            font-weight: 700 !important;
            font-size: 1.25rem !important;
            padding: 18px 0 !important;
            width: 80vw !important; /* decrease width for mobile */
            min-width: 0 !important;
            max-width: 320px !important; /* decrease max width for pill */
            margin-left: -22px !important; /* shift left by 22px total */
            margin-right: 0 !important;
            margin-top: 1px !important; /* move down by 1px */
            box-shadow: 0 4px 16px 0 rgba(239,90,99,0.12) !important;
            text-transform: uppercase !important;
            letter-spacing: 0.03em !important;
            display: block !important;
            text-align: center !important; /* center align text inside button */
            transition: box-shadow 0.2s, background 0.2s;
          }
          .hero-cta-desktop:active {
            box-shadow: 0 1px 6px 0 rgba(239,90,99,0.13) !important;
            background: #fff0f2 !important;
            color: #ef5a63 !important;
          }
        }
      `}</style>
      <style jsx global>{`
        @media (max-width: 767px) {
          .explore-courses-mobile-gap-adjust {
            margin-top: -15px !important;
          }
        }
      `}</style>
      <style jsx global>{`
        @media (max-width: 640px) {
          .faqs-mobile-clean {
            background: #fff !important;
            border-radius: 18px !important;
            box-shadow: 0 2px 16px 0 rgba(44,62,80,0.04) !important;
            padding-top: 32px !important;
            padding-bottom: 32px !important;
            min-height: 90vh !important;
          }
          .faqs-mobile-inner {
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 100% !important;
            align-items: flex-start !important;
          }
          .faqs-mobile-list {
            border-left: 4px solid #ef5a63 !important;
            padding-left: 18px !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            width: 100% !important;
          }
          .faqs-mobile-list > li {
            margin-bottom: 32px !important;
            margin-left: 0 !important;
            padding-left: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100% !important;
          }
          .faqs-mobile-list h3 {
            font-size: 1.15rem !important;
            font-weight: 700 !important;
            color: #ef5a63 !important;
            margin-bottom: 6px !important;
            margin-top: 0 !important;
            padding: 0 !important;
            text-align: left !important;
            line-height: 1.3 !important;
            letter-spacing: 0.01em !important;
          }
          .faqs-mobile-list p {
            font-size: 1rem !important;
            color: #23242b !important;
            margin: 0 0 0 0 !important;
            padding: 0 !important;
            text-align: left !important;
            line-height: 1.6 !important;
            letter-spacing: 0.01em !important;
          }
          .faqs-mobile-list .absolute {
            left: -18px !important;
            top: 0 !important;
            z-index: 2 !important;
            background: #fff !important;
            border: 4px solid #ef5a63 !important;
            box-shadow: 0 2px 8px 0 rgba(44,62,80,0.06);
          }
          .faqs-mobile-list .absolute > div {
            background: #ef5a63 !important;
            border-radius: 50% !important;
            width: 24px !important;
            height: 24px !important;
            border: 4px solid #fff !important;
            box-shadow: 0 2px 8px 0 rgba(44,62,80,0.06);
          }
        }
      `}</style>
    </main>
  );
}