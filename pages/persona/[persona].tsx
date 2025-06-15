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

  // Remove redirect logic. Instead, show detail page with button to proceed.
  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#fdf6f6]">
        <div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-md w-full text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </main>
    );
  }

  // Map persona to form page
  const getFormPage = (persona: string) => {
    switch (persona) {
      case 'parent':
        return '/persona/parent-form';
      case 'professional':
        return '/persona/professional-form';
      case 'college-student':
        return '/persona/college-form';
      case 'teacher':
        return '/persona/teacher-form';
      default:
        return '/persona';
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#fdf6f6]">
      <div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-2 text-[#f75b6a]">Personalize Your Experience</h2>
        <div className="text-5xl mb-2">{details.emoji}</div>
        <h1 className="text-2xl font-bold mb-2">Welcome, {details.title}!</h1>
        <p className="mb-4 text-gray-700">{details.description}</p>
        <ul className="text-left mb-6">
          {details.benefits.map((b, i) => (
            <li key={i} className="flex items-center mb-1">
              <span className="text-[#f75b6a] mr-2">•</span> {b}
            </li>
          ))}
        </ul>
        <button
          className="bg-[#f75b6a] text-white font-semibold rounded-full px-8 py-3 shadow-md hover:bg-[#e14b5a] transition mb-2"
          onClick={() => router.push(getFormPage(persona as string))}
        >
          See Recommended Courses
        </button>
        <div>
          <a
            href="/persona"
            className="text-[#f75b6a] text-sm underline hover:text-[#e14b5a]"
          >
            ← Choose a different persona
          </a>
        </div>
      </div>
    </main>
  );
}
