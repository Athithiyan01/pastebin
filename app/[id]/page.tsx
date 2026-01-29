// app/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface PasteData {
  id: string;
  content: string;
  createdAt: string;
  expiresAt: string | null;
  viewCount: number;
  maxViews: number | null;
  willExpire: boolean;
}

export default function ViewPaste() {
  const params = useParams();
  const router = useRouter();
  const [paste, setPaste] = useState<PasteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await fetch(`/api/paste/${params.id}`);
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to load paste');
        }
        
        const data = await response.json();
        setPaste(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPaste();
    }
  }, [params.id]);

  const copyToClipboard = async () => {
    if (paste) {
      try {
        await navigator.clipboard.writeText(paste.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        // Fallback for older browsers or when clipboard access is denied
        const textArea = document.createElement('textarea');
        textArea.value = paste.content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading paste...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">😞</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Paste Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Create New Paste
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Create New Paste
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Paste: {paste?.id}</h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Created: {paste && formatDate(paste.createdAt)}</p>
                <p>Views: {paste?.viewCount} {paste?.maxViews && `/ ${paste.maxViews}`}</p>
                {paste?.expiresAt && (
                  <p>Expires: {formatDate(paste.expiresAt)}</p>
                )}
              </div>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy Content'}
            </button>
          </div>

          {paste?.willExpire && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-md mb-4">
              ⚠️ This paste has reached its view limit and will be deleted.
            </div>
          )}

          <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-800">
              {paste?.content}
            </pre>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create Your Own Paste
          </Link>
        </div>
      </div>
    </div>
  );
}
