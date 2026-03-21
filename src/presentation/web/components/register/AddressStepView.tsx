"use client";

import type { AddressData } from "@/presentation/web/context/RegisterContext";
import { RegisterShell } from "@/presentation/web/components/register/RegisterShell";

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
    <RegisterShell
      stepLabel="Step 1 of 3"
      title="Business Address"
      subtitle="Tell us where your garage is located to match nearby drivers."
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="business-address" className="mb-1.5 block text-sm font-medium text-slate-700">
            Full address
          </label>
          <input
            id="business-address"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="123 Rue Example, Montreal"
          />
        </div>

        <button
          onClick={onSearch}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Search Address
        </button>

        {result && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Address found</p>
            <p className="mt-1">{result.formattedAddress}</p>
            <p className="text-xs text-slate-500">
              {result.city}, {result.province}, {result.country}
            </p>
          </div>
        )}
      </div>
    </RegisterShell>
  );
};
