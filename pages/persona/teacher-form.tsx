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
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa] px-0 sm:px-4 py-6 sm:py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg flex flex-col gap-5 px-2 py-6
          sm:rounded-2xl sm:shadow-xl sm:px-8 sm:py-10
          translate-y-[-5vh] sm:translate-y-0"
        aria-label="Personal Growth Persona Form"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#ef5a63] mb-2 text-center">Tell us about your personal growth journey</h1>
        <label className="font-semibold text-[#23242b]">Years of Experience
          <div className="relative">
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-[#ef5a63] px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 z-10"
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
        <label className="font-semibold text-[#23242b]">Main Goal
          <div className="relative">
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-[#ef5a63] px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 z-10"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select goal</option>
              <option value="speak-better">Speak more confidently</option>
              <option value="leadership">Leadership skills</option>
              <option value="networking">Networking</option>
              <option value="self-expression">Self-expression</option>
              <option value="other">Other</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ef5a63] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#ef5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </label>
        <label className="font-semibold text-[#23242b]">English Comfort
          <div className="relative">
            <select
              name="englishLevel" // renamed from comfortLevel
              value={form.englishLevel}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-[#ef5a63] px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 z-10"
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
        <label className="font-semibold text-[#23242b]">Type of Course
          <div className="relative">
            <select
              name="typeOfCourse"
              value={form.typeOfCourse}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-[#ef5a63] px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 z-10"
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
          className="bg-[#ef5a63] text-white font-bold rounded-xl px-8 py-4 text-lg uppercase tracking-wide shadow-lg hover:bg-[#e04a54] transition-all duration-200 w-full mt-4"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Continue
        </button>
      </form>
    </main>
  );
}
