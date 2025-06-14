import React from 'react';
import { useRouter } from 'next/router';

const COURSES = [
	{
		emoji: '🧒',
		title: 'Young Learner Program',
		age: 'Ages 4–14',
		description: 'Level based holistic English program',
		variants: [
			{ name: 'Level 1', age: '4–7' },
			{ name: 'Level 2', age: '7–10' },
			{ name: 'Level 3', age: '10–14' },
		],
		highlights: [
			'Phonics based reading',
			'Advanced reading and public speaking',
		],
		color: 'from-[#ffe066] to-[#fffbe0] border-[#ffe066] text-[#ef5a63]'
	},
	{
		emoji: '🎓',
		title: 'Advanced English',
		age: 'Ages 9+',
		description: 'Master advanced grammar, vocabulary, and fluency',
		variants: [
			{ name: 'Young Runner', age: '4–14' },
			{ name: 'Advanced English', age: '14+' },
		],
		highlights: [],
		color: 'from-[#fffbe0] to-[#fff] border-[#ffe066] text-[#ef5a63]'
	},
	{
		emoji: '🏆',
		title: 'Competitive Edge',
		age: 'Age 17+',
		description: 'Excel in competitive exams and interviews',
		variants: [
			{ name: 'Competitive Edge', age: '17+' },
		],
		highlights: [],
		color: 'from-[#fffbe0] to-[#fff] border-[#ffe066] text-[#ef5a63]'
	},
	{
		emoji: '💼',
		title: 'Corporate Communication',
		age: 'Age 21+',
		description: 'Professional English for the workplace',
		variants: [
			{ name: 'Corporate Communication', age: '21+' },
		],
		highlights: [],
		color: 'from-[#fffbe0] to-[#fff] border-[#ffe066] text-[#ef5a63]'
	},
];

const DURATIONS = [
	{
		label: 'Short Term (3 months)',
		output: 'Noticeable improvement in confidence and communication basics.',
		price: '₹XXXO',
	},
	{
		label: 'Medium Term (6 months)',
		output: 'Solid progress in fluency, vocabulary, and practical usage.',
		price: '₹XXXO',
	},
	{
		label: 'Long Term (12 months)',
		output: 'Transformational change in English proficiency and self-expression.',
		price: '₹XXXO',
	},
];

