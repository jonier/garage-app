"use client";

import { AddressStepView } from "@/presentation/web/components/register/AddressStepView";
import { useAddressStep } from "@/presentation/web/hooks/register/useAddressStep";

export default function AddressStep() {
  const { address, setAddress, result, handleSearch } = useAddressStep();

  return (
    <AddressStepView
      address={address}
      result={result}
      onAddressChange={setAddress}
      onSearch={handleSearch}
    />
  );
}
