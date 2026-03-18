"use client";

import { useRouter } from "next/navigation";
import { useRegister } from "@/presentation/web/context/RegisterContext";
import { useState } from "react";
import type { BusinessAvailability } from "@/presentation/web/context/RegisterContext";

type UseDetailsStepErrors = {
  businessName?: string;
  ownerName?: string;
  phone?: string;
  businessEmail?: string;
  availability?: string;
};

const weekDays: BusinessAvailability["day"][] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function buildDefaultAvailability(): BusinessAvailability[] {
  return weekDays.map((day) => ({
    day,
    opensAt: "09:00",
    closesAt: "18:00",
    isClosed: day === "sunday",
  }));
}

export const useDetailsStep = () => {
  const router = useRouter();
  const { state, setState } = useRegister();
  const [errors, setErrors] = useState<UseDetailsStepErrors>({});

  const address = state.address;

  const [businessName, setBusinessNameState] = useState(state.businessName ?? "");
  const [ownerName, setOwnerNameState] = useState(state.ownerName ?? "");
  const [phone, setPhoneState] = useState(state.phone ?? "");
  const [businessEmail, setBusinessEmailState] = useState(state.businessEmail ?? "");
  const [availability, setAvailability] = useState<BusinessAvailability[]>(
    state.availability && state.availability.length > 0
      ? state.availability
      : buildDefaultAvailability()
  );

  const clearAvailabilityError = () => {
    setErrors((prev) => ({ ...prev, availability: undefined }));
  };

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

  const setDayClosed = (day: BusinessAvailability["day"], isClosed: boolean) => {
    setAvailability((prev) =>
      prev.map((item) => (item.day === day ? { ...item, isClosed } : item))
    );
    clearAvailabilityError();
  };

  const setDayOpensAt = (day: BusinessAvailability["day"], value: string) => {
    setAvailability((prev) =>
      prev.map((item) => (item.day === day ? { ...item, opensAt: value } : item))
    );
    clearAvailabilityError();
  };

  const setDayClosesAt = (day: BusinessAvailability["day"], value: string) => {
    setAvailability((prev) =>
      prev.map((item) => (item.day === day ? { ...item, closesAt: value } : item))
    );
    clearAvailabilityError();
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
      availability: availability.map((item) => ({
        ...item,
        opensAt: item.opensAt.trim(),
        closesAt: item.closesAt.trim(),
      })),
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
    const hasInvalidAvailability = availability.some((item) => {
      if (item.isClosed) return false;

      const isValidFormat = /^([01]\d|2[0-3]):[0-5]\d$/.test(item.opensAt) &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(item.closesAt);

      return !isValidFormat || item.opensAt >= item.closesAt;
    });

    if (
      !businessNameValue ||
      !ownerNameValue ||
      !phoneValue ||
      !businessEmailValue ||
      hasInvalidAvailability
    ) {
      setErrors({
        businessName: !businessNameValue ? "Business name is required" : undefined,
        ownerName: !ownerNameValue ? "Owner name is required" : undefined,
        phone: !phoneValue ? "Phone number is required" : undefined,
        businessEmail: !businessEmailValue ? "Business email is required" : undefined,
        availability: hasInvalidAvailability
          ? "Please verify opening and closing hours for available days"
          : undefined,
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
  };
};
