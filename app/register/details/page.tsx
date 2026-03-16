"use client";

import { DetailsStepView } from "@/presentation/web/components/register/DetailsStepView";
import { useDetailsStep } from "@/presentation/web/hooks/register/useDetailsStep";

const DetailsStep = () => {
  const {
    address,
    businessName,
    ownerName,
    phone,
    businessEmail,
    errors,
    setBusinessName,
    setOwnerName,
    setPhone,
    setBusinessEmail,
    goToAddress,
    goToNextStep,
    saveAndEditAddress,
  } = useDetailsStep();

  return (
    <DetailsStepView
      address={address}
      businessName={businessName}
      ownerName={ownerName}
      phone={phone}
      businessEmail={businessEmail}
      errors={errors}
      onBusinessNameChange={setBusinessName}
      onOwnerNameChange={setOwnerName}
      onPhoneChange={setPhone}
      onBusinessEmailChange={setBusinessEmail}
      onGoBack={goToAddress}
      onGoNext={goToNextStep}
      onEditAddress={saveAndEditAddress}
    />
  );
};

export default DetailsStep;
