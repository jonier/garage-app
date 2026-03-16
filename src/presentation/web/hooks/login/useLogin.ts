"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginErrors = {
  email?: string;
  password?: string;
};

export const useLogin = () => {
  const router = useRouter();

  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<LoginErrors>({});

  const setEmail = (value: string) => {
    setEmailState(value);
    setError(null);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const setPassword = (value: string) => {
    setPasswordState(value);
    setError(null);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleLogin = async () => {
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const hasEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    const nextErrors: LoginErrors = {
      email: !emailValue
        ? "Email is required"
        : !hasEmailFormat
          ? "Please enter a valid email"
          : undefined,
      password: !passwordValue ? "Password is required" : undefined,
    };

    if (nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setErrors({});

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to login");
      }

      if (data?.token) {
        localStorage.setItem("auth_token", data.token);
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    errors,
    setEmail,
    setPassword,
    handleLogin,
  };
};
