# COMPLETE DEPLOYMENT GUIDE

## Overview
This guide walks you through deploying your Pastebin clone to Vercel with a Neon PostgreSQL database.

---

## Part 1: Project Setup in VS Code

### Step 1: Open VS Code and Terminal
1. Open VS Code
2. Press `Ctrl + `` (backtick) to open terminal
3. Navigate to where you want to create the project

### Step 2: Create Next.js Project
```bash
npx create-next-app@latest pastebin-clone
```

Choose these options:
- TypeScript? → **Yes**
- ESLint? → **Yes**
- Tailwind CSS? → **Yes**
- `src/` directory? → **No**
- App Router? → **Yes**
- Import alias? → **No** (or keep default)

```bash
cd pastebin-clone
```

### Step 3: Install Dependencies
```bash
npm install pg nanoid
npm install --save-dev @types/pg
```

### Step 4: Create Project Structure

Create these folders:
```bash
mkdir lib
mkdir app/api
mkdir app/api/paste
mkdir "app/api/paste/[id]"
mkdir "app/[id]"
```

### Step 5: Copy Files from the Generated Code

I've generated all the necessary files. Here's how to create them in VS Code:

#### Create `lib/db.ts`
Copy from the file: `lib-db.ts` (I provided earlier)

#### Create `lib/utils.ts`
Copy from the file: `lib-utils.ts`

#### Create `app/api/paste/route.ts`
Copy from the file: `api-paste-route.ts`

#### Create `app/api/paste/[id]/route.ts`
Copy from the file: `api-paste-id-route.ts`

#### Create `app/page.tsx`
Copy from the file: `app-page.tsx`

#### Create `app/[id]/page.tsx`
Copy from the file: `app-id-page.tsx`

#### Create `app/layout.tsx`
Copy from the file: `app-layout.tsx`

#### Create `app/globals.css`
Copy from the file: `app-globals.css`

#### Create `setup-db.js` (in root)
Copy from the file: `setup-db.js`

#### Create `.env.local` (in root)
```
DATABASE_URL=postgresql://neondb_owner:npg_Zuv8seBor1SN@ep-calm-hall-ahnf2slp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

#### Create/Update `next.config.js`
Copy from the file: `next.config.js`

#### Update `.gitignore`
Copy from the file: `gitignore.txt` and rename to `.gitignore`

---

## Part 2: Database Setup

### Step 1: Run Database Setup Script
```bash
node setup-db.js
```

You should see:
```
✅ Table "pastes" created
✅ Index on expires_at created
✅ Index on created_at created
🎉 Database setup complete!
```

---

## Part 3: Local Testing

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Test in Browser
Open: http://localhost:3000

### Step 3: Test Features

**Test 1: Create a simple paste**
1. Enter some text
2. Leave expiration as "Never"
3. Click "Create Paste"
4. Copy the URL and open it in a new tab

**Test 2: Create paste with time expiration**
1. Enter text
2. Select "1 Hour" expiration
3. Create and verify it works

**Test 3: Create paste with view limit**
1. Enter text
2. Set "Max Views" to 3
3. Create paste
4. Open the URL 3 times
5. On the 3rd view, it should show expiration warning
6. Try opening again - should show "expired"

**Test 4: Invalid paste ID**
- Try opening: http://localhost:3000/invalid123
- Should show "Paste not found"

---

## Part 4: Git Setup

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Pastebin clone"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com
2. Click "New repository"
3. Name: `pastebin-clone`
4. Don't initialize with README
5. Click "Create repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/pastebin-clone.git
git branch -M main
git push -u origin main
```

---

## Part 5: Vercel Deployment

### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### Step 2: Import Project
1. Click "New Project"
2. Find your `pastebin-clone` repository
3. Click "Import"

### Step 3: Configure Project
1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: ./
3. **Build Command**: (leave default)
4. **Output Directory**: (leave default)

### Step 4: Add Environment Variables
Click "Environment Variables" and add:

**Key**: `DATABASE_URL`
**Value**: 
```
postgresql://neondb_owner:npg_Zuv8seBor1SN@ep-calm-hall-ahnf2slp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

Make sure to select all environments (Production, Preview, Development)

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://pastebin-clone-xyz.vercel.app`

### Step 6: Test Deployed Application
1. Open your Vercel URL
2. Create a paste
3. Verify the shareable link works
4. Test time and view expiration

---

## Part 6: Troubleshooting

