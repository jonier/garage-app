"use client";
import { useRouter } from "next/navigation";
import { CredentialsStepView } from "@/presentation/web/components/register/CredentialsStepView";
import { useCreateCredentialAndBusiness } from "@/presentation/web/hooks/register/useCreateCredentialAndBusiness";

const CredentialsStep = () => {
  const router = useRouter();

  const {
    canProceed,
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
  } = useCreateCredentialAndBusiness();

  return (
    <CredentialsStepView
      canProceed={canProceed}
      firstName={firstName}
      lastName={lastName}
      email={email}
      password={password}
      loading={loading}
      error={error}
      errors={errors}
      onFirstNameChange={setFirstName}
      onLastNameChange={setLastName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onGoBack={() => router.push("/register/address")}
      onNext={handleNext}
    />
  );
}

export default CredentialsStep;