"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type RegisterShellProps = {
  title: string;
  subtitle: string;
  stepLabel: string;
  children: React.ReactNode;
};

export function RegisterShell({ title, subtitle, stepLabel, children }: RegisterShellProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
        <div className="w-full max-w-107.5">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to home
          </Link>

          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
            {stepLabel}
          </span>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
