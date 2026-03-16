import { Box, MoreHorizontal, Users } from "lucide-react";
import { Card } from "@/presentation/web/components/dashboard/Card";

type DashboardOverviewSectionProps = {
  ready: boolean;
};

export function DashboardOverviewSection({ ready }: DashboardOverviewSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <div className="xl:col-span-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card
            className={`p-6 transition-all duration-500 ${ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            style={{ transitionDelay: "40ms" }}
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Customers</p>
                <h3 className="mt-2 text-4xl font-bold text-slate-900">3,782</h3>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600">
                ↑ 11.01%
              </span>
            </div>
          </Card>

          <Card
            className={`p-6 transition-all duration-500 ${ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            style={{ transitionDelay: "120ms" }}
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <Box className="h-5 w-5" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">Orders</p>
                <h3 className="mt-2 text-4xl font-bold text-slate-900">5,359</h3>
              </div>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-600">
                ↓ 9.05%
              </span>
            </div>
          </Card>
        </div>

        <Card
          className={`p-6 transition-all duration-500 ${ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ transitionDelay: "180ms" }}
        >
          <h3 className="mb-6 text-xl font-semibold text-slate-900">Monthly Sales</h3>
          <div className="flex h-64 items-end gap-6">
            {[160, 380, 190, 290, 180, 180, 285, 100, 200, 385, 275, 100].map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-52 items-end">
                  <div
                    className="w-5 rounded-t-xl bg-indigo-500 transition-all duration-700 ease-out"
                    style={{
                      height: ready ? `${value}px` : "0px",
                      transitionDelay: `${120 + i * 35}ms`,
                    }}
                  />
                </div>
                <span className="text-xs text-slate-500">
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          className={`p-6 transition-all duration-500 ${ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ transitionDelay: "260ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Statistics</h3>
              <p className="text-sm text-slate-500">Target you&apos;ve set for each month</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-1">
                <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium">Monthly</button>
                <button className="px-4 py-2 text-sm text-slate-500">Quarterly</button>
                <button className="px-4 py-2 text-sm text-slate-500">Annually</button>
              </div>

              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                Mar 10 to Mar 16
              </button>
            </div>
          </div>

          <div className="h-72 rounded-2xl bg-linear-to-b from-indigo-100/60 to-white" />
        </Card>
      </div>

      <div className="xl:col-span-4">
        <Card
          className={`p-6 transition-all duration-500 ${ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
          style={{ transitionDelay: "220ms" }}
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Monthly Target</h3>
              <p className="text-sm text-slate-500">Target you&apos;ve set for each month</p>
            </div>
            <MoreHorizontal className="h-5 w-5 text-slate-400" />
          </div>

          <div className="flex justify-center py-6">
            <div className="flex h-52 w-52 items-center justify-center rounded-full border-14 border-slate-200 border-t-indigo-500 border-l-indigo-500 rotate-45">
              <div className="-rotate-45 text-center">
                <p className="text-5xl font-bold text-slate-900">75.55%</p>
                <span className="mt-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                  +10%
                </span>
              </div>
            </div>
          </div>

          <p className="mx-auto max-w-sm text-center text-sm leading-6 text-slate-500">
            You earn <span className="font-semibold text-slate-700">$3287</span> today, it&apos;s higher than
            last month. Keep up your good work!
          </p>

          <div className="mt-8 grid grid-cols-3 border-t border-slate-100 pt-6 text-center">
            <div>
              <p className="text-sm text-slate-500">Target</p>
              <p className="mt-1 text-2xl font-semibold">$20K</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Revenue</p>
              <p className="mt-1 text-2xl font-semibold">$20K</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Today</p>
              <p className="mt-1 text-2xl font-semibold">$20K</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
