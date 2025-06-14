import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const highlight = (text: string) => (
  <span className="px-2 py-0.5 rounded-lg bg-[#ffe066] text-[#ef5a63] font-bold mx-1 animate-pulse">{text}</span>
);

export default function Animation() {
  const router = useRouter();
  const { experience, goal, englishLevel, typeOfCourse } = router.query;
  const [show, setShow] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  // Animation: reveal after short delay, then show logo, then redirect
  useEffect(() => {
    const timer1 = setTimeout(() => setShow(true), 600); // show summary after 0.6s
    const timer2 = setTimeout(() => setShowLogo(true), 3000); // show logo after 3s
    const timer3 = setTimeout(() => {
      // Pass all query params to single-page
      router.push({
        pathname: '/courses/single-page',
        query: router.query,
      });
    }, 5000); // redirect after 5s
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router]);

  // Add spinner animation CSS to the document head (only once)
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('spinner-style')) {
      const style = document.createElement('style');
      style.id = 'spinner-style';
      style.innerHTML = `
        @keyframes spinnerFade { 0% { opacity: 1; } 100% { opacity: 0.2; } }
        .spinner-dot { animation: spinnerFade 1.2s linear infinite; }
        .spinner-dot {
          background: #ef5a63 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Compose summary sentence
  const allAnswers = Object.entries(router.query)
    .filter(([key, value]) => value && key !== 'undefined')
    .map(([key, value]) => highlight(value.toString().replace(/-/g, ' ')));

  const summary = (
    <>
      <div>
        <span>Let me find the best course for you for</span>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 mt-3">
        {allAnswers}
      </div>
    </>
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center animate-fade-in-up min-h-[420px]" style={{ position: 'relative' }}>
        {/* Always render the animated three dots at the bottom center, regardless of showLogo */}
        <div
          className="flex flex-col items-center justify-center"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 34,
            width: '100%',
            pointerEvents: 'none',
          }}
        >
          <style>{`
            @keyframes dotFade {
              0%, 80%, 100% { opacity: 0.3; }
              40% { opacity: 1; }
            }
          `}</style>
          <div className="flex flex-row gap-2 justify-center">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#ef5a63',
                  animation: 'dotFade 1.2s infinite',
                  animationDelay: `${i * 0.2}s`,
                  margin: '0 3px',
                }}
              />
            ))}
          </div>
        </div>
        {!showLogo ? (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-[#ef5a63] mb-6 text-center animate-fade-in-up">Analyzing your answers...</h2>
            {show && (
              <div className="text-xl md:text-2xl text-[#23242b] font-semibold text-center transition-all duration-700 animate-fade-in-up">
                {summary}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full animate-fade-in-up text-center" style={{ minHeight: 220, position: 'relative' }}>
            <img src="/Fabulinus_logo.svg" alt="Fabulinus Logo" className="h-16 md:h-20 w-auto drop-shadow-md mb-4 mx-auto" style={{ minWidth: '60px' }} />
            <span className="text-2xl md:text-3xl tracking-tight font-normal text-center w-full block" style={{ fontFamily: 'Questrial, Inter, sans-serif' }}>
              <span className="text-[#ef5a63] font-bold">Express.</span> <span className="text-[#23242b]">Communicate. Dominate</span>
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
