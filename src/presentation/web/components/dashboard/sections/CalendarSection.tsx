import { Card } from "@/presentation/web/components/dashboard/Card";

export function CalendarSection() {
  return (
    <Card className="p-6">
      <h2 className="mb-2 text-2xl font-semibold text-slate-900">Calendar</h2>
      <p className="mb-6 text-slate-500">This is a navigation test view for your calendar module.</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { day: "Monday", task: "Team standup" },
          { day: "Wednesday", task: "Client review" },
          { day: "Friday", task: "Deployment window" },
        ].map((item) => (
          <div key={item.day} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">{item.day}</p>
            <p className="mt-2 font-medium text-slate-800">{item.task}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
