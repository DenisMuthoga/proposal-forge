import { ValidationExperience } from '@/components/ValidationExperience';
import { Suspense } from 'react';

export default function ValidatePage() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4 selection:bg-primary-500 selection:text-white">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
         <ValidationExperience />
      </Suspense>
    </div>
  );
}
