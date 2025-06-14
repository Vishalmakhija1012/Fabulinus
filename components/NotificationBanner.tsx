import React from 'react';
import Link from 'next/link';

export default function NotificationBanner() {
  return (
    <div className="w-full bg-[#ef5a63] flex items-center justify-center px-6 py-1 z-[102] fixed top-0 left-0 notification-banner" style={{ minHeight: '32px' }}>
      <span className="text-[#f7e27c] font-normal text-base mr-2">[Newly Launched]</span>
      <span className="text-white font-normal text-base md:text-base text-center leading-tight mr-2">Fabulinus courses by Aparna Sinha, bestselling Indian author!</span>
      <Link href="/persona" passHref legacyBehavior>
        <a className="ml-0 border-4 border-[#ef5a63] bg-white text-[#ef5a63] font-normal rounded-[1.25rem] px-8 py-2 text-lg flex items-center justify-center shadow-none transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 text-center" style={{ minWidth: 140, minHeight: 44, height: 44 }} href="/persona">
          ENROLL NOW
        </a>
      </Link>
    </div>
  );
}
