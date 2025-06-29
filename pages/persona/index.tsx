import { useRouter } from 'next/router';
import React from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ParentIcon, ProfessionalIcon, CollegeIcon, TeacherIcon } from '../../components/PersonaIcons';

const personas = [
	{
		key: 'parent',
		icon: <ParentIcon size={40} />, // replaced emoji
		title: 'Parent',
		age: 'For children (4-17 years)', // changed
		description: 'Help your child build confidence and communication skills for a bright future.',
	},
	{
		key: 'professional',
		icon: <ProfessionalIcon size={40} />, // replaced emoji
		title: 'Professional',
		age: 'For working or aspiring adults', // changed
		description: 'Advance your career with powerful English and communication skills.',
	},
	{
		key: 'college-student',
		icon: <CollegeIcon size={40} />, // replaced emoji
		title: 'College Student',
		age: 'For college & university students', // changed
		description: 'Stand out in academics and beyond with advanced English skills.',
	},
	{
		key: 'teacher',
		icon: <TeacherIcon size={40} />, // replaced emoji
		title: 'Personal Growth', // changed from 'Teacher'
		age: 'For anyone who wants Personal Growth', // updated from 'For educators and teachers'
		description: 'Empower yourself and enhance your work/personal journey. with Fabulinus', // updated description
	},
];

export default function PersonaSelection() {
	const router = useRouter();

	const handleSelect = (personaKey: string) => {
		let journeyId = localStorage.getItem('journeyId');
		if (!journeyId) {
			journeyId = uuidv4();
			localStorage.setItem('journeyId', journeyId);
		}
		if (typeof window !== 'undefined') {
			localStorage.setItem('personaType', personaKey);
		}
		let detailPage = '';
		switch (personaKey) {
			case 'parent':
				detailPage = 'parent';
				break;
			case 'professional':
				detailPage = 'professional';
				break;
			case 'college-student':
				detailPage = 'college-student';
				break;
			case 'teacher':
				detailPage = 'teacher';
				break;
			default:
				detailPage = personaKey;
		}
		const cta = router.query.cta;
		const query = cta ? `?cta=${encodeURIComponent(cta as string)}` : '';
		const url = `/persona/${detailPage}${query}`;
		router.push(url).catch(() => {
			window.location.href = url;
		});
	};

	return (
		<main className="min-h-screen bg-white flex flex-col items-start justify-start py-4 px-4 sm:items-center sm:justify-center sm:py-12 sm:px-6 lg:px-8 persona-header-gap pt-14">
			<div className="bg-white rounded-3xl shadow-xl px-8 py-10 max-w-4xl w-full flex flex-col items-center" style={{ marginTop: '-20px' }}>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
					{personas.map((persona) => (
						<button
							key={persona.key}
							aria-label={`Select ${persona.title}`}
							className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md border-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 cursor-pointer group"
							onClick={() => handleSelect(persona.key)}
							tabIndex={0}
						>
							<span className="text-5xl mb-4" aria-hidden="true">
								{persona.icon}
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
