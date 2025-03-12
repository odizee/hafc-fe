"use client";

import { SignInForm } from "@/components/auth/signin-form";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
      <Card className="w-full max-w-md p-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <SignInForm />
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
