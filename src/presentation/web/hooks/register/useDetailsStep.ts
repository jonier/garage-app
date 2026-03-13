"use client";

import { useRouter } from "next/navigation";
import { useRegister } from "@/presentation/web/context/RegisterContext";
import { useState } from "react";

export const useDetailsStep = () => {
  const router = useRouter();
  const { state, setState } = useRegister();

  const address = state.address;

  const [businessName, setBusinessName] = useState(state.businessName ?? "");
  const [ownerName, setOwnerName] = useState(state.ownerName ?? "");
  const [phone, setPhone] = useState(state.phone ?? "");
  const [businessEmail, setBusinessEmail] = useState(state.businessEmail ?? "");

  const goToAddress = () => {
    router.push("/register/address");
  };

  const saveDetailsInState = () => {
    setState((prev) => ({
      ...prev,
      businessName,
      ownerName,
      phone,
      businessEmail,
    }));
  };

  const saveAndEditAddress = () => {
    saveDetailsInState();
    goToAddress();
  };

  const goToNextStep = () => {
    saveDetailsInState();
    router.push("/register/credentials");
  }

  return {
    address,
    businessName,
    ownerName,
    phone,
    businessEmail,
    setBusinessName,
    setOwnerName,
    setPhone,
    setBusinessEmail,
    goToAddress,
    goToNextStep,
    saveAndEditAddress,
  };
};
