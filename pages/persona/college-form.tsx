import { useRouter } from 'next/router';
import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CollegeForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    year: '',
    goal: '',
    englishLevel: '',
    typeOfCourse: '',
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
    const persona = localStorage.getItem('personaType') || 'college-student';
    await addDoc(collection(db, 'personaForms'), {
      journeyId,
      persona,
      formData: form,
      createdAt: serverTimestamp(),
    });
    router.push({
      pathname: '/persona/animation',
      query: {
        year: form.year,
        goal: form.goal,
        englishLevel: form.englishLevel,
        typeOfCourse: form.typeOfCourse,
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fafafa] px-0 sm:px-4 py-6 sm:py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg flex flex-col gap-5 px-2 py-6
          sm:rounded-2xl sm:shadow-xl sm:px-8 sm:py-10
          translate-y-[-5vh] sm:translate-y-0"
        aria-label="College Student Persona Form"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-[#ef5a63] mb-2 text-center">Tell us about your college journey</h1>
        <label className="font-semibold text-[#23242b]">Highest Qualification
          <div className="relative">
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-[#ef5a63] px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 z-10"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select qualification</option>
              <option value="pursuing-undergrad">Pursuing Undergrad</option>
              <option value="undergrad">Undergrad</option>
              <option value="postgrad">Postgrad</option>
              <option value="phd">PHD</option>
              <option value="other">Others</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ef5a63] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#ef5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </label>
        <label className="font-semibold text-[#23242b]">Learning Goal
          <div className="relative">
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-[#ef5a63] px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 z-10"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select a goal</option>
              <option value="english-fluency">English fluency</option>
              <option value="presentations">Presentations</option>
              <option value="writing-skills">Writing skills</option>
              <option value="job-interviews">Job interviews</option>
              <option value="content-creation">Content Creation</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ef5a63] z-20">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#ef5a63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </label>
        <label className="font-semibold text-[#23242b]">Current English Level
          <div className="relative">
            <select
              name="englishLevel"
              value={form.englishLevel}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-[#ef5a63] px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#ef5a63] transition-all duration-200 z-10"
              style={{ position: 'relative', zIndex: 10 }}
            >
              <option value="" disabled>Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
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
