"use client";

import { RegisterProvider } from "@/presentation/web/context/RegisterContext";

const RegisterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RegisterProvider>
      {children}
    </RegisterProvider>
  );
};

export default RegisterLayout;