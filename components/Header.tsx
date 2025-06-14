import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  // Dropdown open states
  const [joinOpen, setJoinOpen] = useState(false);
  const [fabTestOpen, setFabTestOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);

  // Add close timeouts for better UX
  const joinTimeout = useRef<NodeJS.Timeout | null>(null);
  const fabTestTimeout = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimeout = useRef<NodeJS.Timeout | null>(null);
  const coursesTimeout = useRef<NodeJS.Timeout | null>(null);
  const homeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Helper functions for hover with delay
  function handleOpen(setter: (v: boolean) => void, timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setter(true);
  }
  function handleClose(setter: (v: boolean) => void, timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) {
    timeoutRef.current = setTimeout(() => setter(false), 120);
  }

  // Add scroll state for animation
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animation values
  // SS2: logo left, nav center, button right (initial)
  // SS1: all centered and close together (scrolled)
  const logoTranslate = scrolled ? 'translateX(0)' : 'translateX(-120px)';
  const navTranslate = scrolled ? 'translateX(0)' : 'translateX(0)';
  const buttonsTranslate = scrolled ? 'translateX(0)' : 'translateX(120px)';
  const containerJustify = scrolled ? 'justify-center' : 'justify-between';

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 600);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Mobile: Logo left, Home and Courses left-aligned, no sign-in, no animation
    return (
      <header style={{ width: '100%', background: '#fff', boxShadow: '0 1px 6px 0 rgba(37,99,235,0.06)', borderRadius: '0.7em', margin: '0 0 1.2em 0', padding: '0.7em 0.5em', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
        <Link href="/" aria-label="Fabulinus Home" style={{ display: 'flex', alignItems: 'center', marginRight: '1.2em' }}>
          <img src="/Fabulinus_logo.svg" alt="Fabulinus Logo" style={{ height: 32, width: 'auto', maxHeight: 32, display: 'inline-block', verticalAlign: 'middle' }} />
        </Link>
        <nav style={{ display: 'flex', gap: '1.1em', alignItems: 'center', justifyContent: 'flex-start', width: 'auto' }}>
          <a href="/" style={{ color: '#23242b', fontWeight: 700, fontSize: '1.08em', textDecoration: 'none', padding: '0.2em 0.7em', borderRadius: '0.5em', background: 'none', transition: 'none' }}>Home</a>
          <a href="/courses" style={{ color: '#23242b', fontWeight: 700, fontSize: '1.08em', textDecoration: 'none', padding: '0.2em 0.7em', borderRadius: '0.5em', background: 'none', transition: 'none' }}>Courses</a>
        </nav>
      </header>
    );
  }

  return (
    <header
      className="w-full flex items-center fixed left-0 z-[102] bg-white transition-all duration-300"
      style={{
        minHeight: '52px',
        top: '52px',
        backgroundColor: '#fff',
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <div
        className={`flex items-center w-full max-w-5xl px-2 transition-all duration-500 ${containerJustify}`}
        style={{
          transform: 'translateX(200px)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center transition-all duration-500 mr-2"
          style={{
            transform: logoTranslate,
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <span className="text-3xl font-normal tracking-tight text-[#374151] font-sans" style={{letterSpacing: '0.01em', fontWeight: 400, fontFamily: 'Inter, sans-serif'}}>
            fabul<span className="text-[#ff5757]">in</span>us
          </span>
        </div>
        {/* Navigation */}
        <nav
          className="flex items-center gap-3 relative transition-all duration-500"
          style={{
            transform: navTranslate,
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* HOME Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleOpen(setHomeOpen, homeTimeout)}
            onMouseLeave={() => handleClose(setHomeOpen, homeTimeout)}
          >
            <button
              className="text-lg text-[#374151] font-medium hover:text-[#ff5757] transition flex items-center gap-1 focus:outline-none px-1"
              aria-haspopup="true"
              aria-expanded={homeOpen}
              onClick={() => setHomeOpen((v) => !v)}
            >
              HOME <span className="text-xs">▼</span>
            </button>
            {homeOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 min-w-[220px] bg-white rounded-2xl shadow-xl z-50 flex flex-col py-3 animate-fadeIn">
                <Link
                  href="/#why"
                  scroll={true}
                  className="header-dropdown-link whitespace-nowrap no-underline px-6 py-1.5 text-base text-[#374151] hover:bg-[#f3f4f6] hover:text-[#ff5757] font-medium rounded-xl mx-2 my-0.5 flex items-center gap-2"
                  onClick={() => setHomeOpen(false)}
                >
                  <span className="inline-block align-middle" style={{fontSize: '1rem', lineHeight: 1}}>WHY</span>
                  <span className="inline-block align-middle" style={{display: 'flex', alignItems: 'center'}}>
                    <img src="/Fabulinus_logo.svg" alt="Fabulinus Logo" className="inline-block align-middle" style={{height: '1.8em', width: 'auto', verticalAlign: 'middle', display: 'inline'}} />
                    <span className="inline-block align-middle" style={{fontSize: '1rem', lineHeight: 1, marginLeft: '-0.1em'}}>? </span>
                  </span>
                </Link>
                <Link
                  href="/#teachers"
                  scroll={true}
                  className="header-dropdown-link whitespace-nowrap no-underline px-6 py-1.5 text-base text-[#374151] hover:bg-[#f3f4f6] hover:text-[#ff5757] font-medium rounded-xl mx-2 my-0.5"
                  onClick={() => setHomeOpen(false)}
                >
                  TEACHERS
                </Link>
                <Link
                  href="/#testimonies"
                  scroll={true}
                  className="header-dropdown-link whitespace-nowrap no-underline px-6 py-1.5 text-base text-[#374151] hover:bg-[#f3f4f6] hover:text-[#ff5757] font-medium rounded-xl mx-2 my-0.5"
                  onClick={() => setHomeOpen(false)}
                >
                  TESTIMONIES
                </Link>
                <Link
                  href="/#methodology"
                  scroll={true}
                  className="header-dropdown-link whitespace-nowrap no-underline px-6 py-1.5 text-base text-[#374151] hover:bg-[#f3f4f6] hover:text-[#ff5757] font-medium rounded-xl mx-2 my-0.5"
                  onClick={() => setHomeOpen(false)}
                >
                  METHODOLOGY
                </Link>
                <Link
                  href="/#faqs"
                  scroll={true}
                  className="header-dropdown-link whitespace-nowrap no-underline px-6 py-1.5 text-base text-[#374151] hover:bg-[#f3f4f6] hover:text-[#ff5757] font-medium rounded-xl mx-2 my-0.5"
                  onClick={() => setHomeOpen(false)}
                >
                  FAQS
                </Link>
              </div>
            )}
          </div>
          {/* COURSES Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleOpen(setCoursesOpen, coursesTimeout)}
            onMouseLeave={() => handleClose(setCoursesOpen, coursesTimeout)}
          >
            <button
              className="text-lg text-[#374151] font-medium hover:text-[#ff5757] transition flex items-center gap-1 focus:outline-none px-1"
              aria-haspopup="true"
              aria-expanded={coursesOpen}
              onClick={() => setCoursesOpen((v) => !v)}
            >
              COURSES <span className="text-xs">▼</span>
            </button>
            {coursesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 min-w-[320px] bg-white rounded-2xl shadow-xl z-50 flex flex-col py-6 px-6 animate-fadeIn"
                style={{borderRadius: '24px', boxShadow: '0 8px 32px 0 rgba(44,62,80,0.10)'}}
              >
                {/* YOUNG LEARNER PROGRAM */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 mt-1">
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#ffe066',
                      fontSize: 24,
                    }}>👦</span>
                  </span>
                  <div>
                    <div className="font-bold text-[1.15rem] text-[#23242b] tracking-tight" style={{fontFamily: 'Questrial, sans-serif'}}>YOUNG LEARNER PROGRAM</div>
                    <div className="text-[#ff5757] font-semibold text-base" style={{fontFamily: 'Sora, sans-serif'}}>Age 4 - 8</div>
                    <div className="text-[#555] text-base" style={{fontFamily: 'Inter, sans-serif'}}>Level based holistic English program</div>
                  </div>
                </div>
                {/* ADVANCED ENGLISH */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 mt-1">
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#ffe066',
                      fontSize: 24,
                    }}>🎓</span>
                  </span>
                  <div>
                    <div className="font-bold text-[1.15rem] text-[#23242b] tracking-tight" style={{fontFamily: 'Questrial, sans-serif'}}>ADVANCED ENGLISH</div>
                    <div className="text-[#ff5757] font-semibold text-base" style={{fontFamily: 'Sora, sans-serif'}}>Age 9 - 14</div>
                    <div className="text-[#555] text-base" style={{fontFamily: 'Inter, sans-serif'}}>Master advanced grammar, vocabulary, and fluency</div>
                  </div>
                </div>
                {/* COMPETITIVE EDGE */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 mt-1">
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#ffe066',
                      fontSize: 24,
                    }}>🏆</span>
                  </span>
                  <div>
                    <div className="font-bold text-[1.15rem] text-[#23242b] tracking-tight" style={{fontFamily: 'Questrial, sans-serif'}}>COMPETITIVE EDGE</div>
                    <div className="text-[#ff5757] font-semibold text-base" style={{fontFamily: 'Sora, sans-serif'}}>Age 12+</div>
                    <div className="text-[#555] text-base" style={{fontFamily: 'Inter, sans-serif'}}>Excel in competitive exams and interviews</div>
                  </div>
                </div>
                {/* CORPORATE COMMUNICATION */}
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 mt-1">
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#ffe066',
                      fontSize: 24,
                    }}>💼</span>
                  </span>
                  <div>
                    <div className="font-bold text-[1.15rem] text-[#23242b] tracking-tight" style={{fontFamily: 'Questrial, sans-serif'}}>CORPORATE COMMUNICATION</div>
                    <div className="text-[#ff5757] font-semibold text-base" style={{fontFamily: 'Sora, sans-serif'}}>Age 18+</div>
                    <div className="text-[#555] text-base" style={{fontFamily: 'Inter, sans-serif'}}>Professional English for the workplace</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        {/* Buttons */}
        <div
          className="flex items-center ml-2 transition-all duration-500"
          style={{
            transform: buttonsTranslate,
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Link
            href="/signin"
            className="bg-[#f3f4f6] text-[#18181b] font-heading font-normal rounded-2xl px-4 py-2 text-lg tracking-wide text-center shadow-none border-none focus:outline-none transition-all duration-300"
            style={{
              maxHeight: '44px',
              lineHeight: '1.2',
              fontWeight: 500,
              fontSize: scrolled ? '1rem' : '1.125rem',
              paddingLeft: scrolled ? '14px' : '18px',
              paddingRight: scrolled ? '14px' : '18px',
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
