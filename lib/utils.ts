// lib/utils.ts
import { customAlphabet } from 'nanoid';

// Constants for better maintainability
const ALPHANUMERIC_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const ID_LENGTH = 8;

// Create a custom nanoid generator with URL-safe characters
// Uses alphanumeric characters only (no special symbols)
const nanoid = customAlphabet(ALPHANUMERIC_CHARS, ID_LENGTH);

/**
 * Generate a unique short ID for paste URLs
 * Returns an 8-character alphanumeric string
 */
export function generatePasteId(): string {
  return nanoid();
}

/**
 * Calculate expiration timestamp based on duration
 * @param hours - Number of hours until expiration (e.g., 1, 24, 168)
 * @returns ISO timestamp string or null for never expires
 */
export function calculateExpirationTime(hours: number | null): string | null {
  if (!hours) return null;
  
  const now = new Date();
  const expiresAt = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return expiresAt.toISOString();
}

/**
 * Check if a paste has expired based on time or view count
 * @param expiresAt - Expiration timestamp (ISO string)
 * @param viewCount - Current number of views
 * @param maxViews - Maximum allowed views
 * @returns true if paste is expired, false otherwise
 */
export function isPasteExpired(
  expiresAt: string | null,
  viewCount: number,
  maxViews: number | null
): boolean {
  // Check time-based expiration
  if (expiresAt) {
    const expirationDate = new Date(expiresAt);
    if (new Date() > expirationDate) {
      return true;
    }
  }
  
  // Check view-based expiration
  if (maxViews !== null && viewCount >= maxViews) {
    return true;
  }
  
  return false;
}
