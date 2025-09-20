
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Github, Key, Mail } from 'lucide-react';

const MicrosoftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="10" height="10" x="2" y="2" fill="#F25022"/>
        <rect width="10" height="10" x="12" y="2" fill="#7FBA00"/>
        <rect width="10" height="10" x="2" y="12" fill="#00A4EF"/>
        <rect width="10" height="10" x="12" y="12" fill="#FFB900"/>
    </svg>
);


export function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your diagrams.</CardDescription>
      </CardHeader>
      <form action="/console">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="m@example.com" required defaultValue="test@example.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" passHref>
                    <Button variant="link" className="px-0 h-auto text-sm">Forgot password?</Button>
                </Link>
            </div>
            <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" required defaultValue="password" className="pl-10" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <Label htmlFor="remember-me" className="font-normal">Remember me</Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            Log In
          </Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
              <Button variant="outline">
                  <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.9-4.58 1.9-3.41 0-6.19-2.84-6.19-6.2s2.78-6.2 6.19-6.2c1.86 0 3.25.76 4.22 1.69l2.5-2.5C17.3 1.9 15.1.9 12.48.9 7.42.9 3.5 4.85 3.5 9.9s3.92 9 8.98 9c2.81 0 4.95-1.16 6.55-2.75 1.6-1.6 2.36-4.04 2.36-6.53 0-.67-.06-1.31-.17-1.94z"></path></svg>
                  Google
              </Button>
              <Button variant="outline">
                  <MicrosoftIcon />
              </Button>
              <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
              </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
