import { useRouter } from 'next/router';
import React from 'react';

const personaDetails: Record<string, {
  title: string;
  emoji: string;
  description: string;
  benefits: string[];
  courseQuery: string;
}> = {
  parent: {
    title: 'Parent',
    emoji: '👨‍👩‍👧‍👦',
    description: 'You want the best for your child. Fabulinus helps children ages 4–14 build confidence, creativity, and communication skills for a bright future.',
    benefits: [
      'Courses designed for young learners',
      'Fun, interactive lessons',
      'Build confidence and creativity',
    ],
    courseQuery: 'young-learner',
  },
  'professional': {
    title: 'Professional',
    emoji: '💼',
    description: 'Advance your career with powerful English and communication skills. Our courses help you excel in interviews, presentations, and the workplace.',
    benefits: [
      'Corporate communication',
      'Interview & presentation skills',
      'Career advancement',
    ],
    courseQuery: 'corporate-communication',
  },
  'college-student': {
    title: 'College Student',
    emoji: '🎓',
    description: 'Stand out in academics and beyond. Fabulinus helps college & university students (16+) master advanced English and communication skills.',
    benefits: [
      'Academic & professional English',
      'Competitive edge courses',
      'Presentation & debate skills',
    ],
    courseQuery: 'competitive-edge',
  },
  'teacher': {
    title: 'Teacher',
    emoji: '🧑‍🏫',
    description: 'Empower your students and enhance your teaching journey. Fabulinus supports educators with resources and training.',
    benefits: [
      'Teacher training',
      'Classroom resources',
      'Peer community',
    ],
    courseQuery: 'teacher-profile',
  },
};

export default function PersonaDetail() {
  const router = useRouter();
  const { persona } = router.query;
  const details = persona && typeof persona === 'string' ? personaDetails[persona] : null;

  React.useEffect(() => {
    if (details && typeof window !== 'undefined') {
      localStorage.setItem('personaType', persona as string);
    }
  }, [details, persona]);

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#fdf6f6]">
        <div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-md w-full text-center">
          <p className="text-lg">Invalid persona. <button className="text-[#ef5a63] underline font-semibold" onClick={() => router.push('/persona')}>Go back</button></p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#fdf6f6]">
      <div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-xl w-full flex flex-col items-center" style={{ marginTop: '-15px' }}>
        <h1 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#ef5a63', fontWeight: 700, fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '-0.01em', lineHeight: 1.1, WebkitTextStroke: '0px', textShadow: 'none', textRendering: 'optimizeLegibility', MozOsxFontSmoothing: 'grayscale', WebkitFontSmoothing: 'antialiased', marginBottom: '2rem', marginTop: 0, display: 'block', textAlign: 'center', background: 'none', boxShadow: 'none', border: 'none', outline: 'none', textTransform: 'none', fontSize: '2rem' }}>
          Personalize Your Experience
        </h1>
        <span className="text-6xl mb-4" aria-hidden="true">{details.emoji}</span>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Welcome, {details.title}!</h2>
        <p className="text-lg text-gray-700 mb-4 text-center">{details.description}</p>
        <ul className="mb-6 w-full">
          {details.benefits.map((b, i) => (
            <li key={i} className="flex items-center mb-2">
              <span className="inline-block w-2 h-2 bg-[#ef5a63] rounded-full mr-3"></span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <button
          className="w-full sm:w-auto px-6 py-3 bg-[#ef5a63] text-white rounded-full font-bold shadow hover:bg-[#e04a54] focus:outline-none focus:ring-2 focus:ring-[#ffe066] transition-all mb-3 border-2 border-[#ffe06622]"
          style={{ fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '0.04em', minWidth: '220px' }}
          onClick={() => router.push(`/courses?type=${persona}`)}
        >
          See Recommended Courses
        </button>
        <button
          className="text-[#ef5a63] underline text-sm mt-2 font-medium"
          onClick={() => router.push('/persona')}
        >
          &larr; Choose a different persona
        </button>
      </div>
    </main>
  );
}
