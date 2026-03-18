"use client";

import type {
  AddressData,
  BusinessAvailability,
} from "@/presentation/web/context/RegisterContext";

type DetailsStepViewProps = {
  address?: AddressData;
  businessName: string;
  ownerName: string;
  phone: string;
  businessEmail: string;
  availability: BusinessAvailability[];
  errors: {
    businessName?: string;
    ownerName?: string;
    phone?: string;
    businessEmail?: string;
    availability?: string;
  };
  onBusinessNameChange: (value: string) => void;
  onOwnerNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onBusinessEmailChange: (value: string) => void;
  onDayClosedChange: (day: BusinessAvailability["day"], isClosed: boolean) => void;
  onDayOpensAtChange: (day: BusinessAvailability["day"], value: string) => void;
  onDayClosesAtChange: (day: BusinessAvailability["day"], value: string) => void;
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
  availability,
  errors,
  onBusinessNameChange,
  onOwnerNameChange,
  onPhoneChange,
  onBusinessEmailChange,
  onDayClosedChange,
  onDayOpensAtChange,
  onDayClosesAtChange,
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

      <div className="mb-6 mt-6">
        <h2 className="mb-3 text-lg font-semibold">Business Availability</h2>

        <div className="space-y-3">
          {availability.map((slot) => {
            const dayLabel = slot.day[0].toUpperCase() + slot.day.slice(1);

            return (
              <div key={slot.day} className="rounded border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{dayLabel}</span>

                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={slot.isClosed}
                      onChange={(e) => onDayClosedChange(slot.day, e.target.checked)}
                    />
                    Closed
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    type="time"
                    className="border p-2"
                    value={slot.opensAt}
                    disabled={slot.isClosed}
                    onChange={(e) => onDayOpensAtChange(slot.day, e.target.value)}
                  />
                  <input
                    type="time"
                    className="border p-2"
                    value={slot.closesAt}
                    disabled={slot.isClosed}
                    onChange={(e) => onDayClosesAtChange(slot.day, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {errors.availability && <p className="mt-2 text-red-500">{errors.availability}</p>}
      </div>

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