// Brand color: #ef5a63
// Simple SVG icons for persona types
import React from 'react';

export function ParentIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="30" r="6" fill="#ef5a63" fillOpacity="0.15" />
      <circle cx="30" cy="30" r="6" fill="#ef5a63" fillOpacity="0.15" />
      <circle cx="20" cy="18" r="8" fill="#ef5a63" fillOpacity="0.25" />
      <circle cx="10" cy="30" r="3.5" fill="#ef5a63" />
      <circle cx="30" cy="30" r="3.5" fill="#ef5a63" />
      <circle cx="20" cy="18" r="5" fill="#ef5a63" />
    </svg>
  );
}

export function ProfessionalIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="20" height="10" rx="3" fill="#ef5a63" fillOpacity="0.15" />
      <rect x="15" y="10" width="10" height="15" rx="5" fill="#ef5a63" fillOpacity="0.25" />
      <rect x="17" y="12" width="6" height="6" rx="3" fill="#ef5a63" />
    </svg>
  );
}

export function CollegeIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="24" height="10" rx="3" fill="#ef5a63" fillOpacity="0.15" />
      <rect x="12" y="10" width="16" height="10" rx="5" fill="#ef5a63" fillOpacity="0.25" />
      <rect x="17" y="13" width="6" height="6" rx="3" fill="#ef5a63" />
    </svg>
  );
}

export function TeacherIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="25" width="24" height="8" rx="3" fill="#ef5a63" fillOpacity="0.15" />
      <rect x="14" y="10" width="12" height="15" rx="6" fill="#ef5a63" fillOpacity="0.25" />
      <rect x="17" y="13" width="6" height="6" rx="3" fill="#ef5a63" />
      <rect x="19" y="28" width="2" height="5" rx="1" fill="#ef5a63" />
    </svg>
  );
}
