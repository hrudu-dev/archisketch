import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <Logo className="h-12 w-12" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">ArchiSketch</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Reset Your Password</CardTitle>
            <CardDescription>Enter your new password below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Remembered your password?{' '}
          <Link href="/" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
