import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function BookAppointment() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    // Phone validation
    if (form.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      setSubmitting(false);
      return;
    }
    try {
      const journeyId = typeof window !== 'undefined' ? localStorage.getItem('journeyId') : null;
      const persona = typeof window !== 'undefined' ? localStorage.getItem('personaType') : null;
      await addDoc(collection(db, 'appointments'), {
        journeyId,
        persona,
        appointmentData: form,
        createdAt: serverTimestamp(),
      });
      setShowThankYou(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-2 font-sans bg-white rounded-[2.5rem] shadow-lg"
      style={{ marginTop: '-80px' }}
    >
      <div className="w-full max-w-xl flex flex-col items-center justify-center mx-auto py-14 md:py-20 px-4 md:px-12 gap-10 mt-0">
        {!showThankYou ? (
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-[#ffe066] px-8 py-10 flex flex-col gap-5 items-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center" style={{ fontFamily: 'Questrial, Inter, sans-serif', color: '#ef5a63' }}>Book Appointment with Aparna Mam</h1>
            <form
              className="w-full flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                required
                placeholder="Your Name"
                className="rounded-xl border border-[#ffe066] px-4 py-3 text-lg focus:ring-2 focus:ring-[#ffe066] focus:outline-none bg-[#fffbe0] placeholder:text-[#bdbdbd]"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                className="rounded-xl border border-[#ffe066] px-4 py-3 text-lg focus:ring-2 focus:ring-[#ffe066] focus:outline-none bg-[#fffbe0] placeholder:text-[#bdbdbd]"
                value={form.phone}
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
                onChange={e => {
                  // Only allow digits
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setForm(f => ({ ...f, phone: value }));
                }}
              />
              <input
                type="email"
                required
                placeholder="Email ID"
                className="rounded-xl border border-[#ffe066] px-4 py-3 text-lg focus:ring-2 focus:ring-[#ffe066] focus:outline-none bg-[#fffbe0] placeholder:text-[#bdbdbd]"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[#23242b] text-base font-medium mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  className="rounded-xl border border-[#ffe066] px-4 py-3 text-lg focus:ring-2 focus:ring-[#ffe066] focus:outline-none bg-[#fffbe0] placeholder:text-[#bdbdbd]"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                />
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="bg-[#ef5a63] hover:bg-[#e04a54] text-white font-bold rounded-full px-8 py-3 text-lg shadow-lg transition-all duration-200 border-2 border-[#ffe06622] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-[#ffe066] px-8 py-12 flex flex-col items-center justify-center gap-4 animate-fade-in-up">
            <svg width="60" height="60" fill="none" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#fffbe0"/><path d="M18 32l8 8 16-16" stroke="#ef5a63" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h2 className="text-2xl font-bold text-[#ef5a63] mb-2 text-center">Thank You!</h2>
            <p className="text-lg text-[#23242b] text-center flex flex-wrap items-center justify-center">
              Someone from{' '}
              <span style={{ display: 'inline-block', verticalAlign: 'middle', height: '1.6875em', margin: '0 0.2em' }}>
                <Image
                  src="/Fabulinus_logo.svg"
                  alt="Fabulinus Logo"
                  height={30} // 24 * 1.25
                  width={113} // 90 * 1.25
                  style={{
                    display: 'inline',
                    height: '1.6875em', // 1.35em * 1.25
                    width: 'auto',
                    verticalAlign: 'middle',
                    marginBottom: '2px',
                  }}
                />
              </span>
              {' '}will call you soon to book your appointment with{' '}
              <span style={{ color: '#ef5a63', fontWeight: 600 }}>Aparna Mam</span>.
            </p>
            <button
              className="mt-6 bg-[#ef5a63] hover:bg-[#e04a54] text-white font-bold rounded-full px-8 py-3 text-base shadow transition-all duration-200 border-2 border-[#ffe06622]"
              onClick={() => router.push('/')}
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
