import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/presentation/web/context/RegisterContext";

type CredentialErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

export const useCreateCredentialAndBusiness = () => {
  const router = useRouter();
  const { state, setState } = useRegister();

  const [firstName, setFirstNameState] = useState(state.firstName ?? "");
  const [lastName, setLastNameState] = useState(state.lastName ?? "");
  const [email, setEmailState] = useState(state.email ?? "");
  const [password, setPasswordState] = useState(state.password ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<CredentialErrors>({});

  const setFirstName = (value: string) => {
    setFirstNameState(value);
    setErrors((prev) => ({ ...prev, firstName: undefined }));
  };

  const setLastName = (value: string) => {
    setLastNameState(value);
    setErrors((prev) => ({ ...prev, lastName: undefined }));
  };

  const setEmail = (value: string) => {
    setEmailState(value);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const setPassword = (value: string) => {
    setPasswordState(value);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const canProceed = Boolean(state.address && state.businessName);

  const handleNext = async () => {
    if (!canProceed) {
      setError("Please complete the previous steps first");
      return;
    }

    const firstNameValue = firstName.trim();
    const lastNameValue = lastName.trim();
    const emailValue = email.trim();
    const passwordValue = password.trim();

    const hasEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    const nextErrors: CredentialErrors = {
      firstName: !firstNameValue ? "First name is required" : undefined,
      lastName: !lastNameValue ? "Last name is required" : undefined,
      email: !emailValue
        ? "Email is required"
        : !hasEmailFormat
          ? "Please enter a valid email"
          : undefined,
      password: !passwordValue
        ? "Password is required"
        : passwordValue.length < 8
          ? "Password must be at least 8 characters"
          : undefined,
    };

    if (nextErrors.firstName || nextErrors.lastName || nextErrors.email || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }

    setError(null);
    setErrors({});
    setLoading(true);

    //Save in context
    setState((prev) => ({
      ...prev,
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
    }));

    const payload = {
      address: state.address,
      businessName: state.businessName,
      ownerName: state.ownerName,
      phone: state.phone,
      businessEmail: state.businessEmail,
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password: passwordValue,
    };

    try {
      // Here you would typically send the payload to your backend API
      // For example:
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      // On success, you might want to redirect the user or show a success message
      router.push("/register/success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return {
    canProceed,
    state,
    firstName,
    lastName,
    email,
    password,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    handleNext,
    loading,
    error,
    errors,
  };
};