import { useRouter } from 'next/router';
import { COURSE_LOGIC } from '../../components/courseLogic';
import React, { useState } from 'react';
import Image from 'next/image';

export default function SinglePage() {
  const router = useRouter();
  // Get query params from the URL
  const query = router.query;

  // Determine persona type and type of course
  // Parent form: preferredTime is typeOfCourse
  // Others: typeOfCourse is typeOfCourse
  let persona = '';
  let typeOfCourse = '';
  if (query.childAge !== undefined) {
    persona = 'Parents';
    typeOfCourse = query.preferredTime === 'short-term' ? 'Short Term' : 'Long Term';
  } else {
    persona = 'Others';
    typeOfCourse = query.typeOfCourse === 'short-term' ? 'Short Term' : 'Long Term';
  }

  // Find the course in COURSE_LOGIC
  let course = null;
  if (persona === 'Parents') {
    course = COURSE_LOGIC.find(
      c => c.targetAudience === 'Parents' && c.courseType === typeOfCourse
    );
  } else {
    course = COURSE_LOGIC.find(
      c => c.targetAudience === 'Others' && c.courseType === typeOfCourse
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen flex items-center justify-center px-2 font-sans bg-white rounded-[2.5rem] shadow-lg">
        <div className="text-center text-xl text-[#ef5a63] font-bold">No course found for your selection.</div>
      </main>
    );
  }

  // CTA form state
  const [showThankYou, setShowThankYou] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', datetime: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  return (
    <main
      className="min-h-screen flex items-start justify-center px-2 font-sans bg-white rounded-[2.5rem] shadow-lg"
      style={{ marginTop: '-104px' }}
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between mx-auto py-14 md:py-20 px-4 md:px-16 gap-10 mt-0 move-up-mobile">
        {/* Left: Headline, Description, Labels */}
        <div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full z-10 text-left mx-auto space-y-5">
          <h1 className="font-extrabold text-4xl md:text-6xl leading-tight mb-2 text-[#ef5a63] tracking-tight" style={{ fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '-0.03em' }}>
            {course.programName}
          </h1>
          <p className="text-xl md:text-2xl text-[#23242b] font-normal mb-4 mt-1 max-w-2xl opacity-90 leading-snug" style={{ fontFamily: 'Questrial, Inter, sans-serif' }}>
            {course.mainLine}
          </p>
          {/* Desktop: Bullets, Early Bird, CTA, etc. */}
          <ul className="mb-4 pl-0 list-none flex flex-col gap-3 horizontal-bullets">
            {course.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-base md:text-lg text-[#23242b] font-normal"
              >
                <span
                  className="flex-shrink-0 flex items-center justify-center font-semibold text-base md:text-lg text-[#ef5a63] w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#fffbe0] shadow"
                  style={{ minWidth: '1.75rem', minHeight: '1.75rem' }}
                >
                  {idx + 1}
                </span>
                <span
                  className="flex-1 break-words text-left"
                  style={{ lineHeight: 1.5 }}
                >
                  {bullet}
                </span>
              </li>
            ))}
            {/* Early Bird Offer and CTA only for desktop */}
            {/* Remove Early Bird Offer from mobile completely by rendering only on md and up */}
            {typeof window !== 'undefined' && window.innerWidth >= 768 && (
              <li className="flex items-center gap-3 text-sm md:text-base text-[#23242b] font-normal mt-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#fffbe0] border border-[#ffe066] shadow-sm">
                  <svg width="18" height="18" fill="none" stroke="#ef5a63" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.3 7.3a2 2 0 0 1-2.83 0l-7.3-7.3a2 2 0 0 1 0-2.83l7.3-7.3a2 2 0 0 1 2.83 0l7.3 7.3a2 2 0 0 1 0 2.83z"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>
                </span>
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[#ef5a63] font-semibold">Early Bird Offer:</span>
                  <span>Now <span className="text-[#ef5a63] font-bold text-lg md:text-xl">₹{course.offerPrice.toLocaleString()}</span></span>
                  <span className="line-through text-[#7b8a99] ml-1 font-normal">₹{course.originalPrice.toLocaleString()}</span>
                  <span className="bg-[#ef5a63] text-white text-xs font-bold rounded px-2 py-0.5 ml-1 shadow">{Math.round(100 - (course.offerPrice / course.originalPrice) * 100)}% OFF</span>
                  <span className="text-[#7b8a99] text-sm ml-1">Ends 15 June</span>
                </span>
              </li>
            )}
          </ul>
          {/* Add 10px space before CTA */}
          <div className="hidden md:block" style={{ height: 10 }} />
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
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg z-10 mx-auto">
          <div className="flex flex-col items-center w-full mb-4 scale-95 md:scale-100" style={{ maxWidth: '420px' }}>
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#ffe066] shadow-[0_4px_32px_0_rgba(239,90,99,0.10)] overflow-hidden mb-1 flex-shrink-0 self-center" style={{ background: 'radial-gradient(circle at 60% 30%, #fffbe0 70%, #ffe066 100%)' }}>
              <img
                src="/Aparna.png"
                alt="Aparna Mam"
                className="object-cover w-full h-full transform -scale-x-100 transition-transform duration-500 aparna-img-mobile"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="live-classes-row mb-2 animate-fade-in-up flex justify-center w-full">
              <span className="live-dot inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-[#ef5a63] to-[#ffb347] animate-pulse" />
              <span className="live-text text-[#ef5a63] font-medium text-base md:text-lg" style={{ fontFamily: 'Questrial, Inter, sans-serif' }}>
                Live Classes by Aparna Mam!
              </span>
            </div>
            {/* Refactored Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto mt-1">
              {/* Info Card */}
              {/* Live 1-on-1 */}
              <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-[#ffe06633] shadow-sm px-5 py-5 text-center info-card-mobile">
                <span className="inline-flex items-center justify-center w-12 h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow mb-2">
                  <svg width="32" height="32" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="4"/><circle cx="18" cy="24" r="3"/><path d="M30 21h4v6h-4z"/><path d="M12 34h24"/></svg>
                </span>
                <div className="text-sm font-medium text-[#ef5a63] mb-0.5">Live 1-on-1</div>
                <div className="text-lg font-semibold text-[#23242b]">{course.live1on1} Sessions</div>
                <div className="text-xs text-[#23242b] mt-1">15 min each | 1/week</div>
              </div>
              {/* Live Batch */}
              <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-[#ffe06633] shadow-sm px-5 py-5 text-center info-card-mobile">
                <span className="inline-flex items-center justify-center w-12 h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow mb-2">
                  <svg width="32" height="32" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="4"/><circle cx="16" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="32" cy="24" r="3"/><path d="M12 34h24"/></svg>
                </span>
                <div className="text-sm font-medium text-[#ef5a63] mb-0.5">Live Batch</div>
                <div className="text-lg font-semibold text-[#23242b]">{course.liveBatch} Sessions</div>
                <div className="text-xs text-[#23242b] mt-1">45 min each | 1/week</div>
              </div>
              {/* Duration */}
              <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-[#ffe06633] shadow-sm px-5 py-5 text-center info-card-mobile duration-mobile h-full">
                <div className="flex flex-col justify-center items-center h-full w-full">
                  <span className="inline-flex items-center justify-center w-12 h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow mb-2">
                    <svg width="32" height="32" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="7" y="10" width="34" height="31" rx="4"/><path d="M7 18h34M33 6v8M15 6v8M24 24v7h7"/><circle cx="24" cy="28" r="1.5"/></svg>
                  </span>
                  <div className="text-sm font-medium text-[#ef5a63] mb-0.5 text-center">Duration</div>
                  <div className="text-lg font-semibold text-[#23242b] text-center">{course.duration} weeks</div>
                </div>
              </div>
              {/* Batch Size */}
              <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-[#ffe06633] shadow-sm px-5 py-5 text-center info-card-mobile batchsize-mobile h-full">
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
            </div>
          </div>
        </div>
      </div>
      {/* Mobile-only: Fixed bottom bar with Early Bird Offer, info, CTA, logo, and tagline */}
      <div className="block md:hidden w-full flex flex-col items-center justify-center" style={{ position: 'fixed', left: 0, bottom: 0, zIndex: 100, background: '#fff', boxShadow: '0 -2px 16px 0 rgba(239,90,99,0.08)', borderTop: '1px solid #ffe066', padding: '16px 16px 20px 16px' }}>
        {/* Swap: To know more + CTA first, then Early Bird Offer */}
        <span className="text-base text-[#23242b] font-medium mb-2 text-center" style={{ fontFamily: 'Questrial, Inter, sans-serif' }}>
          To know more about the course and outcomes
        </span>
        <button
          className="bg-[#ef5a63] hover:bg-[#e04a54] text-white font-normal rounded-full px-8 py-3 text-base shadow-lg transition-all duration-200 scale-100 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffe066] border-2 border-[#ffe06622] whitespace-nowrap w-full max-w-xs mb-3"
          style={{ fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '0.04em' }}
          onClick={() => router.push('/courses/book-appointment')}
          aria-label="Book Appointment with Aparna Mam"
        >
          Book Appointment with Aparna Mam
        </button>
        {/* Early Bird Offer section (mobile only) */}
        <div className="w-full flex flex-col items-center justify-center mb-3 early-bird-mobile-offset">
          <div className="early-bird-offer-mobile w-full flex flex-row items-center justify-center gap-2 px-3 py-2 rounded-lg">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#fffbe0]">
              <svg width="18" height="18" fill="none" stroke="#ef5a63" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.3 7.3a2 2 0 0 1-2.83 0l-7.3-7.3a2 2 0 0 1 0-2.83l7.3-7.3a2 2 0 0 1 2.83 0l7.3 7.3a2 2 0 0 1 0 2.83z"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>
            </span>
            <span className="text-[#ef5a63] font-semibold">Early Bird Offer:</span>
            <span>Now <span className="text-[#ef5a63] font-bold text-lg">₹{course.offerPrice.toLocaleString()}</span></span>
            <span className="line-through text-[#7b8a99] ml-1 font-normal">₹{course.originalPrice.toLocaleString()}</span>
            <span className="bg-[#ef5a63] text-white text-xs font-bold rounded px-2 py-0.5 ml-1">{Math.round(100 - (course.offerPrice / course.originalPrice) * 100)}% OFF</span>
            <span className="text-[#7b8a99] text-sm ml-1">Ends 15 June</span>
          </div>
        </div>
        {/* Logo and tagline stacked below CTA for mobile only */}
        <div className="flex flex-col items-center justify-center w-full mt-1">
          <Image src="/Fabulinus_logo.svg" alt="Fabulinus Logo" width={90} height={90} style={{ minWidth: 72, minHeight: 72, marginBottom: 0, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          <span
            className="mobile-tagline"
            style={{
              fontFamily: 'Questrial, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '0.98rem',
              color: '#23242b',
              letterSpacing: '0.01em',
              display: 'block',
              textAlign: 'center',
              marginTop: 1,
              lineHeight: 1.2,
            }}
          >
            <span style={{ color: '#ef5a63', fontWeight: 400 }}>Express.</span>{' '}
            <span style={{ color: '#23242b', fontWeight: 400 }}>Communicate. Dominate</span>
          </span>
        </div>
      </div>
      {/* Floating logo and tagline at the bottom center (desktop only) */}
      {/* Only render this block for md and up, never on mobile */}
      {typeof window !== 'undefined' && window.innerWidth >= 768 && (
        <div
          className="hidden md:flex"
          style={{
            position: 'fixed',
            left: '50%',
            bottom: 24,
            transform: 'translateX(-50%)',
            zIndex: 120,
            borderRadius: '2rem',
            padding: '0.1rem 0.6rem 0.1rem 0.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            border: 'none',
            boxShadow: 'none',
            pointerEvents: 'none',
          }}
        >
          <Image src="/Fabulinus_logo.svg" alt="Fabulinus Logo" width={87} height={87} style={{ minWidth: 68, minHeight: 68 }} />
          <span
            style={{
              fontFamily: 'Questrial, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '0.98rem',
              color: '#23242b',
              letterSpacing: '0.01em',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#ef5a63', fontWeight: 400 }}>Express.</span>{' '}
            <span style={{ color: '#23242b', fontWeight: 400 }}>Communicate. Dominate</span>
          </span>
        </div>
      )}
      {/* Mobile-only: Set fixed height for mobile only */}
      <style>{`
        @media (max-width: 767px) {
          main.min-h-screen {
            height: 2500px !important;
            min-height: 2500px !important;
          }
          .move-up-mobile {
            margin-top: 0 !important;
            padding-top: 0 !important;
            transform: translateY(-12%);
          }
          .aparna-img-mobile {
            width: 125% !important;
            height: 125% !important;
            max-width: none !important;
            max-height: none !important;
          }
          .w-40.h-40 {
            width: 12.5rem !important;
            height: 12.5rem !important;
          }
          /* Make the four info cards auto-height on mobile */
          .info-card-mobile {
            min-height: 0 !important;
            height: auto !important;
            box-sizing: border-box;
            padding-top: 1.2rem !important;
            padding-bottom: 1.2rem !important;
          }
          /* Increase font sizes for info cards on mobile */
          .info-card-mobile .text-sm {
            font-size: 1.18rem !important;
          }
          .info-card-mobile .text-lg {
            font-size: 1.45rem !important;
          }
          .info-card-mobile .text-xs {
            font-size: 1.08rem !important;
          }
          /* Reduce size of Duration and Batch Size cards on mobile */
          .info-card-mobile.duration-mobile,
          .info-card-mobile.batchsize-mobile {
            padding-top: 0.7rem !important;
            padding-bottom: 0.7rem !important;
          }
          .info-card-mobile.duration-mobile span,
          .info-card-mobile.batchsize-mobile span {
            width: 2.2rem !important;
            height: 2.2rem !important;
            font-size: 1.1rem !important;
          }
          .early-bird-mobile-offset {
            margin-top: 5px !important;
          }
          .early-bird-mobile-offset > div {
            background: rgba(255, 251, 224, 0.5) !important;
          }
          /* Force hide floating logo/tagline on mobile */
          .floating-logo-tagline {
            display: none !important;
          }
          /* Reduce spacing between logo and tagline for mobile only */
          .mobile-tagline {
            margin-top: -2px !important;
          }
          .early-bird-offer-mobile {
            background: rgba(255, 251, 224, 0.5) !important;
            border: none !important;
            box-shadow: none !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
            margin-left: 16px !important;
            margin-right: 16px !important;
          }
        }
      `}</style>
    </main>
  );
}
