"use client";

import { RegisterShell } from "@/presentation/web/components/register/RegisterShell";

type CredentialsStepViewProps = {
  canProceed: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  };
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onGoBack: () => void;
  onNext: () => void | Promise<void>;
};

export const CredentialsStepView: React.FC<CredentialsStepViewProps> = ({
  canProceed,
  firstName,
  lastName,
  email,
  password,
  loading,
  error,
  errors,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onGoBack,
  onNext,
}) => {
  if (!canProceed) {
    return (
      <RegisterShell
        stepLabel="Step 3 of 3"
        title="Create Credentials"
        subtitle="Please complete previous steps before creating your account."
      >
        <p className="text-sm text-slate-600">Address and business details are required before this step.</p>
        <button
          onClick={onGoBack}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Go back
        </button>
      </RegisterShell>
    );
  }

  return (
    <RegisterShell
      stepLabel="Step 3 of 3"
      title="Create Credentials"
      subtitle="Set your owner account details to finish onboarding."
    >
      <div className="space-y-4">
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">First Name</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              placeholder="First Name"
            />
            {errors.firstName && <p className="mt-1.5 text-xs text-red-500">{errors.firstName}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Last Name</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              placeholder="Last Name"
            />
            {errors.lastName && <p className="mt-1.5 text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Email"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Password"
          />
          {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onGoBack}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Finish registration"}
          </button>
        </div>
      </div>
    </RegisterShell>
  );
};
