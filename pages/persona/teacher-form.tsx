import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PersonalGrowthForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    year: '', // years of experience
    goal: '',
    typeOfCourse: '',
    englishLevel: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a new journeyId for every submission
    function generateUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    const newJourneyId = generateUUID();
    localStorage.setItem('journeyId', newJourneyId);
    const journeyId = newJourneyId;
    const persona = localStorage.getItem('personaType') || 'personal_growth';
    // Save form data to localStorage for next page fallback
    localStorage.setItem('personaFormData', JSON.stringify(form));
    router.push('/courses/single-page');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#fff6f7] to-[#fbeee7] px-0 sm:px-4 py-2 sm:py-8 persona-header-gap pt-0 sm:pt-14">
      <form
        onSubmit={handleSubmit}
        className="persona-main-card bg-white w-full max-w-lg flex flex-col gap-6 px-4 py-8
          sm:rounded-2xl sm:shadow-xl sm:px-8 sm:py-10
          translate-y-[-3vh] sm:translate-y-0
          shadow-lg border border-[#f3d1d3] rounded-2xl
          animate-fadeIn"
        aria-label="Personal Growth Persona Form"
      >
        {/* Hide 'Personalize Your Experience' on mobile only */}
        <h1 className="persona-title mobile-hide-title text-2xl md:text-3xl font-bold text-[#ef5a63] mb-2 text-center">Personalize Your Experience</h1>
        <h1 className="text-2xl md:text-3xl font-bold text-[#ef5a63] mb-4 text-center leading-tight">Tell us about your teaching journey</h1>
        <label className="font-semibold text-[#23242b] text-base mb-1">Years of Experience
          <div className="relative mt-1">
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-[#ef5a63] px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 bg-[#fff6f7] text-base shadow-sm"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select years of experience</option>
              <option value="0-3">0-3 years</option>
              <option value="4-7">4-7 years</option>
              <option value="8-15">8-15 years</option>
              <option value="15+">15+ years</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ef5a63] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#ef5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </label>
        <label className="font-semibold text-[#23242b] text-base mb-1">Main Goal
          <div className="relative mt-1">
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-[#ef5a63] px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 bg-[#fff6f7] text-base shadow-sm"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select goal</option>
              <option value="speak-better">Speak more confidently</option>
              <option value="leadership">Leadership skills</option>
              <option value="networking">Networking</option>
              <option value="self-expression">Self-expression</option>
              <option value="all">All the above</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ef5a63] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#ef5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </label>
        <label className="font-semibold text-[#23242b] text-base mb-1">English Comfort
          <div className="relative mt-1">
            <select
              name="englishLevel"
              value={form.englishLevel}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-[#ef5a63] px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 bg-[#fff6f7] text-base shadow-sm"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select comfort level</option>
              <option value="not-comfortable">Not comfortable</option>
              <option value="somewhat">Somewhat comfortable</option>
              <option value="very">Very comfortable</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ef5a63] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#ef5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </label>
        <label className="font-semibold text-[#23242b] text-base mb-1">Type of Course
          <div className="relative mt-1">
            <select
              name="typeOfCourse"
              value={form.typeOfCourse}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-[#ef5a63] px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 bg-[#fff6f7] text-base shadow-sm"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select type</option>
              <option value="short-term">Short Term</option>
              <option value="long-term">Long Term</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ef5a63] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#ef5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </label>
        <button
          type="submit"
          className="bg-[#ef5a63] text-white rounded-2xl px-8 py-4 text-lg tracking-wide shadow-xl hover:bg-[#e04a54] transition-all duration-200 w-full mt-6 mb-2"
          style={{ fontFamily: 'Questrial, Inter, sans-serif', letterSpacing: '0.01em', fontWeight: 600, textTransform: 'none' }}
        >
          Find me the Best Course
        </button>
      </form>
    </main>
  );
}
