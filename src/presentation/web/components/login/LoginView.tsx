"use client";

import Link from "next/link";
import { ChevronLeft, EyeOff, Wrench } from "lucide-react";

type LoginViewProps = {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  errors: {
    email?: string;
    password?: string;
  };
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void | Promise<void>;
};

export const LoginView: React.FC<LoginViewProps> = ({
  email,
  password,
  loading,
  error,
  errors,
  onEmailChange,
  onPasswordChange,
  onLogin,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onLogin();
  };

  return (
    <main className="grid min-h-screen bg-slate-100 lg:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
        <div className="w-full max-w-107.5">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Sign In</h1>
          <p className="mt-2 text-sm text-slate-500">Enter your email and password to access your account.</p>

          <div className="my-6 h-px w-full bg-slate-200" />

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <span className="text-xs font-medium text-indigo-600">Forgot password?</span>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type="password"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <EyeOff className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </section>

      <section className="hidden overflow-hidden bg-[#171a5d] p-10 text-white lg:flex lg:flex-col lg:justify-end">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.2),transparent_40%)]" />

        <div className="relative z-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Wrench className="h-6 w-6" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight">Garage Locator</h2>
          <p className="mt-3 max-w-md text-base leading-8 text-indigo-100/95">
            Locate nearby garages, compare availability, and request appointments from one place.
          </p>
        </div>
      </section>
    </main>
  );
};
