"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/presentation/web/components/dashboard/Card";

type AvailabilityItem = {
  day: string;
  opensAt: string;
  closesAt: string;
  isClosed: boolean;
};

type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

type BusinessProfile = {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  businessEmail: string;
  formattedAddress: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  availability: AvailabilityItem[];
  createdAt: string;
};

type ProfileResponse = {
  user: UserProfile;
  business: BusinessProfile | null;
};

type ProfileFormState = {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  ownerName: string;
  phone: string;
  businessEmail: string;
  formattedAddress: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  lat: string;
  lng: string;
};

function toFormState(profile: ProfileResponse): ProfileFormState {
  return {
    firstName: profile.user.firstName,
    lastName: profile.user.lastName,
    email: profile.user.email,
    businessName: profile.business?.name ?? "",
    ownerName: profile.business?.ownerName ?? "",
    phone: profile.business?.phone ?? "",
    businessEmail: profile.business?.businessEmail ?? "",
    formattedAddress: profile.business?.formattedAddress ?? "",
    street: profile.business?.street ?? "",
    city: profile.business?.city ?? "",
    province: profile.business?.province ?? "",
    country: profile.business?.country ?? "",
    postalCode: profile.business?.postalCode ?? "",
    lat: profile.business ? String(profile.business.lat) : "",
    lng: profile.business ? String(profile.business.lng) : "",
  };
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function dayLabel(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export function ProfileSection() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [form, setForm] = useState<ProfileFormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("You must be logged in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const res = await fetch("/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.error || "Unable to load profile");
        }

        setProfile(data);
        setForm(toFormState(data));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const fullName = useMemo(() => {
    const user = profile?.user;
    if (!user) return "";
    return `${user.firstName} ${user.lastName}`.trim();
  }, [profile]);

  const initials = useMemo(() => {
    const user = profile?.user;
    if (!user) return "U";
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }, [profile]);

  const detailsGridClass = "rounded-xl border border-slate-200 bg-white p-4";

  const inputClassName =
    "mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const canShowProfile = !loading && !error && profile;

  const handleChange = (field: keyof ProfileFormState, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleEdit = () => {
    if (!profile) return;
    setForm(toFormState(profile));
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!profile) return;
    setForm(toFormState(profile));
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!profile || !form) return;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }

    const payload = {
      user: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
      },
      business: profile.business
        ? {
            name: form.businessName.trim(),
            ownerName: form.ownerName.trim(),
            phone: form.phone.trim(),
            businessEmail: form.businessEmail.trim(),
            formattedAddress: form.formattedAddress.trim(),
            street: form.street.trim(),
            city: form.city.trim(),
            province: form.province.trim(),
            country: form.country.trim(),
            postalCode: form.postalCode.trim(),
            lat: Number(form.lat),
            lng: Number(form.lng),
          }
        : undefined,
    };

    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/profile/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Unable to update profile");
      }

      setProfile(data);
      setForm(toFormState(data));
      setIsEditing(false);
      localStorage.setItem("auth_user_name", `${data.user.firstName} ${data.user.lastName}`.trim());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-slate-900">Profile</h2>
          <p className="text-slate-500">Account and business data linked to your current session.</p>
        </div>
        {canShowProfile && (
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Edit profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {loading && <p className="text-sm text-slate-500">Loading profile...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && profile && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-[#171a5d] text-xl font-semibold text-white">
              {initials}
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-900">{fullName || "N/A"}</p>
              <p className="text-slate-600">{profile.user.email}</p>
              <p className="mt-1 text-sm text-slate-500">
                Member since: {formatDate(profile.user.createdAt)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">User Information</h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className={detailsGridClass}>
                <p className="text-xs uppercase tracking-wide text-slate-500">First Name</p>
                {isEditing && form ? (
                  <input
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={inputClassName}
                  />
                ) : (
                  <p className="mt-1 font-medium text-slate-900">{profile.user.firstName || "N/A"}</p>
                )}
              </div>
              <div className={detailsGridClass}>
                <p className="text-xs uppercase tracking-wide text-slate-500">Last Name</p>
                {isEditing && form ? (
                  <input
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={inputClassName}
                  />
                ) : (
                  <p className="mt-1 font-medium text-slate-900">{profile.user.lastName || "N/A"}</p>
                )}
              </div>
              <div className={detailsGridClass}>
                <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                {isEditing && form ? (
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={inputClassName}
                  />
                ) : (
                  <p className="mt-1 font-medium text-slate-900">{profile.user.email}</p>
                )}
              </div>
              <div className={detailsGridClass}>
                <p className="text-xs uppercase tracking-wide text-slate-500">User ID</p>
                <p className="mt-1 break-all font-medium text-slate-900">{profile.user.id}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">Garage Information</h3>
            {!profile.business ? (
              <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                No garage information is linked to this account yet.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Business Name</p>
                    {isEditing && form ? (
                      <input
                        value={form.businessName}
                        onChange={(e) => handleChange("businessName", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.name}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Owner Name</p>
                    {isEditing && form ? (
                      <input
                        value={form.ownerName}
                        onChange={(e) => handleChange("ownerName", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.ownerName}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Phone</p>
                    {isEditing && form ? (
                      <input
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.phone}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Business Email</p>
                    {isEditing && form ? (
                      <input
                        type="email"
                        value={form.businessEmail}
                        onChange={(e) => handleChange("businessEmail", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.businessEmail}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Address</p>
                    {isEditing && form ? (
                      <input
                        value={form.formattedAddress}
                        onChange={(e) => handleChange("formattedAddress", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.formattedAddress}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Street</p>
                    {isEditing && form ? (
                      <input
                        value={form.street}
                        onChange={(e) => handleChange("street", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.street}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">City</p>
                    {isEditing && form ? (
                      <input
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.city}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Province</p>
                    {isEditing && form ? (
                      <input
                        value={form.province}
                        onChange={(e) => handleChange("province", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.province}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Country</p>
                    {isEditing && form ? (
                      <input
                        value={form.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.country}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Postal Code</p>
                    {isEditing && form ? (
                      <input
                        value={form.postalCode}
                        onChange={(e) => handleChange("postalCode", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.postalCode}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Latitude</p>
                    {isEditing && form ? (
                      <input
                        type="number"
                        step="any"
                        value={form.lat}
                        onChange={(e) => handleChange("lat", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.lat}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Longitude</p>
                    {isEditing && form ? (
                      <input
                        type="number"
                        step="any"
                        value={form.lng}
                        onChange={(e) => handleChange("lng", e.target.value)}
                        className={inputClassName}
                      />
                    ) : (
                      <p className="mt-1 font-medium text-slate-900">{profile.business.lng}</p>
                    )}
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Business ID</p>
                    <p className="mt-1 break-all font-medium text-slate-900">{profile.business.id}</p>
                  </div>
                  <div className={detailsGridClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Created At</p>
                    <p className="mt-1 font-medium text-slate-900">{formatDate(profile.business.createdAt)}</p>
                  </div>
                </div>

                <div className={detailsGridClass}>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Availability</p>
                  {profile.business.availability.length === 0 ? (
                    <p className="mt-1 text-sm text-slate-500">No availability configured.</p>
                  ) : (
                    <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                      {profile.business.availability.map((item) => (
                        <div key={item.day} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                          <span className="font-medium text-slate-700">{dayLabel(item.day)}: </span>
                          <span className="text-slate-600">
                            {item.isClosed ? "Closed" : `${item.opensAt} - ${item.closesAt}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
