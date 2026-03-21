import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <main className="p-6">
      <h1 className="mb-3 text-2xl font-semibold">Registration completed</h1>
      <p className="text-zinc-700">Your account and business were created successfully.</p>

      <Link
        href="/login"
        className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Go to login
      </Link>
    </main>
  );
}