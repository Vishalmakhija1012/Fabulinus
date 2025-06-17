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
    // Mobile: Logo left, Home left-aligned, no sign-in, no animation
    return (
      <header style={{ width: '100%', background: '#fff', boxShadow: '0 1px 6px 0 rgba(37,99,235,0.06)', borderRadius: '0.7em', margin: '0 0 1.2em 0', padding: '0.7em 0.5em', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
        <Link href="/" aria-label="Fabulinus Home" style={{ display: 'flex', alignItems: 'center', marginRight: '1.2em' }}>
          <img src="/Fabulinus_logo.svg" alt="Fabulinus Logo" style={{ height: 32, width: 'auto', maxHeight: 32, display: 'inline-block', verticalAlign: 'middle' }} />
        </Link>
        <nav style={{ display: 'flex', gap: '1.1em', alignItems: 'center', justifyContent: 'flex-start', width: 'auto' }}>
          <a href="/" style={{ color: '#23242b', fontWeight: 700, fontSize: '1.08em', textDecoration: 'none', padding: '0.2em 0.7em', borderRadius: '0.5em', background: 'none', transition: 'none' }}>Home</a>
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
          {/* Home link next to logo */}
          <Link href="/" className="ml-4 text-lg text-[#374151] font-medium hover:text-[#ff5757] transition px-2 py-1 rounded-xl" style={{textDecoration: 'none'}}>Home</Link>
        </div>
        {/* Navigation */}
        <nav
          className="flex items-center gap-3 relative transition-all duration-500"
          style={{
            transform: navTranslate,
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Link href="/" className="text-lg text-[#374151] font-medium hover:text-[#ff5757] transition flex items-center gap-1 focus:outline-none px-1" style={{textDecoration: 'none'}}>Home</Link>
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
