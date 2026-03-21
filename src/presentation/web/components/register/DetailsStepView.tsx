"use client";

import type {
  AddressData,
  BusinessAvailability,
} from "@/presentation/web/context/RegisterContext";
import { RegisterShell } from "@/presentation/web/components/register/RegisterShell";

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
      <RegisterShell
        stepLabel="Step 2 of 3"
        title="Business Details"
        subtitle="No address was found in the current flow."
      >
        <p className="text-sm text-slate-600">Please return to the previous step and search your address again.</p>
        <button
          onClick={onGoBack}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Go back
        </button>
      </RegisterShell>
    );
  }

  return (
    <RegisterShell
      stepLabel="Step 2 of 3"
      title="Business Details"
      subtitle="Complete your business profile and set the weekly availability."
    >
      <div className="space-y-5">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Selected Address</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{address.formattedAddress}</p>
          <p className="text-xs text-slate-500">
            {address.city}, {address.province}, {address.country}
          </p>
          <button
            onClick={onEditAddress}
            className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Edit address
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Business name</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={businessName}
              onChange={(e) => onBusinessNameChange(e.target.value)}
              placeholder="Business Name"
            />
            {errors.businessName && <p className="mt-1.5 text-xs text-red-500">{errors.businessName}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Owner name</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={ownerName}
              onChange={(e) => onOwnerNameChange(e.target.value)}
              placeholder="Owner Name"
            />
            {errors.ownerName && <p className="mt-1.5 text-xs text-red-500">{errors.ownerName}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone number</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Phone Number"
            />
            {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Business email</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={businessEmail}
              onChange={(e) => onBusinessEmailChange(e.target.value)}
              placeholder="Business Email"
            />
            {errors.businessEmail && <p className="mt-1.5 text-xs text-red-500">{errors.businessEmail}</p>}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Business Availability</h2>

          <div className="space-y-3">
            {availability.map((slot) => {
              const availabilityDayLabel = slot.day[0].toUpperCase() + slot.day.slice(1);

              return (
                <div key={slot.day} className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-slate-800">{availabilityDayLabel}</span>

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
                      className="rounded-lg border border-slate-200 bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      value={slot.opensAt}
                      disabled={slot.isClosed}
                      onChange={(e) => onDayOpensAtChange(slot.day, e.target.value)}
                    />
                    <input
                      type="time"
                      className="rounded-lg border border-slate-200 bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      value={slot.closesAt}
                      disabled={slot.isClosed}
                      onChange={(e) => onDayClosesAtChange(slot.day, e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {errors.availability && <p className="mt-2 text-sm text-red-500">{errors.availability}</p>}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onGoNext}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Continue
          </button>
        </div>
      </div>
    </RegisterShell>
  );
};