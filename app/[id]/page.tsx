// app/[id]/page.tsx
import Link from "next/link";

interface PasteData {
  id: string;
  content: string;
  created_at: string;
  expires_at: string | null;
  view_count: number;
  max_views: number | null;
}

interface PageProps {
  params: { id: string };
}

// Helper to fetch paste safely
async function getPaste(id: string): Promise<PasteData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    const res = await fetch(`${baseUrl}/api/paste/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error("Error fetching paste:", err);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const paste = await getPaste(id);

  // Fallback if paste not found or error occurs
  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Paste not found 😞</h1>
          <p className="text-gray-600 mb-4">
            The paste with ID <strong>{id}</strong> does not exist or could not be loaded.
          </p>
          <Link
            href="/"
            className="inline-block text-indigo-600 font-medium hover:underline"
          >
            Create a new paste
          </Link>
        </div>
      </div>
    );
  }

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
