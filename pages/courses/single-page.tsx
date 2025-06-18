import { useEffect, useState } from 'react';
import { COURSE_LOGIC } from '../../components/courseLogic';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function SinglePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        // Always use localStorage for local development
        const localForm = typeof window !== 'undefined' ? localStorage.getItem('personaFormData') : null;
        const personaType = typeof window !== 'undefined' ? localStorage.getItem('personaType') : null;
        let data = null;
        if (localForm) {
          data = { formData: JSON.parse(localForm), persona: personaType };
        }
        if (!data) {
          localStorage.removeItem('journeyId');
          setError('Your journey has expired or was not found. Please start again.');
          setLoading(false);
          return;
        }
        // Normalize persona and course type
        let persona = 'Others';
        let typeOfCourse = 'Long Term';
        if (data.persona === 'parent' || data.persona === 'Parents') persona = 'Parents';
        else persona = 'Others';
        // Course type mapping
        if (persona === 'Parents') {
          // Parent form: typeOfCourse is in formData
          typeOfCourse = data.formData.typeOfCourse === 'short-term' ? 'Short Term' : 'Long Term';
        } else {
          typeOfCourse = data.formData.typeOfCourse === 'short-term' ? 'Short Term' : 'Long Term';
        }
        // Find the course in COURSE_LOGIC
        const foundCourse = COURSE_LOGIC.find(
          c => c.targetAudience === persona && c.courseType === typeOfCourse
        );
        // If multiple courses match, pick the one with the correct programName for long term
        let selectedCourse = foundCourse;
        if (persona === 'Parents' && typeOfCourse === 'Long Term') {
          // Prefer programName containing 'Advanced' for long term parent
          const advanced = COURSE_LOGIC.find(c => c.targetAudience === 'Parents' && c.courseType === 'Long Term' && c.programName.toLowerCase().includes('advanced'));
          if (advanced) selectedCourse = advanced;
        }
        if (!selectedCourse) {
          setError('No course found for your selection.');
          setLoading(false);
          return;
        }
        setCourse(selectedCourse);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while loading your journey.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // CTA form state
  const [showThankYou, setShowThankYou] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', datetime: '' });
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-2 font-sans bg-white rounded-[2.5rem] shadow-lg">
        <div className="text-center text-xl text-[#ef5a63] font-bold">Loading your journey...</div>
      </main>
    );
  }
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-2 font-sans bg-white rounded-[2.5rem] shadow-lg">
        <div className="text-center text-xl text-[#ef5a63] font-bold">{error}</div>
      </main>
    );
  }
  if (!course) {
    return null;
  }

  return (
    <>
      {/* Mobile header, same as index page */}
      <div className="block md:hidden" style={{ width: '100%', background: '#fff', boxShadow: '0 1px 6px 0 rgba(37,99,235,0.06)', borderRadius: '0.7em', margin: '0 0 1.2em 0', padding: '0.7em 0.5em', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'fixed', top: 0, left: 0, zIndex: 999, height: 52 }}>
        <a href="/" aria-label="Fabulinus Home" style={{ display: 'flex', alignItems: 'center', marginRight: '1.2em' }}>
          <img src="/Fabulinus_logo.svg" alt="Fabulinus Logo" style={{ height: 32, width: 'auto', maxHeight: 32, display: 'inline-block', verticalAlign: 'middle' }} />
        </a>
        <nav style={{ display: 'flex', gap: '1.1em', alignItems: 'center', justifyContent: 'flex-start', width: 'auto' }}>
          <a href="/" style={{ color: '#23242b', fontWeight: 700, fontSize: '1.08em', textDecoration: 'none', padding: '0.2em 0.7em', borderRadius: '0.5em', background: 'none', transition: 'none' }}>Home</a>
        </nav>
      </div>
      <main
        className="min-h-screen flex items-start justify-center px-2 font-sans bg-white rounded-[2.5rem] shadow-lg"
        style={{ marginTop: '0', paddingTop: '72px' }}
      >
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between mx-auto py-14 md:py-20 px-4 md:px-16 gap-10 mt-0 move-up-mobile-cards mobile-move-up-20 course-content-mobile-moveup course-content-mobile-moveup-30 mobile-move-up-30px">
          {/* Left: Headline, Description, Labels */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full z-10 text-left mx-auto space-y-5">
            {/* Mobile-only: Small clean switch button between course name and header */}
            <div className="block md:hidden w-full mb-2" style={{ paddingTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', marginTop: '-10px' }}>
                <button
                  className={`px-3 py-1 rounded-full font-semibold border text-sm transition-colors duration-150 ${course.courseType === 'Long Term' ? 'bg-[#ef5a63] text-white border-[#ef5a63]' : 'bg-[#e5e7eb] text-[#23242b] border-[#e5e7eb]'}`}
                  style={{ minWidth: 110, fontWeight: 700, outline: 'none' }}
                  onClick={() => {
                    const newCourse = COURSE_LOGIC.find(c => c.targetAudience === course.targetAudience && c.courseType === 'Long Term');
                    if (newCourse) setCourse(newCourse);
                  }}
                  aria-pressed={course.courseType === 'Long Term'}
                >
                  Long Term
                </button>
                <button
                  className={`px-3 py-1 rounded-full font-semibold border text-sm transition-colors duration-150 ${course.courseType === 'Short Term' ? 'bg-[#ef5a63] text-white border-[#ef5a63]' : 'bg-[#e5e7eb] text-[#23242b] border-[#e5e7eb]'}`}
                  style={{ minWidth: 110, fontWeight: 700, outline: 'none' }}
                  onClick={() => {
                    const newCourse = COURSE_LOGIC.find(c => c.targetAudience === course.targetAudience && c.courseType === 'Short Term');
                    if (newCourse) setCourse(newCourse);
                  }}
                  aria-pressed={course.courseType === 'Short Term'}
                >
                  Short Term
                </button>
              </div>
            </div>
            {/* Heading and bullets alignment wrapper */}
            <div className="flex flex-col items-start w-full md:w-[140%] max-w-3xl md:max-w-[140%]" style={{ width: '100%' }}>
              {/* Flipper between Long Term and Short Term */}
              <div className="hidden md:flex flex-row items-center gap-3 mb-4 md:w-[140%]">
                <button
                  className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-150 text-base md:text-lg ${course.courseType === 'Long Term' ? 'bg-[#ef5a63] text-white border-[#ef5a63]' : 'bg-white text-[#ef5a63] border-[#ef5a63]'}`}
                  onClick={() => {
                    const newCourse = COURSE_LOGIC.find(c => c.targetAudience === course.targetAudience && c.courseType === 'Long Term');
                    if (newCourse) setCourse(newCourse);
                  }}
                  aria-pressed={course.courseType === 'Long Term'}
                >
                  Long Term
                </button>
                <button
                  className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-150 text-base md:text-lg ${course.courseType === 'Short Term' ? 'bg-[#ef5a63] text-white border-[#ef5a63]' : 'bg-white text-[#ef5a63] border-[#ef5a63]'}`}
                  onClick={() => {
                    const newCourse = COURSE_LOGIC.find(c => c.targetAudience === course.targetAudience && c.courseType === 'Short Term');
                    if (newCourse) setCourse(newCourse);
                  }}
                  aria-pressed={course.courseType === 'Short Term'}
                >
                  Short Term
                </button>
              </div>
              <h1
                className="font-extrabold text-4xl md:text-6xl leading-tight mb-2 text-[#ef5a63] tracking-tight text-left min-h-[3.8rem] md:min-h-[5.2rem] flex items-end md:w-[180%] course-name-mobile-moveup"
                style={{ fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '-0.03em', maxWidth: '180%' }}
              >
                {course.programName}
              </h1>
              <p className="text-base md:text-xl text-[#23242b] font-normal mb-4 max-w-2xl md:max-w-[110%] opacity-90 leading-snug heading-align program-desc-mobile-gap" style={{ fontFamily: 'Questrial, Inter, sans-serif' }}>
                {course.mainLine}
              </p>
              {/* Bullets, Early Bird, CTA, etc. */}
              <ul className="mb-4 list-none flex flex-col gap-4 horizontal-bullets w-full">
                {course.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="relative w-full min-h-[2.5rem] md:min-h-[3.2rem] flex items-center"
                  >
                    {/* Number circle absolutely positioned */}
                    <span
                      className="flex-shrink-0 flex items-center justify-center font-bold text-[#ef5a63] rounded-full shadow w-8 h-8 md:w-10 md:h-10"
                      style={{
                        background: '#fffbe0',
                        fontSize: '1.1rem',
                        boxShadow: '0 2px 8px 0 rgba(239,90,99,0.08)',
                        textAlign: 'center',
                      }}
                    >
                      {idx + 1}
                    </span>
                    {/* Bullet text, now vertically centered with the number */}
                    <span
                      className="block font-normal text-[#23242b] bullet-text-align pl-4 md:pl-5"
                      style={{ fontSize: '1rem', lineHeight: 1.5, textAlign: 'left' }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
                {/* Early Bird Offer and CTA only for desktop */}
                {/* Remove Early Bird Offer from mobile completely by rendering only on md and up */}
                {typeof window !== 'undefined' && window.innerWidth >= 768 && (
                  <li className="flex items-center gap-2 text-sm md:text-base text-[#23242b] font-normal mt-2" style={{fontFamily: 'Questrial, Inter, sans-serif'}}>
                    <span className="flex items-center mr-2" style={{fontWeight: 600, color: '#ef5a63', fontSize: '1rem', letterSpacing: '0.01em'}}>
                      {/* Offer tag icon */}
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{marginRight: 6, minWidth: 16}}><path d="M20.59 13.41l-7.3 7.3a2 2 0 0 1-2.83 0l-7.3-7.3a2 2 0 0 1 0-2.83l7.3-7.3a2 2 0 0 1 2.83 0l7.3 7.3a2 2 0 0 1 0 2.83z" fill="#ef5a63"/><text x="6.5" y="13.5" fontSize="7" fontWeight="bold" fill="#fff">%</text></svg>
                      Early Bird Offer
                    </span>
                    <span className="flex flex-row items-start gap-2">
                      <span className="flex flex-col leading-tight" style={{lineHeight: 1.1}}>
                        <span className="font-normal text-lg md:text-xl" style={{color: '#23242b'}}>
                          ₹{course.offerPrice.toLocaleString()}
                        </span>
                        <span className="line-through text-[#7b8a99] font-normal text-base" style={{marginTop: '-2px'}}>
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                      </span>
                      <span className="flex flex-col items-start" style={{alignItems: 'flex-start'}}>
                        <span className="text-[#ef5a63] text-xs font-bold" style={{background: 'none', border: 'none', padding: 0}}>{Math.round(100 - (course.offerPrice / course.originalPrice) * 100)}% OFF</span>
                        <span className="flex items-center gap-1 mt-0" style={{background: 'none', border: 'none', padding: 0}}>
                          <svg width="15" height="15" fill="none" viewBox="0 0 20 20"><rect x="2.5" y="5.5" width="15" height="9" rx="2" fill="#ef5a63"/><rect x="4.5" y="7.5" width="11" height="5" rx="1" fill="#fffbe0"/><rect x="7.5" y="10" width="5" height="1" rx="0.5" fill="#ef5a63"/></svg>
                          <span className="text-[#ef5a63] text-xs font-medium">EMIs Available</span>
                        </span>
                        <span className="text-[#7b8a99] text-xs mt-1 whitespace-nowrap" style={{marginLeft: 0}}>Ends 30 June</span>
                      </span>
                    </span>
                  </li>
                )}
              </ul>
            </div>
            {/* Add 10px space before CTA */}
            <div className="hidden md:block" style={{ height: 4 }} />
            <div className="hidden md:flex w-full flex-col items-start">
              <span className="text-base text-[#23242b] font-medium mb-2" style={{ fontFamily: 'Questrial, Inter, sans-serif' }}>
                To know more about the course and outcomes
              </span>
              <div className="flex justify-start w-full">
                <button
                  className="bg-[#ef5a63] hover:bg-[#e04a54] text-white font-normal rounded-full px-8 py-3 text-base md:text-xl shadow-lg transition-all duration-200 scale-100 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffe066] border-2 border-[#ffe06622] whitespace-nowrap min-w-[320px] max-w-full"
                  style={{ fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '0.04em' }}
                  onClick={() => router.push('/courses/book-appointment')}
                  aria-label="Book Appointment with Aparna Mam"
                >
                  Book Appointment with Aparna Mam
                </button>
              </div>
            </div>
          </div>
          {/* Right: Image, Info grid, etc. */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg z-10 mx-auto md:ml-[10px] md:mt-[50px] mobile-move-up-40px">
            <div className="flex flex-col items-center w-full mb-4 scale-95 md:scale-100" style={{ maxWidth: '420px' }}>
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#ffe066] shadow-[0_4px_32px_0_rgba(239,90,99,0.10)] overflow-hidden mb-1 flex-shrink-0 self-center aparna-img-mobile-wrapper" style={{ background: 'radial-gradient(circle at 60% 30%, #fffbe0 70%, #ffe066 100%)' }}>
                <img
                  src="/Aparna.png"
                  alt="Aparna Mam"
                  className="object-cover w-full h-full transform -scale-x-100 transition-transform duration-500 aparna-img-mobile"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className="live-classes-row mb-2 animate-fade-in-up flex items-center justify-center w-full mobile-live-row">
                <span className="mobile-live-icon flex items-center justify-center" style={{ width: 32, minWidth: 32, maxWidth: 32, height: 32 }}>
                  {/* Red alert icon (exclamation in triangle) */}
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                    <path d="M10 3L2 17h16L10 3z" fill="#ef5a63"/>
                    <rect x="9.1" y="7.5" width="1.8" height="5.2" rx="0.9" fill="#fff"/>
                    <rect x="9.1" y="14" width="1.8" height="1.8" rx="0.9" fill="#fff"/>
                  </svg>
                </span>
                <span className="live-text flex-1 text-[#ef5a63] font-medium text-base md:text-lg flex items-center justify-center text-center" style={{ fontFamily: 'Questrial, Inter, sans-serif', height: 32 }}>
                  Live Classes by Aparna Mam!
                </span>
                <span className="mobile-live-icon flex items-center justify-center" style={{ width: 32, minWidth: 32, maxWidth: 32, height: 32 }}>
                  {/* Red alert icon (exclamation in triangle) at end */}
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                    <path d="M10 3L2 17h16L10 3z" fill="#ef5a63"/>
                    <rect x="9.1" y="7.5" width="1.8" height="5.2" rx="0.9" fill="#fff"/>
                    <rect x="9.1" y="14" width="1.8" height="1.8" rx="0.9" fill="#fff"/>
                  </svg>
                </span>
              </div>
              {/* Refactored Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto mt-1 info-card-mobile-grid">
                {/* Info Card */}
                {/* Live 1-on-1 */}
                <div className="info-card-mobile flex flex-col items-center justify-center bg-white rounded-xl border border-[#ef5a63]">
                  <span className="inline-flex items-center justify-center w-12 h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow mb-2">
                    <svg width="32" height="32" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="4"/><circle cx="18" cy="24" r="3"/><path d="M30 21h4v6h-4z"/><path d="M12 34h24"/></svg>
                  </span>
                  <div className="text-sm font-medium text-[#ef5a63] mb-0.5">Live 1-on-1</div>
                  <div className="text-lg font-semibold text-[#23242b]">{course.live1on1} Sessions</div>
                  <div className="text-xs text-[#23242b] mt-1">15 min each | 1/week</div>
                </div>
                {/* Live Batch */}
                <div className="info-card-mobile flex flex-col items-center justify-center bg-white rounded-xl border border-[#ef5a63]">
                  <span className="inline-flex items-center justify-center w-12 h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow mb-2">
                    <svg width="32" height="32" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="4"/><circle cx="16" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="32" cy="24" r="3"/><path d="M12 34h24"/></svg>
                  </span>
                  <div className="text-sm font-medium text-[#ef5a63] mb-0.5">Live Batch</div>
                  <div className="text-lg font-semibold text-[#23242b]">{course.liveBatch} Sessions</div>
                  <div className="text-xs text-[#23242b] mt-1">45 min each | 1/week</div>
                </div>
                {/* Duration */}
                <div className="info-card-mobile duration-mobile flex flex-col items-center justify-center bg-white rounded-xl border border-[#ef5a63]">
                  <div className="flex flex-col justify-center items-center h-full w-full">
                    <span className="inline-flex items-center justify-center w-12 h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow mb-2">
                      <svg width="32" height="32" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="7" y="10" width="34" height="31" rx="4"/><path d="M7 18h34M33 6v8M15 6v8M24 24v7h7"/><circle cx="24" cy="28" r="1.5"/></svg>
                    </span>
                    <div className="text-sm font-medium text-[#ef5a63] mb-0.5 text-center">Duration</div>
                    <div className="text-lg font-semibold text-[#23242b] text-center">{course.duration} weeks</div>
                  </div>
                </div>
                {/* Batch Size */}
                <div className="info-card-mobile batchsize-mobile flex flex-col items-center justify-center bg-white rounded-xl border border-[#ef5a63]">
                  <div className="flex flex-col justify-center items-center h-full w-full">
                    <span className="inline-flex items-center justify-center w-12 h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow mb-2">
                      <svg width="32" height="32" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48">
                        <circle cx="12" cy="20" r="4.5"/>
                        <circle cx="24" cy="20" r="4.5"/>
                        <circle cx="36" cy="20" r="4.5"/>
                        <path d="M6 34c0-3 4.5-6 10-6s10 3 10 6"/>
                        <path d="M22 34c0-2 3-4 6-4s6 2 6 4"/>
                      </svg>
                    </span>
                    <div className="text-sm font-medium text-[#ef5a63] mb-0.5 text-center">Batch Size</div>
                    <div className="text-lg font-semibold text-[#23242b] text-center">{course.batchSize} Students</div>
                  </div>
                </div>
                {/* Mobile-only info line: 5px below Batch Size */}
                <div className="block md:hidden w-full flex items-center justify-center info-line-below-batchsize-mobile" >
                  <span style={{ fontFamily: 'Questrial, Inter, sans-serif', fontWeight: 500, fontSize: '1.08rem', color: '#ef5a63', display: 'flex', alignItems: 'center', gap: '0.4em' }}>
                    To know more, talk
                    <svg style={{ display: 'inline', margin: '0 0.2em', verticalAlign: 'middle' }} width="20" height="20" fill="none" stroke="#ef5a63" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    to Aparna Mam!
                  </span>
                </div>
                {/* Mobile-only CTA button 5px below info line */}
                <div className="block md:hidden w-full flex items-center justify-center mobile-cta-below-info" style={{ marginTop: 5 }}>
                  <button
                    className="bg-[#ef5a63] hover:bg-[#e04a54] text-white font-bold rounded-full px-8 py-3 text-base shadow transition-all duration-200 border-2 border-[#ffe06622]"
                    style={{ fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '0.04em', width: '90%', maxWidth: 340 }}
                    onClick={() => window.location.href = '/courses/book-appointment'}
                    aria-label="Book Appointment with Aparna Mam"
                  >
                    Book Appointment with Aparna Mam
                  </button>
                </div>
                {/* Mobile-only Early Bird Offer block, improved formatting for mobile readability */}
                <div className="block md:hidden w-full flex items-center justify-center mobile-earlybird-offer-row" style={{ marginTop: 6, marginBottom: 0 }}>
                  <div className="earlybird-offer-mobile-modern flex flex-row items-center justify-between w-full px-3 py-3 rounded-xl bg-[#fffbe0] border border-[#ffe066] shadow-md"
                    style={{ maxWidth: 420, minHeight: 0, borderRadius: '1em', padding: '13px 13px 10px 13px', gap: 0 }}>
                    {/* Offer icon and label */}
                    <span className="flex items-center gap-2 mr-3">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{marginRight: 4, minWidth: 18}}><path d="M20.59 13.41l-7.3 7.3a2 2 0 0 1-2.83 0l-7.3-7.3a2 2 0 0 1 0-2.83l7.3-7.3a2 2 0 0 1 2.83 0l7.3 7.3a2 2 0 0 1 0 2.83z" fill="#ef5a63"/><text x="6.5" y="13.5" fontSize="8" fontWeight="bold" fill="#fff">%</text></svg>
                      <span className="font-bold text-[#ef5a63] text-lg" style={{whiteSpace: 'nowrap', letterSpacing: '0.01em'}}>Early Bird Offer</span>
                    </span>
                    {/* Price, discount, EMI, end date compacted */}
                    <span className="flex flex-col items-end min-w-[120px] gap-1">
                      <span className="flex items-baseline gap-2">
                        <span className="text-[#23242b] font-extrabold text-xl" style={{fontFamily: 'Questrial, Inter, sans-serif'}}>
                          ₹{course.offerPrice.toLocaleString()}
                        </span>
                        <span className="text-[#ef5a63] font-bold text-base" style={{marginLeft: 2}}>
                          {Math.round(100 - (course.offerPrice / course.originalPrice) * 100)}% OFF
                        </span>
                      </span>
                      <span className="flex items-center gap-2 mt-0.5">
                        <span className="line-through text-[#7b8a99] text-base" style={{fontWeight: 500}}>
                          ₹{course.originalPrice.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-[#ef5a63] text-sm font-medium" style={{marginLeft: 2}}>
                          <svg width="15" height="15" fill="none" viewBox="0 0 20 20"><rect x="2.5" y="5.5" width="15" height="9" rx="2" fill="#ef5a63"/><rect x="4.5" y="7.5" width="11" height="5" rx="1" fill="#fffbe0"/><rect x="7.5" y="10" width="5" height="1" rx="0.5" fill="#ef5a63"/></svg>
                          EMIs
                        </span>
                        <span className="text-[#7b8a99] text-xs ml-1" style={{fontWeight: 500}}>Ends 30 June</span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile-only: Set fixed height for mobile only */}
        <style>{`
          @media (max-width: 767px) {
            /* Mobile: Remove fixed height and overflow from info-card-mobile-grid, add padding-bottom for fixed bar */
            .info-card-mobile-grid {
              display: flex !important;
              flex-direction: column !important;
              gap: 12px !important;
              /* Remove height, max-height, min-height, overflow-y */
              padding-bottom: 120px !important; /* Ensure all cards are visible above fixed bottom bar */
              margin-bottom: 0 !important;
            }
            .info-card-mobile {
              min-height: 90px !important;
              height: 22vh !important;
              max-height: 24vh !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
              margin: 0 !important;
              box-sizing: border-box !important;
              padding: 10px 0 !important;
            }
            .info-card-mobile.duration-mobile,
            .info-card-mobile.batchsize-mobile {
              height: 14.7vh !important;
              min-height: 0 !important;
              max-height: none !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
              padding: 0 !important;
              border: 1px solid #ef5a63 !important;
              border-radius: 1rem !important;
              box-shadow: none !important;
              background: #fff !important;
            }
            .info-card-mobile.duration-mobile > div,
            .info-card-mobile.batchsize-mobile > div {
              flex: 1 1 0%;
              display: flex;
              flex-direction: column;
              justify-content: center !important;
              align-items: center !important;
              height: 100%;
              width: 100%;
              gap: 0 !important;
            }
            .info-card-mobile.duration-mobile > div > span,
            .info-card-mobile.batchsize-mobile > div > span,
            .info-card-mobile.duration-mobile > div > div,
            .info-card-mobile.batchsize-mobile > div > div {
              margin-top: auto !important;
              margin-bottom: auto !important;
            }
            /* Make the text inside the four info card labels/boxes larger and proportional for mobile */
            .info-card-mobile .text-sm {
              font-size: 1.25rem !important; /* 20px */
              line-height: 1.3 !important;
            }
            .info-card-mobile .text-lg {
              font-size: 1.45rem !important; /* 23px */
              line-height: 1.25 !important;
            }
            .info-card-mobile .text-xs {
              font-size: 1.08rem !important; /* 17px */
              line-height: 1.2 !important;
            }
            /* Move the mobile fixed bottom bar further down */
            .mobile-fixed-bottom-bar {
              /* bottom: -500px !important; */
            }
          }
        `}</style>
        <style>{`
          @media (min-width: 768px) {
            .bullet-text-align {
              text-align: left !important;
              justify-content: flex-start !important;
              align-items: flex-start !important;
            }
            .heading-align {
              text-align: left !important;
            }
          }
        `}</style>
        <style>{`
          @media (max-width: 767px) {
            /* Mobile: Remove fixed height and overflow from info-card-mobile-grid, add padding-bottom for fixed bar */
            .info-card-mobile-grid {
              display: flex !important;
              flex-direction: column !important;
              gap: 12px !important;
              /* Remove height, max-height, min-height, overflow-y */
              padding-bottom: 120px !important; /* Ensure all cards are visible above fixed bottom bar */
              margin-bottom: 0 !important;
            }
            .info-card-mobile {
              min-height: 90px !important;
              height: 22vh !important;
              max-height: 24vh !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
              margin: 0 !important;
              box-sizing: border-box !important;
              padding: 10px 0 !important;
            }
            .info-card-mobile.duration-mobile,
            .info-card-mobile.batchsize-mobile {
              height: 14.7vh !important;
              min-height: 0 !important;
              max-height: none !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
              text-align: center !important;
              padding: 0 !important;
              border: 1px solid #ef5a63 !important;
              border-radius: 1rem !important;
              box-shadow: none !important;
              background: #fff !important;
            }
            .info-card-mobile.duration-mobile > div,
            .info-card-mobile.batchsize-mobile > div {
              flex: 1 1 0%;
              display: flex;
              flex-direction: column;
              justify-content: center !important;
              align-items: center !important;
              height: 100%;
              width: 100%;
              gap: 0 !important;
            }
            .info-card-mobile.duration-mobile > div > span,
            .info-card-mobile.batchsize-mobile > div > span,
            .info-card-mobile.duration-mobile > div > div,
            .info-card-mobile.batchsize-mobile > div > div {
              margin-top: auto !important;
              margin-bottom: auto !important;
            }
            /* Make the text inside the four info card labels/boxes larger and proportional for mobile */
            .info-card-mobile .text-sm {
              font-size: 1.25rem !important; /* 20px */
              line-height: 1.3 !important;
            }
            .info-card-mobile .text-lg {
              font-size: 1.45rem !important; /* 23px */
              line-height: 1.25 !important;
            }
            .info-card-mobile .text-xs {
              font-size: 1.08rem !important; /* 17px */
              line-height: 1.2 !important;
            }
            /* Move the mobile fixed bottom bar further down */
            .mobile-fixed-bottom-bar {
              /* bottom: -500px !important; */
            }
          }
        `}</style>
        <style>{`
          @media (max-width: 767px) {
            /* Move the info text above CTA up by 40px on mobile */
            .mobile-info-text-moveup {
              position: relative;
              top: -40px;
            }
          }
        `}</style>
        <style>{`
          @media (max-width: 767px) {
            .mobile-move-up-20 {
              position: relative;
              top: -55px;
            }
            .aparna-img-mobile-wrapper {
              width: 232px !important;
              height: 232px !important;
              max-width: 95vw !important;
              max-height: 95vw !important;
            }
            .course-content-mobile-moveup {
              position: relative;
              top: -85px;
            }
            /* Move all content below the header (including mainLine, bullets, info, and fixed bottom) up by -50px for mobile only */
            .course-content-mobile-moveup-30 {
              position: relative;
              top: -50px;
            }
          }
        `}</style>
        <style>{`
          @media (max-width: 767px) {
            /* Move all content below the header up by 30px for mobile only */
            .mobile-move-up-30px {
              position: relative;
              top: -30px;
            }
          }
        `}</style>
        <style>{`
          @media (max-width: 640px) {
            .program-desc-mobile-gap {
              margin-top: 5px !important;
              margin-bottom: 10px !important;
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            }
            .course-name-mobile-moveup {
              margin-bottom: 0 !important;
              padding-bottom: 0 !important;
            }
          }
        `}</style>
        <style>{`
          @media (max-width: 640px) {
            .info-line-below-batchsize-mobile {
              margin-top: 5px !important;
            }
            .mobile-cta-below-info {
              margin-top: 5px !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}