export default function Courses() {
	const router = useRouter();

	// Hide notification bar and banner only on /courses
	React.useEffect(() => {
		if (typeof window !== 'undefined' && window.location.pathname === '/courses') {
			const notif = document.getElementById('notification-bar');
			if (notif) notif.style.display = 'none';
			const notifBanner = document.getElementById('notification-banner');
			if (notifBanner) notifBanner.style.display = 'none';
		}
	}, []);

	const persona = typeof window !== 'undefined' ? localStorage.getItem('personaType') : null;

	// Personalization logic (example: highlight a course or reorder)
	let personalizedCourses = [...COURSES];
	if (persona === 'parent') {
		personalizedCourses = [COURSES[0], ...COURSES.slice(1)];
	} else if (persona === 'college-student') {
		personalizedCourses = [COURSES[1], COURSES[2], ...COURSES.filter((c, i) => i !== 1 && i !== 2)];
	} else if (persona === 'professional') {
		personalizedCourses = [COURSES[3], ...COURSES.filter((c, i) => i !== 3)];
	}

	// Do NOT render Header or NotificationBanner on /courses
	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#fdf6f6] flex flex-col items-center py-20 px-2">
			{/* Redesigned Modern Hero Section */}
			<section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mx-auto py-12 md:py-16 px-4 md:px-20 bg-[#fffbe0] rounded-[3rem] shadow-[0_8px_48px_0_rgba(239,90,99,0.10)] border border-[#f3f4f6] mb-16 relative overflow-visible transition-all duration-500 animate-fade-in-up">
				{/* Left: Headline, Description, Labels */}
				<div className="flex-1 flex flex-col items-start justify-center max-w-xl w-full z-10 text-left mx-auto space-y-4 md:space-y-6">
					<h1 className="font-black text-4xl md:text-6xl leading-tight mb-2 drop-shadow-xl text-[#ef5a63] animate-gradient-x" style={{ fontFamily: 'Questrial, sans-serif', letterSpacing: '-0.03em', lineHeight: 1.08, textShadow: '0 2px 24px #ffe06633' }}>
						ADVANCED ENGLISH
					</h1>
					<p className="text-2xl md:text-3xl text-[#23242b] font-normal mb-4 mt-1 max-w-2xl opacity-90" style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.2, textShadow: '0 1px 8px #ffe06611' }}>
						Comprehensive and thorough course strucure focussing on holistic devoplment, communication, and overall personality development<br />
					</p>
					{/* Bullet points above info grid */}
					<ul className="mb-4 pl-0 list-none flex flex-col items-start gap-3">
						<li className="flex items-center gap-3 text-lg md:text-xl text-[#23242b] font-normal">
							<span className="inline-flex items-center justify-center font-bold text-lg md:text-xl text-[#ef5a63] w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#fffbe0] shadow-md" style={{ minWidth: '1.75rem', minHeight: '1.75rem' }}>1</span>
							Elevate your English to an expert level for academic and professional excellence.
						</li>
						<li className="flex items-center gap-3 text-lg md:text-xl text-[#23242b] font-normal">
							<span className="inline-flex items-center justify-center font-bold text-lg md:text-xl text-[#ef5a63] w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#fffbe0] shadow-md" style={{ minWidth: '1.75rem', minHeight: '1.75rem' }}>2</span>
							Achieve fluent, confident communication .
						</li>
						<li className="flex items-center gap-3 text-lg md:text-xl text-[#23242b] font-normal">
							<span className="inline-flex items-center justify-center font-bold text-lg md:text-xl text-[#ef5a63] w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#fffbe0] shadow-md" style={{ minWidth: '1.75rem', minHeight: '1.75rem' }}>3</span>
							Develop critical thinking, analysis..
						</li>
						{/* Early Bird Offer bullet point - minimal, modern, professional */}
						<li className="flex items-center gap-3 text-base md:text-lg text-[#23242b] font-normal mt-2">
							<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#fffbe0] border border-[#ffe066] shadow-sm">
								{/* Tag icon */}
								<svg width="18" height="18" fill="none" stroke="#ef5a63" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.3 7.3a2 2 0 0 1-2.83 0l-7.3-7.3a2 2 0 0 1 0-2.83l7.3-7.3a2 2 0 0 1 2.83 0l7.3 7.3a2 2 0 0 1 0 2.83z"/><circle cx="8.5" cy="8.5" r="1.5"/></svg>
							</span>
							<span className="flex flex-wrap items-center gap-x-2 gap-y-1">
								<span className="text-[#ef5a63] font-semibold">Early Bird Offer:</span>
								<span>Now <span className="text-[#ef5a63] font-bold text-lg md:text-xl">₹25,000</span></span>
								<span className="line-through text-[#7b8a99] ml-1 font-normal">₹1,00,000</span>
								<span className="bg-[#ef5a63] text-white text-xs font-bold rounded px-2 py-0.5 ml-1 shadow">75% OFF</span>
								<span className="text-[#7b8a99] text-sm ml-1">Ends 15 June</span>
							</span>
						</li>
					</ul>
					<div className="w-full flex mt-8 justify-start">
						<button
							className="bg-[#ef5a63] hover:bg-[#e04a54] text-white font-black rounded-full px-10 py-5 text-lg md:text-2xl shadow-2xl transition-all duration-200 scale-100 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffe066] animate-fade-in-up border-2 border-[#ffe06622]"
							style={{ fontFamily: 'Questrial, sans-serif', letterSpacing: '0.04em', boxShadow: '0 4px 32px 0 rgba(239,90,99,0.13)' }}
							onClick={() => window.open('https://calendly.com/aparna-mam', '_blank')}
							aria-label="Book Appointment with Aparna Mam"
						>
							Book Appointment with Aparna Mam
						</button>
					</div>
				</div>
				{/* Right: Image, Info grid, etc. now stacked vertically */}
				<div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-lg z-10" style={{ height: '100%', justifyContent: 'center', minHeight: 0 }}>
					<div className="flex flex-col items-center w-full mb-4 scale-90 md:scale-90" style={{ maxWidth: '420px', marginBottom: 0 }}>
						<div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-[#ffe066] shadow-[0_4px_32px_0_rgba(239,90,99,0.10)] overflow-hidden mb-1 transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(239,90,99,0.13)] flex-shrink-0 self-center" style={{ maxWidth: '239.68px', maxHeight: '239.68px', borderWidth: '2px', width: '107%', height: '107%', boxShadow: '0 4px 32px 0 rgba(239,90,99,0.10)', marginTop: '0', background: 'radial-gradient(circle at 60% 30%, #fffbe0 70%, #ffe066 100%)' }}>
							<img
								src="/Aparna.png"
								alt="Aparna Mam"
								className="object-cover w-full h-full transform -scale-x-100 transition-transform duration-500"
								style={{ width: '100%', height: '100%' }}
							/>
						</div>
						<div className="flex items-center gap-2 mb-2 animate-fade-in-up" style={{ marginTop: '0' }}>
							<span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-[#ef5a63] to-[#ffb347] animate-pulse" />
							<span className="text-[#ef5a63] font-semibold text-base md:text-lg drop-shadow-sm" style={{ fontFamily: 'Questrial, sans-serif', letterSpacing: '0.01em' }}>
								Live Classes by Aparna Mam!
							</span>
						</div>
						<div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full max-w-md mx-auto mt-1">
							{/* Live 1-on-1 */}
							<div className="flex items-center gap-2 md:gap-3 bg-white/80 rounded-xl shadow border border-[#ffe06633] px-3 py-4 min-h-[92px] justify-start">
								<span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow-sm">
									{/* 1-on-1 icon */}
									<svg width="36" height="36" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="4"/><circle cx="18" cy="24" r="3"/><path d="M30 21h4v6h-4z"/><path d="M12 34h24"/></svg>
								</span>
								<div>
									<div className="text-lg md:text-xl font-semibold text-[#ef5a63] mb-0.5">
										<span className="font-normal">Live 1-on-1</span>
									</div>
									<div className="text-lg md:text-xl font-bold text-[#23242b] -mt-1">3 Sessions</div>
									<div className="text-xs md:text-sm text-[#23242b]">15 minutes each | 1/week</div>
								</div>
							</div>
							{/* Live Batch */}
							<div className="flex items-center gap-2 md:gap-3 bg-white/80 rounded-xl shadow border border-[#ffe06633] px-3 py-4 min-h-[92px] justify-start">
								<span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow-sm">
									{/* Batch session icon */}
									<svg width="36" height="36" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="8" y="14" width="32" height="20" rx="4"/><circle cx="16" cy="24" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="32" cy="24" r="3"/><path d="M12 34h24"/></svg>
								</span>
								<div>
									<div className="text-lg md:text-xl font-semibold text-[#ef5a63] mb-0.5">
										<span className="font-normal">Live Batch</span>
									</div>
									<div className="text-lg md:text-xl font-bold text-[#23242b] -mt-1">2 Sessions</div>
									<div className="text-xs md:text-sm text-[#23242b]">45 minutes each | 1/week</div>
								</div>
							</div>
							{/* Duration */}
							<div className="flex flex-col items-center justify-center bg-white/80 rounded-xl shadow border border-[#ffe06633] px-3 py-4 min-h-[92px] text-center">
								<span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow-sm mb-1">
									{/* Calendar/clock icon */}
									<svg width="36" height="36" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><rect x="7" y="10" width="34" height="31" rx="4"/><path d="M7 18h34M33 6v8M15 6v8M24 24v7h7"/><circle cx="24" cy="28" r="1.5"/></svg>
								</span>
								<div>
									<div className="text-lg md:text-xl font-semibold text-[#ef5a63] mb-0.5">Duration</div>
									<div className="text-lg md:text-xl font-bold text-[#23242b] -mt-1">3 weeks</div>
								</div>
							</div>
							{/* Batch Size */}
							<div className="flex flex-col items-center justify-center bg-white/80 rounded-xl shadow border border-[#ffe06633] px-3 py-4 min-h-[92px] text-center">
								<span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-[#23242b] bg-[#fffbe0] rounded-full shadow-sm mb-1">
									{/* Group icon */}
									<svg width="36" height="36" fill="none" stroke="#23242b" strokeWidth="2.2" viewBox="0 0 48 48"><circle cx="16" cy="20" r="6"/><circle cx="32" cy="20" r="6"/><path d="M8 38c0-4.418 7.163-8 16-8s16 3.582 16 8"/></svg>
								</span>
								<div>
									<div className="text-lg md:text-xl font-semibold text-[#ef5a63] mb-0.5">Batch Size</div>
									<div className="text-lg md:text-xl font-bold text-[#23242b] -mt-1">6 Students</div>
								</div>
							</div>
						</div>
						{/* Fabulinus logo and tagline, right-aligned, visually balanced */}
						<div className="flex flex-row items-center justify-end w-full mt-6 md:mt-8 pr-2 md:pr-4 gap-3 animate-fade-in-up">
							<img src="/Fabulinus_logo.svg" alt="Fabulinus Logo" className="h-10 md:h-12 w-auto drop-shadow-md" style={{ minWidth: '40px' }} />
							<span className="text-lg md:text-xl tracking-tight whitespace-nowrap" style={{ fontFamily: 'Questrial, sans-serif', letterSpacing: '0.01em', fontWeight: 400 }}>
								<span className="text-[#ef5a63]">Express.</span> <span className="text-[#23242b]">Communicate. Dominate</span>
							</span>
						</div>
					</div>
				</div>
			</section>
			{/* Info Row below hero for clarity */}
			{/* Removed info row below hero section as requested */}
			{/* Courses List Section */}
			<section className="w-full max-w-4xl mx-auto mt-16 flex flex-col gap-10">
				{personalizedCourses.map((course, idx) => (
					<div key={course.title} className={`rounded-2xl border ${course.color} bg-gradient-to-br shadow-xl p-6 md:p-10 flex flex-col gap-4 transition-all duration-200 hover:scale-[1.02]`}
						tabIndex={0} aria-label={course.title}>
						<div className="flex items-center gap-4 mb-2">
							<span className="text-4xl md:text-5xl" aria-hidden="true">{course.emoji}</span>
							<div>
								<div className="font-extrabold text-2xl md:text-3xl text-[#23242b]" style={{ fontFamily: 'Questrial, sans-serif' }}>{course.title}</div>
								<div className="text-[#ef5a63] font-bold text-lg md:text-xl">{course.age}</div>
								<div className="text-[#555] text-base md:text-lg mb-1">{course.description}</div>
							</div>
						</div>
						{/* Highlights if present */}
						{course.highlights && course.highlights.length > 0 && (
							<ul className="mb-2 ml-2 text-base text-[#23242b] font-medium list-disc">
								{course.highlights.map((h, i) => <li key={i}>{h}</li>)}
							</ul>
						)}
						{/* Variants */}
						<div className="flex flex-col gap-4">
							{course.variants.map((variant) => (
								<div key={variant.name + variant.age} className="bg-[#fffbe0] rounded-xl p-4 md:p-6 flex flex-col gap-2 border border-[#ffe066]">
									<div className="font-bold text-[#ef5a63] text-lg mb-1" style={{ fontFamily: 'Questrial, sans-serif' }}>{variant.name} <span className="text-[#23242b]">({variant.age})</span></div>
									{DURATIONS.map((d, i) => (
										<div key={d.label} className="flex flex-col md:flex-row md:items-center md:gap-4 border-b last:border-b-0 border-[#ffe066] py-2">
											<span className="font-bold text-[#ef5a63] min-w-[180px] text-base md:text-lg">{d.label}</span>
											<span className="text-[#23242b] flex-1 text-base md:text-lg">{d.output}</span>
											<span className="font-bold text-[#23242b] bg-[#ffe066] rounded-lg px-4 py-2 ml-auto mt-2 md:mt-0 text-lg" style={{ fontFamily: 'Questrial, sans-serif' }}>{d.price}</span>
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				))}
			</section>
		</main>
	);
}
