"use client";

import { useEffect, useState } from "react";
import { Header } from "@/presentation/web/components/dashboard/Header";
import { Sidebar } from "@/presentation/web/components/dashboard/Sidebar";
import { DashboardOverviewSection } from "@/presentation/web/components/dashboard/sections/DashboardOverviewSection";
import { CalendarSection } from "@/presentation/web/components/dashboard/sections/CalendarSection";
import { ProfileSection } from "@/presentation/web/components/dashboard/sections/ProfileSection";
import { MapSection } from "@/presentation/web/components/dashboard/sections/MapSection";
import { DashboardSection } from "@/presentation/web/components/dashboard/types";

export default function DashboardPage() {
  const [manualCollapsed, setManualCollapsed] = useState(false);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>("dashboard");

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
          <Header onToggle={() => setManualCollapsed((prev) => !prev)} />
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