### Issue: "Module not found" errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database connection fails
**Solution**:
1. Check `.env.local` file exists
2. Verify DATABASE_URL is correct
3. Restart dev server: Ctrl+C, then `npm run dev`

### Issue: Vercel build fails
**Solution**:
1. Check Vercel logs for specific error
2. Verify all files are committed to GitHub
3. Check environment variable is set in Vercel dashboard

### Issue: "Cannot find module '@/lib/db'"
**Solution**:
Check `tsconfig.json` has:
```json
"paths": {
  "@/*": ["./*"]
}
```

### Issue: Paste page shows 404
**Solution**:
1. Verify folder structure: `app/[id]/page.tsx`
2. Check square brackets in folder name
3. Restart dev server

### Issue: Database queries fail on Vercel
**Solution**:
1. Verify DATABASE_URL in Vercel dashboard
2. Check SSL mode is included in connection string
3. View Vercel function logs for detailed errors

---

## Part 7: Understanding the Code

### Key Components

**1. Database Connection (`lib/db.ts`)**
- Creates connection pool to PostgreSQL
- Manages database connections efficiently

**2. Utilities (`lib/utils.ts`)**
- `generatePasteId()`: Creates unique 8-character IDs
- `calculateExpirationTime()`: Converts hours to timestamp
- `isPasteExpired()`: Checks if paste has expired

**3. API Routes**
- `POST /api/paste`: Creates new paste, returns ID
- `GET /api/paste/[id]`: Retrieves paste, increments views

**4. Frontend Pages**
- `app/page.tsx`: Home page with creation form
- `app/[id]/page.tsx`: View paste page

### Database Schema
```sql
pastes table:
- id: Unique identifier (VARCHAR)
- content: Text content
- created_at: Creation timestamp
- expires_at: Expiration timestamp (nullable)
- max_views: Maximum views allowed (nullable)
- view_count: Current view count
```

### Expiration Logic
1. **Time-based**: Compare current time with `expires_at`
2. **View-based**: Compare `view_count` with `max_views`
3. If expired, delete from database and return 410 status

---

## Part 8: Making Changes

### To add features:
1. Make changes in VS Code
2. Test locally with `npm run dev`
3. Commit and push to GitHub:
```bash
git add .
git commit -m "Description of changes"
git push
```
4. Vercel auto-deploys from GitHub

---

## Part 9: Interview Preparation

### Be Ready to Explain:

**1. Architecture**
- Next.js App Router for routing
- Server-side API routes for database operations
- PostgreSQL for data persistence
- Vercel for serverless hosting

**2. Key Design Decisions**
- Why Next.js? Full-stack framework, easy deployment
- Why PostgreSQL? Reliable, ACID compliant, good for structured data
- Why nanoid? Short, unique, URL-safe IDs
- Why atomic view increment? Prevents race conditions

**3. Expiration Implementation**
- Store expiration criteria in database
- Check on every view request
- Delete expired pastes immediately
- Could add cron job for cleanup (future enhancement)

**4. Security Considerations**
- Input validation on content length
- SQL injection prevention (parameterized queries)
- No authentication (as per requirements)
- Rate limiting could be added

**5. Scalability**
- Connection pooling for database efficiency
- Serverless functions scale automatically
- Could add Redis caching for popular pastes
- Could add CDN for static assets

---

## Success Checklist

Before submitting:
- [ ] Application deployed and publicly accessible
- [ ] Can create pastes with unique URLs
- [ ] Time-based expiration works
- [ ] View-based expiration works
- [ ] Expired pastes return proper error
- [ ] Invalid IDs handled gracefully
- [ ] UI is clean and functional
- [ ] GitHub repository is up to date
- [ ] Can explain implementation decisions

---

## Submission

Provide these items:
1. **Live URL**: Your Vercel deployment URL
2. **GitHub Repository**: Link to your code
3. **Brief Description**: How to use the application

Example:
```
Live URL: https://pastebin-clone-abc123.vercel.app
GitHub: https://github.com/yourusername/pastebin-clone

Features:
- Create text pastes with shareable links
- Time-based expiration (1 hour to 1 month)
- View-based expiration (max views)
- Clean, responsive UI
- Built with Next.js 14 and PostgreSQL
```

---

## Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Git
git status              # Check file status
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push                # Push to GitHub

# Database
node setup-db.js        # Initialize database

# Deployment (automatic via Vercel)
# Just push to GitHub, Vercel handles the rest
```

Good luck with your project! 🚀
