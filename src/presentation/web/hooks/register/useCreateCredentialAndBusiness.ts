import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/presentation/web/context/RegisterContext";

export const useCreateCredentialAndBusiness = () => {
  const router = useRouter();
  const { state, setState } = useRegister();

  const [firstName, setFirstName] = useState(state.firstName ?? "");
  const [lastName, setLastName] = useState(state.lastName ?? "");
  const [email, setEmail] = useState(state.email ?? "");
  const [password, setPassword] = useState(state.password ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!state.address || !state.businessName) {
    return {
      error: "Please complete the previous steps first",
      goBack: () => router.push("/register/address"),
    };
  }

  const handleNext = async () => {
    setError(null);
    setLoading(true);

    //Save in context
    setState((prev) => ({ ...prev, firstName, lastName, email, password }));

    const payload = {
      address: state.address,
      businessName: state.businessName,
      ownerName: state.ownerName,
      phone: state.phone,
      businessEmail: state.businessEmail,
      firstName,
      lastName,
      email,
      password,
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
        throw new Error(data.message || "Something went wrong");
      }

      // On success, you might want to redirect the user or show a success message
      router.push("/register/success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};