"use client";

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
      <div className="p-6">
        <h1 className="text-xl mb-4">Please complete the previous steps first</h1>
        <button
          onClick={onGoBack}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Set Up Credentials</h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <input
        className="border p-2 w-full mb-4"
        value={firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
        placeholder="First Name"
      />
      {errors.firstName && <p className="mb-3 text-red-500">{errors.firstName}</p>}
      <input
        className="border p-2 w-full mb-4"
        value={lastName}
        onChange={(e) => onLastNameChange(e.target.value)}
        placeholder="Last Name"
      />
      {errors.lastName && <p className="mb-3 text-red-500">{errors.lastName}</p>}
      <input
        className="border p-2 w-full mb-4"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <p className="mb-3 text-red-500">{errors.email}</p>}
      <input
        type="password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <p className="mb-3 text-red-500">{errors.password}</p>}
      <button
        onClick={onNext}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 mt-4 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Next"}
      </button>
    </div>
  );
};
