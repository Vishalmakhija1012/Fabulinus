import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#18181b] text-[#f3f4f6] py-6 mt-16 font-body text-base border-t-4 border-[#ef5a63]">
      <div className="container mx-auto flex flex-col items-center gap-2">
        {/* Social Icons Row removed as requested */}
        {/* Copyright and Contact - centered, blue email for mobile */}
        <div className="mt-4 text-[#a1a1aa] text-sm w-full text-center">
          &copy; {new Date().getFullYear()} Fabulinus. All rights reserved.
        </div>
        <div className="text-[#a1a1aa] text-sm w-full text-center">
          Contact: <a href="mailto:info@fabulinus.in" className="underline text-blue-600 hover:text-[#ef5a63]">info@fabulinus.in</a>
        </div>
      </div>
    </footer>
  );
}
