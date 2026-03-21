"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Moon, Search } from "lucide-react";

type HeaderProps = {
  onToggle: () => void;
  userName: string;
};

export function Header({ onToggle, userName }: HeaderProps) {
  const router = useRouter();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const normalizedName = userName.trim() || "User";
  const nameParts = normalizedName.split(/\s+/).filter(Boolean);
  const initials = `${nameParts[0]?.[0] ?? "U"}${nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : ""}`.toUpperCase();
  const displayName = `${normalizedName[0].toUpperCase()}${normalizedName.slice(1)}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user_name");
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-100/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex flex-1 items-center gap-4">
          <button
            onClick={onToggle}
            className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              placeholder="Search or type command..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <span className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-400">
              ⌘ K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 bg-white p-3">
            <Moon className="h-5 w-5 text-slate-600" />
          </button>
          <button className="relative rounded-full border border-slate-200 bg-white p-3">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-indigo-500" />
          </button>
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setOpenUserMenu((prev) => !prev)}
              className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-[#171a5d] text-sm font-semibold text-white">
                {initials}
              </div>
              <span className="text-sm font-medium text-slate-700">{displayName}</span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>

            {openUserMenu && (
              <div className="absolute right-0 z-30 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
