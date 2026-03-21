"use client";

import { useEffect, useState } from "react";
import { Header } from "@/presentation/web/components/dashboard/Header";
import { Sidebar } from "@/presentation/web/components/dashboard/Sidebar";
import { DashboardOverviewSection } from "@/presentation/web/components/dashboard/sections/DashboardOverviewSection";
import { CalendarSection } from "@/presentation/web/components/dashboard/sections/CalendarSection";
import { ProfileSection } from "@/presentation/web/components/dashboard/sections/ProfileSection";
import { MapSection } from "@/presentation/web/components/dashboard/sections/MapSection";
import { DashboardSection } from "@/presentation/web/components/dashboard/types";

function getInitialUserName(): string {
  if (typeof window === "undefined") {
    return "User";
  }

  const storedName = localStorage.getItem("auth_user_name")?.trim();
  if (storedName) {
    return storedName;
  }

  const token = localStorage.getItem("auth_token");
  if (!token) {
    return "User";
  }

  try {
    const payloadSegment = token.split(".")[1];
    if (!payloadSegment) {
      return "User";
    }

    const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(window.atob(paddedBase64)) as { email?: string };
    return payload.email?.split("@")[0]?.trim() || "User";
  } catch {
    return "User";
  }
}

export default function DashboardPage() {
  const [manualCollapsed, setManualCollapsed] = useState(false);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>("dashboard");
  const [userName] = useState(getInitialUserName);

  const visualCollapsed = manualCollapsed && !hoverExpanded;

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <div className="flex">
        <Sidebar
          visualCollapsed={visualCollapsed}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onHoverCollapse={() => {
            if (manualCollapsed) setHoverExpanded(true);
          }}
          onHoverRestore={() => setHoverExpanded(false)}
        />
        <div className="flex-1">
          <Header onToggle={() => setManualCollapsed((prev) => !prev)} userName={userName} />
          <main className="p-6">
            {activeSection === "dashboard" && <DashboardOverviewSection ready={ready} />}

            {activeSection === "calendar" && <CalendarSection />}
            {activeSection === "profile" && <ProfileSection />}
            {activeSection === "map" && <MapSection />}
          </main>
        </div>
      </div>
    </div>
  );
}