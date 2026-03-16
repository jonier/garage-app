"use client";

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
  return (
    <main className="mx-auto w-full max-w-md p-6">
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <input
        className="mb-3 w-full border p-2"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <p className="mb-3 text-red-500">{errors.email}</p>}

      <input
        type="password"
        className="mb-3 w-full border p-2"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <p className="mb-3 text-red-500">{errors.password}</p>}

      <button
        onClick={onLogin}
        disabled={loading}
        className="mt-2 w-full bg-blue-500 px-4 py-2 text-white disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </main>
  );
};
