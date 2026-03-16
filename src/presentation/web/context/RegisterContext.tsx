"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AddressData = {
  formattedAddress: string;
  streetNumber: string;
  route: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
};

export type RegisterState = {
  address?: AddressData;
  businessName?: string;
  businessEmail?: string;
  ownerName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  password?: string;
};

type RegisterContextValue = {
  state: RegisterState;
  setState: React.Dispatch<React.SetStateAction<RegisterState>>;
  reset: () => void;
};

const RegisterContext = createContext<RegisterContextValue | null>(null);

const STORAGE_KEY = "register_state_v1";

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<RegisterState>({});

  // useEffect(() => {
  //   const raw = sessionStorage.getItem(STORAGE_KEY);
  //   if (raw) {
  //     setState(JSON.parse(raw));
  //   }
  // }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const reset = () => {
    setState({});
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({
    state, setState, reset
  }), [state]);

  return <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>;
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegisterContext must be used within a RegisterProvider");
  }
  return context;
};