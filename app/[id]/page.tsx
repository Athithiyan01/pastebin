// app/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";

interface PasteData {
  id: string;
  content: string;
  created_at: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`/api/paste/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const paste: PasteData = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Paste: {paste.id}</h1>

        <p className="text-sm text-gray-500 mb-2">
          Created: {new Date(paste.created_at).toLocaleString()}
        </p>

        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap break-words">
          {paste.content}
        </pre>

        <Link
          href="/"
          className="inline-block mt-6 text-indigo-600 font-medium hover:underline"
        >
          ← Create New Paste
        </Link>
      </div>
    </div>
  );
}
