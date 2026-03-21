"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

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

export function GaragesMapSection() {
  const [garages, setGarages] = useState<BusinessLocation[]>([]);
  const [activeGarageId, setActiveGarageId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersLayerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const markerByIdRef = useRef<Map<string, import("leaflet").Marker>>(new Map());

  useEffect(() => {
    const loadGarages = async () => {
      try {
        setError(null);

        const res = await fetch("/api/business/locations");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load garages");
        }

        setGarages(data);
        if (data.length > 0) {
          setActiveGarageId(data[0].id);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    void loadGarages();
  }, []);

  const activeGarage = useMemo(() => {
    return garages.find((garage) => garage.id === activeGarageId) ?? garages[0] ?? null;
  }, [garages, activeGarageId]);

  useEffect(() => {
    let cancelled = false;

    const renderMap = async () => {
      if (!mapContainerRef.current || garages.length === 0) {
        return;
      }

      const L = await import("leaflet");
      if (cancelled || !mapContainerRef.current) {
        return;
      }

      if (!mapRef.current) {
        mapRef.current = L.map(mapContainerRef.current, {
          zoomControl: true,
          scrollWheelZoom: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);

        markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
      }

      markersLayerRef.current?.clearLayers();
      markerByIdRef.current.clear();

      const bounds = L.latLngBounds(garages.map((garage) => [garage.lat, garage.lng] as [number, number]));
      const garagePinIcon = L.divIcon({
        className: "",
        iconSize: [22, 30],
        iconAnchor: [11, 30],
        popupAnchor: [0, -28],
        html: `
          <div style="position:relative;width:22px;height:30px;">
            <span style="position:absolute;left:50%;top:0;width:18px;height:18px;background:#4f46e5;border:2px solid #ffffff;border-radius:9999px;transform:translateX(-50%);box-shadow:0 6px 14px rgba(79,70,229,0.45);"></span>
            <span style="position:absolute;left:50%;top:15px;width:10px;height:14px;background:#4f46e5;clip-path:polygon(50% 100%,0 0,100% 0);transform:translateX(-50%);"></span>
            <span style="position:absolute;left:50%;top:6px;width:6px;height:6px;background:#ffffff;border-radius:9999px;transform:translateX(-50%);"></span>
          </div>
        `,
      });

      for (const garage of garages) {
        const marker = L.marker([garage.lat, garage.lng], { icon: garagePinIcon }).bindPopup(
          `<strong>${garage.name}</strong><br/>${garage.formattedAddress}`
        );

        marker.on("click", () => {
          setActiveGarageId(garage.id);
        });

        marker.addTo(markersLayerRef.current!);
        markerByIdRef.current.set(garage.id, marker);
      }

      if (bounds.isValid()) {
        mapRef.current.fitBounds(bounds.pad(0.2));
      }
    };

    void renderMap();

    return () => {
      cancelled = true;
    };
  }, [garages]);

  useEffect(() => {
    if (!activeGarage) {
      return;
    }

    const marker = markerByIdRef.current.get(activeGarage.id);
    if (!marker || !mapRef.current) {
      return;
    }

    mapRef.current.flyTo([activeGarage.lat, activeGarage.lng], Math.max(mapRef.current.getZoom(), 13), {
      duration: 0.5,
    });
    marker.openPopup();
  }, [activeGarage]);

  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  return (
    <section className="landing-fade-up mt-14 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_55px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Garages on the map</h2>
        <p className="text-sm leading-7 text-slate-600 sm:text-base">
          Explore registered garages from our platform and choose where to request your next appointment.
        </p>
      </div>

      {loading && <p className="text-sm text-slate-500">Loading garages map...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && garages.length === 0 && (
        <p className="text-sm text-slate-500">No garages available yet.</p>
      )}

      {!loading && !error && garages.length > 0 && activeGarage && (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div ref={mapContainerRef} className="h-85 w-full sm:h-105" />
          </div>

          <div className="max-h-105 space-y-3 overflow-y-auto pr-1">
            {garages.map((garage) => {
              const isActive = garage.id === activeGarage.id;

              return (
                <button
                  key={garage.id}
                  onClick={() => setActiveGarageId(garage.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="text-base font-semibold text-slate-900">{garage.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{garage.formattedAddress}</p>
                  <p className="text-xs text-slate-500">
                    {garage.city}, {garage.province}, {garage.country}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
