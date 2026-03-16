import { Bell, ChevronDown, Menu, Moon, Search } from "lucide-react";

type HeaderProps = {
  onToggle: () => void;
};

export function Header({ onToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#f4f7fb]/90 backdrop-blur">
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
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-400" />
          </button>
          <button className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-sky-400 to-indigo-500" />
            <span className="text-sm font-medium text-slate-700">Musharof</span>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
