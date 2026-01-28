# QUICK START CHECKLIST ✅

Follow this checklist step-by-step. Check off each item as you complete it.

## Phase 1: Initial Setup (15 minutes)

### Prerequisites
- [ ] Node.js installed (check: `node --version` should show v18+)
- [ ] VS Code installed
- [ ] Git installed (check: `git --version`)
- [ ] GitHub account created

### Create Project
- [ ] Open VS Code
- [ ] Open terminal (Ctrl + `)
- [ ] Run: `npx create-next-app@latest pastebin-clone`
  - [ ] Choose TypeScript: Yes
  - [ ] Choose ESLint: Yes
  - [ ] Choose Tailwind: Yes
  - [ ] Choose src/ directory: No
  - [ ] Choose App Router: Yes
- [ ] Run: `cd pastebin-clone`
- [ ] Run: `npm install pg nanoid`
- [ ] Run: `npm install --save-dev @types/pg`

### Create Folder Structure
- [ ] Create folder: `lib`
- [ ] Create folder: `app/api/paste`
- [ ] Create folder: `app/api/paste/[id]` (with square brackets!)
- [ ] Create folder: `app/[id]` (with square brackets!)

### Copy All Code Files
Download all files I've provided and copy them to your project:

**lib folder:**
- [ ] Copy `lib-db.ts` → Save as `lib/db.ts`
- [ ] Copy `lib-utils.ts` → Save as `lib/utils.ts`

**API routes:**
- [ ] Copy `api-paste-route.ts` → Save as `app/api/paste/route.ts`
- [ ] Copy `api-paste-id-route.ts` → Save as `app/api/paste/[id]/route.ts`

**Frontend pages:**
- [ ] Copy `app-page.tsx` → Save as `app/page.tsx`
- [ ] Copy `app-id-page.tsx` → Save as `app/[id]/page.tsx`
- [ ] Copy `app-layout.tsx` → Save as `app/layout.tsx`
- [ ] Copy `app-globals.css` → Save as `app/globals.css`

**Root files:**
- [ ] Copy `setup-db.js` → Save as `setup-db.js` (in root)
- [ ] Copy `next.config.js` → Save as `next.config.js` (in root)
- [ ] Copy `gitignore.txt` → Save as `.gitignore` (in root, note the dot!)

**Environment file:**
- [ ] Create `.env.local` in root with your database URL:
```
DATABASE_URL=postgresql://neondb_owner:npg_Zuv8seBor1SN@ep-calm-hall-ahnf2slp-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

---

## Phase 2: Database Setup (5 minutes)

- [ ] Run: `node setup-db.js`
- [ ] Verify you see: "✅ Table 'pastes' created"
- [ ] Verify you see: "🎉 Database setup complete!"

---

## Phase 3: Local Testing (10 minutes)

### Start Server
- [ ] Run: `npm run dev`
- [ ] Open browser: http://localhost:3000
- [ ] Verify home page loads

### Test Basic Functionality
- [ ] Test 1: Create paste without expiration
  - [ ] Enter text: "Hello World!"
  - [ ] Leave expiration: "Never"
  - [ ] Click "Create Paste"
  - [ ] Copy the URL
  - [ ] Open URL in new tab
  - [ ] Verify content shows correctly

- [ ] Test 2: Create paste with 1 hour expiration
  - [ ] Enter text: "This expires in 1 hour"
  - [ ] Select: "1 Hour"
  - [ ] Create and verify

- [ ] Test 3: Create paste with view limit
  - [ ] Enter text: "Max 3 views"
  - [ ] Set Max Views: 3
  - [ ] Create paste
  - [ ] Open URL 3 times
  - [ ] Verify warning on 3rd view
  - [ ] Try opening again - should show "expired"

- [ ] Test 4: Invalid URL
  - [ ] Try: http://localhost:3000/invalid123
  - [ ] Should show "Paste not found"

---

## Phase 4: Git and GitHub (10 minutes)

### Initialize Git
- [ ] Run: `git init`
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Initial commit: Pastebin clone"`

### Create GitHub Repository
- [ ] Go to: https://github.com
- [ ] Click: "New repository"
- [ ] Name: `pastebin-clone`
- [ ] Keep it public
- [ ] Don't add README, .gitignore, or license
- [ ] Click: "Create repository"

### Push to GitHub
- [ ] Copy the commands GitHub shows (looks like):
```bash
git remote add origin https://github.com/YOUR_USERNAME/pastebin-clone.git
git branch -M main
git push -u origin main
```
- [ ] Run those commands
- [ ] Refresh GitHub page to see your code

---

## Phase 5: Vercel Deployment (15 minutes)

### Sign Up
- [ ] Go to: https://vercel.com
- [ ] Click: "Sign Up"
- [ ] Choose: "Continue with GitHub"
- [ ] Authorize Vercel

### Deploy Project
- [ ] Click: "New Project"
- [ ] Find: `pastebin-clone` repository
- [ ] Click: "Import"

### Configure Environment Variables
- [ ] Click: "Environment Variables"
- [ ] Add variable:
  - Name: `DATABASE_URL`
  - Value: (your full Neon database URL)
  - Select: All environments
- [ ] Click: "Add"

### Deploy
- [ ] Click: "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Copy your deployment URL (looks like: `https://pastebin-clone-abc123.vercel.app`)

### Test Deployed App
- [ ] Open your Vercel URL
- [ ] Create a paste
- [ ] Verify shareable link works
- [ ] Test expiration features

---

## Phase 6: Final Verification (5 minutes)

### Functionality Checklist
- [ ] Can create pastes
- [ ] Generates unique URLs
- [ ] Can view pastes
- [ ] Time expiration works
- [ ] View limit works
- [ ] Expired pastes show error
- [ ] Invalid IDs show error
- [ ] UI looks clean and professional

### Submission Ready
- [ ] Live URL accessible: __________________
- [ ] GitHub repo public: __________________
- [ ] All features working
- [ ] No errors in browser console
- [ ] No errors in Vercel logs

---

## Common Issues and Fixes

### ❌ "Module not found" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Database connection fails
- Check `.env.local` exists
- Check DATABASE_URL is correct
- Restart: Ctrl+C, then `npm run dev`

### ❌ Vercel build fails
- Check all files committed to GitHub
- Check environment variable in Vercel
- Check Vercel build logs

### ❌ Page shows 404
- Verify folder name uses square brackets: `[id]`
- Check file is named `page.tsx`
- Restart dev server

---

## Interview Preparation

Be ready to explain:
- [ ] Why you chose Next.js
- [ ] How expiration works
- [ ] Database schema design
- [ ] How you'd scale this
- [ ] Security considerations
- [ ] What you'd improve next

---

## Submission Template

When you're done, submit:

```
Name: [Your Name]
Live URL: https://your-app.vercel.app
GitHub: https://github.com/yourusername/pastebin-clone

Features Implemented:
✅ Create pastes with unique URLs
✅ Time-based expiration (1 hour to 1 month)
✅ View-based expiration
✅ Clean, responsive UI
✅ Proper error handling

Tech Stack:
- Next.js 14 (App Router)
- TypeScript
- PostgreSQL (Neon)
- Tailwind CSS
- Vercel deployment

Notes:
[Any additional notes about your implementation]
```

---

## Time Estimate
- Setup: 15 min
- Database: 5 min  
- Testing: 10 min
- Git: 10 min
- Deploy: 15 min
- Verification: 5 min

**Total: ~60 minutes**

Good luck! 🚀
