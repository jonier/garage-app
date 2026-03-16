"use client";

import { LoginView } from "@/presentation/web/components/login/LoginView";
import { useLogin } from "@/presentation/web/hooks/login/useLogin";

export default function LoginPage() {
  const {
    email,
    password,
    loading,
    error,
    errors,
    setEmail,
    setPassword,
    handleLogin,
  } = useLogin();

  return (
    <LoginView
      email={email}
      password={password}
      loading={loading}
      error={error}
      errors={errors}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
    />
  );
}
