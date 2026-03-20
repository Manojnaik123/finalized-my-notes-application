import { SignUp } from '@clerk/nextjs';
import { ChartLine, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <SignUp />
    </div>
  );
}
