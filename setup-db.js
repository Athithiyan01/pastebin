// setup-db.js
// Run this file once to set up your database: node setup-db.js

const { Pool } = require('pg');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  console.error('Please create .env.local file with your database connection string');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');
    
    // Create pastes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pastes (
        id VARCHAR(10) PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP,
        max_views INTEGER,
        view_count INTEGER DEFAULT 0
      );
    `);
    console.log('✅ Table "pastes" created');
    
    // Create indexes for better query performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_expires_at ON pastes(expires_at);
    `);
    console.log('✅ Index on expires_at created');
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_created_at ON pastes(created_at);
    `);
    console.log('✅ Index on created_at created');
    
    console.log('🎉 Database setup complete!');
    console.log('You can now run: npm run dev');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
