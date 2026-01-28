// app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [expirationTime, setExpirationTime] = useState<string>('never');
  const [maxViews, setMaxViews] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [pasteUrl, setPasteUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPasteUrl('');

    try {
      const response = await fetch('/api/paste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          expirationTime: expirationTime === 'never' ? null : Number(expirationTime),
          maxViews: maxViews ? Number(maxViews) : null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create paste');
      }

      // Construct full URL
      const fullUrl = `${window.location.origin}/${data.id}`;
      setPasteUrl(fullUrl);
      
      // Clear form
      setContent('');
      setExpirationTime('never');
      setMaxViews('');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pasteUrl);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers or when clipboard access is denied
      const textArea = document.createElement('textarea');
      textArea.value = pasteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Pastebin Clone</h1>
          <p className="text-gray-600">Share text snippets with expiration options</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Paste Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Time
                </label>
                <select
                  id="expiration"
                  value={expirationTime}
                  onChange={(e) => setExpirationTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="never">Never</option>
                  <option value="1">1 Hour</option>
                  <option value="24">1 Day</option>
                  <option value="168">1 Week</option>
                  <option value="720">1 Month</option>
                </select>
              </div>

              <div>
                <label htmlFor="maxViews" className="block text-sm font-medium text-gray-700 mb-2">
                  Max Views (Optional)
                </label>
                <input
                  id="maxViews"
                  type="number"
                  min="1"
                  value={maxViews}
                  onChange={(e) => setMaxViews(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !content}
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Paste'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {pasteUrl && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
            <p className="font-medium mb-2">✅ Paste created successfully!</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pasteUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-md text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Features: Time-based expiration • View-based expiration • Clean UI</p>
        </div>
      </div>
    </div>
  );
}
