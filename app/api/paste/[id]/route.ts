// app/api/paste/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { isPasteExpired } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID format
    if (!id || id.length !== 8) {
      return NextResponse.json(
        { error: 'Invalid paste ID' },
        { status: 400 }
      );
    }

    // Fetch paste and increment view count atomically
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Fetch paste
      const query = `
        SELECT id, content, created_at, expires_at, max_views, view_count
        FROM pastes
        WHERE id = $1
      `;
      
      const result = await client.query(query, [id]);

      if (result.rows.length === 0) {
        await client.query('ROLLBACK');
        return NextResponse.json(
          { error: 'Paste not found' },
          { status: 404 }
        );
      }

      const paste = result.rows[0];

      // Check if paste has expired
      if (isPasteExpired(paste.expires_at, paste.view_count, paste.max_views)) {
        // Delete expired paste
        await client.query('DELETE FROM pastes WHERE id = $1', [id]);
        await client.query('COMMIT');
        
        return NextResponse.json(
          { error: 'Paste has expired' },
          { status: 410 } // 410 Gone status
        );
      }

      // Increment view count
      const updateQuery = `
        UPDATE pastes 
        SET view_count = view_count + 1 
        WHERE id = $1
        RETURNING view_count
      `;
      
      const updateResult = await client.query(updateQuery, [id]);
      const newViewCount = updateResult.rows[0].view_count;

      // Check if paste should expire after this view and delete if so
      const willExpire = paste.max_views !== null && newViewCount >= paste.max_views;
      
      if (willExpire) {
        await client.query('DELETE FROM pastes WHERE id = $1', [id]);
      }
      
      await client.query('COMMIT');

      return NextResponse.json({
        id: paste.id,
        content: paste.content,
        createdAt: paste.created_at,
        expiresAt: paste.expires_at,
        viewCount: newViewCount,
        maxViews: paste.max_views,
        willExpire
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Error retrieving paste:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve paste' },
      { status: 500 }
    );
  }
}
