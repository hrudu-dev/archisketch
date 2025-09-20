import Image from 'next/image';
import { LoginForm } from '@/components/auth/login-form';
import ArchiSketchLogo from '../../public/archisketch-logo.svg';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <Image src={ArchiSketchLogo} alt="ArchiSketch Logo" className="h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">ArchiSketch</h1>
          <p className="mt-2 text-muted-foreground">Design and visualize your architecture.</p>
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  );
}
