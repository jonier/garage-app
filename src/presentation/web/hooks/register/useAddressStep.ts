"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister, type AddressData } from "@/presentation/web/context/RegisterContext";

export const useAddressStep = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<AddressData | null>(null);
  const router = useRouter();
  const { setState } = useRegister();

  async function handleSearch() {
    const res = await fetch("/api/maps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    const data = (await res.json());
    setResult(data);
    setState((prev) => ({ ...prev, address: data }));
    router.push("/register/details");
  }

  return {
    address,
    setAddress,
    result,
    handleSearch,
  };
};
