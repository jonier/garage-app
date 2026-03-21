"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { Card } from "@/presentation/web/components/dashboard/Card";

type Appointment = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customer: string;
  service: string;
  notes?: string;
};

type AppointmentForm = {
  customer: string;
  service: string;
  time: string;
  notes: string;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function monthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatSelectedDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function CalendarSection() {
  const today = new Date();
  const [monthCursor, setMonthCursor] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(toISODate(today));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [form, setForm] = useState<AppointmentForm>({
    customer: "",
    service: "",
    time: "09:00",
    notes: "",
  });

  const year = monthCursor.getFullYear();
  const month = monthCursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;

  const calendarCells = useMemo(() => {
    const leading = Array.from({ length: firstDayOffset }, () => null as number | null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...leading, ...monthDays];
  }, [daysInMonth, firstDayOffset]);

  const appointmentsForSelectedDay = useMemo(() => {
    return appointments
      .filter((appt) => appt.date === selectedDate)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, selectedDate]);

  const appointmentDates = useMemo(() => {
    const set = new Set<string>();
    for (const appt of appointments) set.add(appt.date);
    return set;
  }, [appointments]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("You must log in to load appointments.");
        return;
      }

      try {
        setLoadingAppointments(true);
        setError(null);

        const res = await fetch("/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load appointments");
        }

        setAppointments(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  const prevMonth = () => {
    setMonthCursor(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setMonthCursor(new Date(year, month + 1, 1));
  };

  const handleCreateAppointment = () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("You must log in to create appointments.");
      return;
    }

    const customer = form.customer.trim();
    const service = form.service.trim();
    const time = form.time.trim();

    if (!customer || !service || !time) {
      setError("Customer, service and time are required.");
      return;
    }

    const createAppointment = async () => {
      try {
        setError(null);

        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: selectedDate,
            time,
            customer,
            service,
            notes: form.notes.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to save appointment");
        }

        setAppointments((prev) => [...prev, data]);
        setForm({ customer: "", service: "", time: "09:00", notes: "" });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      }
    };

    void createAppointment();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Appointment</h2>
            <p className="text-slate-500">Manage appointments by day and time.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
            >
              Prev
            </button>
            <span className="min-w-45 text-center text-sm font-medium text-slate-700">
              {monthLabel(monthCursor)}
            </span>
            <button
              onClick={nextMonth}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm text-indigo-700">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Indigo day: at least one interview scheduled
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div key={day} className="px-2 py-1 text-center text-xs font-medium text-slate-500">
              {day}
            </div>
          ))}

          {calendarCells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-12" />;
            }

            const iso = toISODate(new Date(year, month, day));
            const isSelected = iso === selectedDate;
            const hasAppointments = appointmentDates.has(iso);

            return (
              <button
                key={iso}
                onClick={() => setSelectedDate(iso)}
                className={`relative h-12 rounded-lg border text-sm transition ${isSelected
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : hasAppointments
                      ? "border-indigo-300 bg-indigo-50 text-indigo-700 hover:border-indigo-400"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
              >
                {day}
                {hasAppointments && (
                  <span className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-indigo-500" />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-2 text-xl font-semibold text-slate-900">New Appointment</h3>
          <p className="mb-4 text-sm text-slate-500">Selected date: {formatSelectedDate(selectedDate)}</p>

          {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

          <div className="space-y-3">
            <input
              value={form.customer}
              onChange={(e) => setForm((prev) => ({ ...prev, customer: e.target.value }))}
              placeholder="Customer name"
              className="w-full rounded-lg border border-slate-200 p-2.5"
            />
            <input
              value={form.service}
              onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
              placeholder="Service"
              className="w-full rounded-lg border border-slate-200 p-2.5"
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
              className="w-full rounded-lg border border-slate-200 p-2.5"
            />
            <textarea
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Notes (optional)"
              rows={3}
              className="w-full rounded-lg border border-slate-200 p-2.5"
            />
          </div>

          <button
            onClick={handleCreateAppointment}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Save appointment
          </button>
        </Card>

        <Card className="p-6">
          <h3 className="mb-2 text-xl font-semibold text-slate-900">Appointments</h3>
          <p className="mb-4 text-sm text-slate-500">{formatSelectedDate(selectedDate)}</p>

          {loadingAppointments && (
            <p className="mb-3 text-sm text-slate-500">Loading appointments...</p>
          )}

          {appointmentsForSelectedDay.length === 0 ? (
            <p className="text-sm text-slate-500">No appointments for this day yet.</p>
          ) : (
            <div className="space-y-3">
              {appointmentsForSelectedDay.map((appt) => (
                <div key={appt.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-medium text-slate-900">{appt.customer}</p>
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                      {appt.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{appt.service}</p>
                  {appt.notes && <p className="mt-1 text-sm text-slate-500">{appt.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
