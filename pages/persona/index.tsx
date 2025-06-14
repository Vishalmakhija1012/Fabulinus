import { useRouter } from 'next/router';
import React from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const personas = [
	{
		key: 'parent',
		emoji: '👨‍👩‍👧‍👦',
		title: 'Parent',
		age: 'For children (4-17 years)', // changed
		description: 'Help your child build confidence and communication skills for a bright future.',
	},
	{
		key: 'professional',
		emoji: '💼',
		title: 'Professional',
		age: 'For working or aspiring adults', // changed
		description: 'Advance your career with powerful English and communication skills.',
	},
	{
		key: 'college-student',
		emoji: '🎓',
		title: 'College Student',
		age: 'For college & university students', // changed
		description: 'Stand out in academics and beyond with advanced English skills.',
	},
	{
		key: 'personal_growth',
		emoji: '🌱', // changed to seedling for growth
		title: 'Personal Growth',
		age: 'For anyone seeking self-improvement', // changed
		description: 'Communicate confidently in projects, business, and every life aspect.',
	},
];

export default function PersonaSelection() {
	const router = useRouter();

	const handleSelect = async (personaKey: string) => {
		let journeyId = localStorage.getItem('journeyId');
		if (!journeyId) {
			journeyId = uuidv4();
			localStorage.setItem('journeyId', journeyId);
		}
		// Save persona selection to Firestore
		await addDoc(collection(db, 'personaSelections'), {
			journeyId,
			persona: personaKey,
			createdAt: serverTimestamp(),
		});
		if (typeof window !== 'undefined') {
			localStorage.setItem('personaType', personaKey);
		}
		// Map personaKey to form page
		let formPage = '';
		switch (personaKey) {
			case 'parent':
				formPage = 'parent-form';
				break;
			case 'professional':
				formPage = 'professional-form';
				break;
			case 'college-student':
				formPage = 'college-form';
				break;
			case 'personal_growth':
				formPage = 'teacher-form';
				break;
			default:
				formPage = personaKey;
		}
		// Preserve cta param if present
		const cta = router.query.cta;
		const query = cta ? `?cta=${encodeURIComponent(cta as string)}` : '';
		router.push(`/persona/${formPage}${query}`);
	};

	return (
		<main className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-4xl w-full flex flex-col items-center" style={{ marginTop: '-20px' }}>
				<h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#ef5a63]">
					Personalize Your Experience
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
					{personas.map((persona) => (
						<button
							key={persona.key}
							aria-label={`Select ${persona.title}`}
							className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 cursor-pointer group"
							onClick={() => handleSelect(persona.key)}
							tabIndex={0}
						>
							<span
								className="text-5xl mb-4"
								aria-hidden="true"
							>
								{persona.emoji}
							</span>
							<span className="text-xl font-bold mb-2">
								{persona.title}
							</span>
							<span className="text-red-600 font-semibold mb-2">
								{persona.age}
							</span>
							<span className="text-gray-700 text-center">
								{persona.description}
							</span>
						</button>
					))}
				</div>
			</div>
		</main>
	);
}
