import { Card } from "@/presentation/web/components/dashboard/Card";

export function ProfileSection() {
  return (
    <Card className="p-6">
      <h2 className="mb-2 text-2xl font-semibold text-slate-900">Profile</h2>
      <p className="mb-6 text-slate-500">This is a navigation test view for your profile module.</p>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="h-24 w-24 rounded-full bg-linear-to-br from-sky-400 to-indigo-500" />
        <div>
          <p className="text-xl font-semibold text-slate-900">Musharof</p>
          <p className="text-slate-500">musharof@garage.app</p>
          <p className="mt-2 text-sm text-slate-500">Role: Administrator</p>
        </div>
      </div>
    </Card>
  );
}
