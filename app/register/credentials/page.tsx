"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/presentation/web/context/RegisterContext";
import { useCreateCredentialAndBusiness } from "@/presentation/web/hooks/register/useCreateCredentialAndBusiness";

const CredentialsStep = () => {
  // const router = useRouter();
  // const { state, setState } = useRegister();
  // const [firstName, setFirstName] = useState(state.firstName ?? "");
  // const [lastName, setLastName] = useState(state.lastName ?? "");
  // const [email, setEmail] = useState(state.email ?? "");
  // const [password, setPassword] = useState(state.password ?? "");

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const { firstName, lastName, email, password, setFirstName, setLastName, setEmail, setPassword, handleNext, loading, error } = useCreateCredentialAndBusiness();

  if (!state.address || !state.businessName) {
    return (
      <div className="p-6">
        <h1 className="text-xl mb-4">Please complete the previous steps first</h1>
        <button
          onClick={() => router.push("/register/address")}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }


  // const handleNext = async () => {
  //   setError(null);
  //   setLoading(true);

  //   //Save in context
  //   setState((prev) => ({ ...prev, firstName, lastName, email, password }));

  //   const payload = {
  //     address: state.address,
  //     businessName: state.businessName,
  //     ownerName: state.ownerName,
  //     phone: state.phone,
  //     businessEmail: state.businessEmail,
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //   };

  //   try {
  //     // Here you would typically send the payload to your backend API
  //     // For example:}
  //     const res = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError(data?.error ?? "Failed to register");
  //       setLoading(false);
  //       return;
  //     }

  //     if (data?.token) {
  //       // Save token to localStorage or context
  //       localStorage.setItem("token", data.token);
  //     }

  //     //Clean the state of wizard
  //     //reset();
  //     console.log("Payload to submit:", payload);
  //     router.push("/dashboard");
  //   } catch (err) {
  //     setError("Network error");
  //   } finally {
  //     setLoading(false);
  //   }

  // };


  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Set Up Credentials</h1>
      <input
        className="border p-2 w-full mb-4"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        className="border p-2 w-full mb-4"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        className="border p-2 w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Next
      </button>
    </div>
  );
}

export default CredentialsStep;