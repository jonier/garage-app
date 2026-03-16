"use client";

import type { AddressData } from "@/presentation/web/context/RegisterContext";

type DetailsStepViewProps = {
  address?: AddressData;
  businessName: string;
  ownerName: string;
  phone: string;
  businessEmail: string;
  errors: {
    businessName?: string;
    ownerName?: string;
    phone?: string;
    businessEmail?: string;
  };
  onBusinessNameChange: (value: string) => void;
  onOwnerNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onBusinessEmailChange: (value: string) => void;
  onGoBack: () => void;
  onGoNext: () => void;
  onEditAddress: () => void;
};

export const DetailsStepView: React.FC<DetailsStepViewProps> = ({
  address,
  businessName,
  ownerName,
  phone,
  businessEmail,
  errors,
  onBusinessNameChange,
  onOwnerNameChange,
  onPhoneChange,
  onBusinessEmailChange,
  onGoBack,
  onGoNext,
  onEditAddress,
}) => {
  if (!address) {
    return (
      <div className="p-6">
        <h1 className="text-xl mb-4">No address found</h1>
        <button
          onClick={onGoBack}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Business Details</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Address</h2>
        <p>{address.formattedAddress}</p>
      </div>

      <input
        className="border p-2 w-full mb-4"
        value={businessName}
        onChange={(e) => onBusinessNameChange(e.target.value)}
        placeholder="Business Name"
      />
      {errors.businessName && <p className="text-red-500">{errors.businessName}</p>}
      <input
        className="border p-2 w-full mb-4"
        value={ownerName}
        onChange={(e) => onOwnerNameChange(e.target.value)}
        placeholder="Owner Name"
      />
      {errors.ownerName && <p className="text-red-500">{errors.ownerName}</p>}
      <input
        className="border p-2 w-full mb-4"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="Phone Number"
      />
      {errors.phone && <p className="text-red-500">{errors.phone}</p>}
      <input
        className="border p-2 w-full mb-4"
        value={businessEmail}
        onChange={(e) => onBusinessEmailChange(e.target.value)}
        placeholder="Business Email"
      />
      {errors.businessEmail && <p className="text-red-500">{errors.businessEmail}</p>}
      <button
        onClick={onEditAddress}
        className="text-blue-500 underline mb-4"
      >
        Edit Address
      </button>
      <button
        onClick={onGoNext}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Next
      </button>
    </div>
  );
};