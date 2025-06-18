import { useRouter } from 'next/router';
import React from 'react';
import { ParentIcon, ProfessionalIcon, CollegeIcon, TeacherIcon } from '../../components/PersonaIcons';

const personaDetails: Record<string, {
  title: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  courseQuery: string;
}> = {
  parent: {
    title: 'Parent',
    icon: <ParentIcon size={40} />, // replaced emoji
    description: 'You want the best for your child. Fabulinus helps children ages 4–17 build confidence, creativity, and communication skills for a bright future.',
    benefits: [
      'Your Goal, Our Custom Plan.',
      'One-on-One Expert Guidance.',
      'Real Results, Personal Support.'
    ],
    courseQuery: 'young-learner',
  },
  'professional': {
    title: 'Professional',
    icon: <ProfessionalIcon size={40} />, // replaced emoji
    description: 'Advance your career with powerful English and communication skills. Our courses help you excel in interviews, presentations, and the workplace.',
    benefits: [
      'Your Goal, Our Custom Plan.',
      'One-on-One Expert Guidance.',
      'Real Results, Personal Support.'
    ],
    courseQuery: 'corporate-communication',
  },
  'college-student': {
    title: 'College Student',
    icon: <CollegeIcon size={40} />, // replaced emoji
    description: 'Stand out in academics and beyond. Fabulinus helps college & university students (16+) master advanced English and communication skills.',
    benefits: [
      'Your Goal, Our Custom Plan.',
      'One-on-One Expert Guidance.',
      'Real Results, Personal Support.'
    ],
    courseQuery: 'competitive-edge',
  },
  'teacher': {
    title: 'Teacher',
    icon: <TeacherIcon size={40} />, // replaced emoji
    description: 'Empower your students and enhance your teaching journey. Fabulinus supports educators with resources and training.',
    benefits: [
      'Your Goal, Our Custom Plan.',
      'One-on-One Expert Guidance.',
      'Real Results, Personal Support.'
    ],
    courseQuery: 'teacher-profile',
  },
};

export default function PersonaDetail() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!router.isReady) return;
    let personaParam = router.query.persona;
    if (Array.isArray(personaParam)) personaParam = personaParam[0];
    if (typeof personaParam === 'string' && personaDetails[personaParam]) {
      setSelectedPersona(personaParam);
      if (typeof window !== 'undefined') {
        localStorage.setItem('personaType', personaParam);
      }
    } else {
      setSelectedPersona(null);
    }
  }, [router.isReady, router.query.persona]);

  if (!selectedPersona) {
    return (
      <main className="min-h-screen flex flex-col items-start justify-start bg-gradient-to-br from-[#f8fafc] to-[#fdf6f6] px-0 py-4 sm:items-center sm:justify-center sm:py-8 persona-header-gap">
        <div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-md w-full text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </main>
    );
  }

  const details = personaDetails[selectedPersona];

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
    <main className="min-h-screen flex flex-col items-start justify-start bg-gradient-to-br from-[#f8fafc] to-[#fdf6f6] px-0 py-4 sm:items-center sm:justify-center sm:py-8 persona-header-gap pt-14">
      <div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-md w-full text-center">
        <div className="text-5xl mb-2 persona-emoji-mobile-hide">{details.icon}</div>
        <h1 className="text-2xl font-bold mb-2">Welcome, {details.title}!</h1>
        <p className="mb-4 text-[#23242b] persona-description" style={{ fontSize: '1.15rem', fontWeight: 400, textAlign: 'left' }}>{details.description}</p>
        <ul className="text-left mb-6 persona-benefits-list horizontal-bullets flex flex-col items-center md:items-start">
          {details.benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-4 text-base font-normal text-[#23242b] w-full max-w-xl justify-start">
              <span
                className="persona-benefit-number flex items-center justify-center text-base text-[#f75b6a] w-10 h-10 rounded-full bg-[#fffbe0] shadow"
                style={{ minWidth: '2.5rem', minHeight: '2.5rem', fontWeight: 400, fontSize: '1.15rem' }}
              >
                {i + 1}
              </span>
              <span className="flex-1 break-words persona-benefit-text" style={{ lineHeight: 1.5, fontSize: '1.15rem', textAlign: 'left', fontWeight: 400 }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
        <button
          className="bg-[#f75b6a] text-white font-semibold rounded-full px-8 py-3 shadow-md hover:bg-[#e14b5a] transition mb-2"
          onClick={() => selectedPersona && (window.location.href = getFormPage(selectedPersona))}
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
      {/* Removed 'Personalize Your Experience' heading as requested */}
    </main>
  );
}
