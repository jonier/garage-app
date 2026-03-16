"use client";

import { useRouter } from "next/navigation";
import { useRegister } from "@/presentation/web/context/RegisterContext";
import { useState } from "react";

type UseDetailsStepErrors = {
  businessName?: string;
  ownerName?: string;
  phone?: string;
  businessEmail?: string;
};

export const useDetailsStep = () => {
  const router = useRouter();
  const { state, setState } = useRegister();
  const [errors, setErrors] = useState<UseDetailsStepErrors>({});

  const address = state.address;

  const [businessName, setBusinessNameState] = useState(state.businessName ?? "");
  const [ownerName, setOwnerNameState] = useState(state.ownerName ?? "");
  const [phone, setPhoneState] = useState(state.phone ?? "");
  const [businessEmail, setBusinessEmailState] = useState(state.businessEmail ?? "");

  const setBusinessName = (value: string) => {
    setBusinessNameState(value);
    setErrors((prev) => ({ ...prev, businessName: undefined }));
  };

  const setOwnerName = (value: string) => {
    setOwnerNameState(value);
    setErrors((prev) => ({ ...prev, ownerName: undefined }));
  };

  const setPhone = (value: string) => {
    setPhoneState(value);
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const setBusinessEmail = (value: string) => {
    setBusinessEmailState(value);
    setErrors((prev) => ({ ...prev, businessEmail: undefined }));
  };

  const goToAddress = () => {
    router.push("/register/address");
  };

  const saveDetailsInState = () => {
    setState((prev) => ({
      ...prev,
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      businessEmail: businessEmail.trim(),
    }));
  };

  const saveAndEditAddress = () => {
    saveDetailsInState();
    goToAddress();
  };

  const goToNextStep = () => {

    const businessNameValue = businessName.trim();
    const ownerNameValue = ownerName.trim();
    const phoneValue = phone.trim();
    const businessEmailValue = businessEmail.trim();

    if (!businessNameValue || !ownerNameValue || !phoneValue || !businessEmailValue) {
      setErrors({
        businessName: !businessNameValue ? "Business name is required" : undefined,
        ownerName: !ownerNameValue ? "Owner name is required" : undefined,
        phone: !phoneValue ? "Phone number is required" : undefined,
        businessEmail: !businessEmailValue ? "Business email is required" : undefined,
      });
      return;
    }

    saveDetailsInState();
    setErrors({});
    router.push("/register/credentials");
  }

  return {
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
  };
};
