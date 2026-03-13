"use client";

import type { AddressData } from "@/presentation/web/context/RegisterContext";

type AddressStepViewProps = {
  address: string;
  result: AddressData | null;
  onAddressChange: (value: string) => void;
  onSearch: () => void;
};

export const AddressStepView: React.FC<AddressStepViewProps> = ({
  address,
  result,
  onAddressChange,
  onSearch,
}) => {
  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Enter Business Address</h1>

      <input
        className="border p-2 w-full"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        placeholder="123 Rue Example, Montreal"
      />

      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Search
      </button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};
