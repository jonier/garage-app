import Link from "next/link";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import { CalendarCheck2, MapPinned, ShieldCheck, Wrench } from "lucide-react";
import { GaragesMapSection } from "@/presentation/web/components/landing/GaragesMapSection";

const headingFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const steps = [
  {
    title: "Find nearby garages",
    description:
      "Search workshops by location and discover trusted options close to your current route.",
    icon: MapPinned,
  },
  {
    title: "Compare and choose",
    description:
      "Review business details, service availability, and opening hours before making a decision.",
    icon: Wrench,
  },
  {
    title: "Request appointments",
    description:
      "Send appointment requests in seconds and keep your schedule organized from one place.",
    icon: CalendarCheck2,
  },
];

export default function Home() {
  return (
    <main
      className={`${bodyFont.className} relative min-h-screen overflow-hidden bg-slate-100 text-slate-900`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(79,70,229,0.2),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(23,26,93,0.18),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(15,23,42,0.08),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-size-[42px_42px] mask-[radial-gradient(circle_at_center,black_25%,transparent_85%)]" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-16 pt-10 sm:px-8 lg:px-12">
        <header className="landing-fade-down flex items-center justify-between rounded-2xl border border-white/70 bg-white/75 px-4 py-3 backdrop-blur-sm sm:px-6">
          <div className={`${headingFont.className} text-lg font-extrabold tracking-tight sm:text-xl`}>
            Garage Locator
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Sign in
            </Link>
            <Link
              href="/register/address"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Create account
            </Link>
          </div>
        </header>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="landing-fade-up space-y-6">
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
              Discover. Request. Repair.
            </span>
            <h1
              className={`${headingFont.className} text-4xl leading-tight font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl`}
            >
              Find the right garage and request your next appointment in minutes.
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Our app helps drivers locate nearby garages, review their details, and request
              service appointments without phone calls or long waits.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/register/address"
                className="rounded-2xl bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_35px_rgba(79,70,229,0.3)] transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                Start now
              </Link>
              <Link
                href="/login"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-slate-900"
              >
                I already have an account
              </Link>
            </div>
          </div>

          <div className="landing-fade-up-delay rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-[0_30px_60px_rgba(15,23,42,0.1)] backdrop-blur-sm sm:p-6">
            <div className="rounded-2xl bg-slate-900 p-5 text-white sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                Service request preview
              </p>
              <h2 className={`${headingFont.className} mt-3 text-2xl font-bold`}>
                Downtown Garage
              </h2>
              <p className="mt-2 text-sm text-slate-300">Open today until 7:00 PM</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/8 p-3">
                  <p className="text-xs text-slate-300">Distance</p>
                  <p className="mt-1 font-semibold">1.4 km</p>
                </div>
                <div className="rounded-xl bg-white/8 p-3">
                  <p className="text-xs text-slate-300">Availability</p>
                  <p className="mt-1 font-semibold text-indigo-200">Today 3:30 PM</p>
                </div>
                <div className="col-span-2 rounded-xl bg-white/8 p-3">
                  <p className="text-xs text-slate-300">Requested service</p>
                  <p className="mt-1 font-semibold">Brake inspection + oil change</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Active garages", value: "120+" },
                { label: "Appointments", value: "2.4k" },
                { label: "Avg response", value: "< 15m" },
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-3 text-center">
                  <p className="text-lg font-bold text-slate-900">{metric.value}</p>
                  <p className="text-xs text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className={`landing-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.06)] [animation-delay:${index * 110}ms]`}
              >
                <div className="mb-4 inline-flex rounded-xl bg-slate-100 p-3 text-slate-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={`${headingFont.className} text-xl font-bold text-slate-900`}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
              </article>
            );
          })}
        </div>

        <GaragesMapSection />

        <footer className="landing-fade-up mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className={`${headingFont.className} text-xl font-bold text-slate-900`}>
              Ready to simplify your vehicle service process?
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Join the platform and request your first appointment today.
            </p>
          </div>
          <Link
            href="/register/address"
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:mt-0"
          >
            Create free account
          </Link>
        </footer>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500">
          <p>Garage Locator Platform</p>
          <p className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure access for business owners
          </p>
        </div>
      </section>
    </main>
  );
}
