import {
  BarChart3,
  Calendar,
  Clock3,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
import { DashboardSection } from "@/presentation/web/components/dashboard/types";

type SidebarProps = {
  visualCollapsed: boolean;
  activeSection: DashboardSection;
  onSelectSection: (section: DashboardSection) => void;
  onHoverCollapse: () => void;
  onHoverRestore: () => void;
};

export function Sidebar({
  visualCollapsed,
  activeSection,
  onSelectSection,
  onHoverCollapse,
  onHoverRestore,
}: SidebarProps) {
  const mainItems = [
    { icon: LayoutDashboard, label: "Dashboard", section: "dashboard" as const },
    { icon: User, label: "Users" },
    { icon: Calendar, label: "Calendar", section: "calendar" as const },
    { icon: Users, label: "Profile", section: "profile" as const },
    { icon: Clock3, label: "History" },
  ];

  return (
    <aside
      onMouseEnter={onHoverCollapse}
      onMouseLeave={onHoverRestore}
      className={`sticky top-0 h-screen bg-white transition-all duration-300 ${visualCollapsed ? "w-20" : "w-65"}`}
    >
      <div
        className={`flex h-full flex-col border-r border-slate-200 transition-all duration-300 ${visualCollapsed ? "w-20" : "w-65"}`}
      >
        <div
          className={`flex h-18.5 items-center border-b border-slate-200 ${visualCollapsed ? "justify-center px-0" : "gap-3 px-5"}`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <BarChart3 className="h-5 w-5" />
          </div>

          {!visualCollapsed && (
            <span className="text-2xl font-bold text-slate-900">TailAdmin</span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className={`space-y-2 ${visualCollapsed ? "px-3" : "px-4"}`}>
            {mainItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.section ? activeSection === item.section : false;

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (item.section) onSelectSection(item.section);
                  }}
                  className={`group flex w-full items-center rounded-xl transition ${visualCollapsed ? "justify-center px-0 py-3" : "justify-start gap-3 px-4 py-3"} ${isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"}`}
                  title={visualCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!visualCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </aside>
  );
}
