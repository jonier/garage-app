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
    availability,
    errors,
    setBusinessName,
    setOwnerName,
    setPhone,
    setBusinessEmail,
    setDayClosed,
    setDayOpensAt,
    setDayClosesAt,
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
      availability={availability}
      errors={errors}
      onBusinessNameChange={setBusinessName}
      onOwnerNameChange={setOwnerName}
      onPhoneChange={setPhone}
      onBusinessEmailChange={setBusinessEmail}
      onDayClosedChange={setDayClosed}
      onDayOpensAtChange={setDayOpensAt}
      onDayClosesAtChange={setDayClosesAt}
      onGoBack={goToAddress}
      onGoNext={goToNextStep}
      onEditAddress={saveAndEditAddress}
    />
  );
};

export default DetailsStep;
