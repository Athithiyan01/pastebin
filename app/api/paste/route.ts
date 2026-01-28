// app/api/paste/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { generatePasteId, calculateExpirationTime } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, expirationTime, maxViews } = body;

    // Validation
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    if (content.length > 100000) {
      return NextResponse.json(
        { error: 'Content is too large (max 100KB)' },
        { status: 400 }
      );
    }

    // Generate unique ID
    const id = generatePasteId();

    // Calculate expiration time
    const expiresAt = calculateExpirationTime(expirationTime || null);

    // Parse max views (null if not provided or invalid)
    const numericMaxViews = maxViews ? Number(maxViews) : null;
    const parsedMaxViews = numericMaxViews && Number.isInteger(numericMaxViews) && numericMaxViews > 0 
      ? numericMaxViews 
      : null;

    // Insert into database
    const query = `
      INSERT INTO pastes (id, content, expires_at, max_views)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at
    `;
    
    const values = [id, content, expiresAt, parsedMaxViews];
    const result = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/${result.rows[0].id}`,
      createdAt: result.rows[0].created_at
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating paste:', error);
    return NextResponse.json(
      { error: 'Failed to create paste' },
      { status: 500 }
    );
  }
}
