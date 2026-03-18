"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/presentation/web/components/dashboard/Card";

type BusinessLocation = {
  id: string;
  name: string;
  formattedAddress: string;
  city: string;
  province: string;
  country: string;
  lat: number;
  lng: number;
};

export function MapSection() {
  const [business, setBusiness] = useState<BusinessLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessLocation = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("You must be logged in to view the map.");
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const res = await fetch("/api/business/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load business location");
        }

        setBusiness(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessLocation();
  }, []);

  const mapSrc = useMemo(() => {
    if (!business) return "";
    return `https://maps.google.com/maps?q=${business.lat},${business.lng}&z=15&output=embed`;
  }, [business]);

  return (
    <Card className="p-6">
      <h2 className="mb-2 text-2xl font-semibold text-slate-900">Map</h2>
      <p className="mb-6 text-slate-500">Business location from your registered profile.</p>

      {loading && <p className="text-sm text-slate-500">Loading map...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && business && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Business</p>
            <p className="text-lg font-semibold text-slate-900">{business.name}</p>
            <p className="mt-1 text-sm text-slate-600">{business.formattedAddress}</p>
            <p className="text-xs text-slate-500">
              {business.city}, {business.province}, {business.country}
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Business location map"
              src={mapSrc}
              className="h-105 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
