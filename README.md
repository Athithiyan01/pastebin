<<<<<<< HEAD
# 📋 Pastebin Clone - Complete Project

A full-stack Pastebin-like web application built with Next.js, TypeScript, PostgreSQL, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Neon PostgreSQL database (free tier available at https://neon.tech)
- Git installed
- VS Code (recommended)

### Installation

1. **Extract this ZIP file** to your desired location

2. **Install dependencies**
   ```bash
   cd pastebin-clone
   npm install
   ```

3. **Set up environment variables**
   - Rename `.env.local.example` to `.env.local`
   - Replace the DATABASE_URL with your actual Neon database connection string
   - Get your connection string from https://neon.tech dashboard

4. **Initialize database**
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

5. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## ✨ Features

- ✅ Create text pastes with unique shareable links
- ✅ Time-based expiration (1 hour, 1 day, 1 week, 1 month, or never)
- ✅ View-based expiration (expire after N views)
- ✅ Automatic deletion of expired pastes
- ✅ Clean, responsive UI
- ✅ Copy-to-clipboard functionality
- ✅ View count tracking
- ✅ Full TypeScript implementation
- ✅ Production-ready

## 📁 Project Structure

```
pastebin-clone/
├── app/
│   ├── api/
│   │   └── paste/
│   │       ├── route.ts              # POST: Create new paste
│   │       └── [id]/
│   │           └── route.ts          # GET: Retrieve paste
│   ├── [id]/
│   │   └── page.tsx                  # View paste page
│   ├── page.tsx                      # Home page (create form)
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── lib/
│   ├── db.ts                         # Database connection pool
│   └── utils.ts                      # Utility functions
├── .env.local.example                # Environment variables template
├── .gitignore                        # Git ignore rules
├── setup-db.js                       # Database initialization script
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind CSS config
├── postcss.config.js                 # PostCSS config
├── next.config.js                    # Next.js config
└── README.md                         # This file
```

## 🧪 Testing

### Test 1: Create Simple Paste
1. Go to http://localhost:3000
2. Enter text: "Hello, World!"
3. Leave expiration as "Never"
4. Click "Create Paste"
5. Copy URL and open in new tab
6. ✅ Should display your text

### Test 2: Time-Based Expiration
1. Create a paste with "1 Hour" expiration
2. Verify it works immediately
3. Note: It will actually expire in 1 hour

### Test 3: View-Based Expiration
1. Create a paste with "Max Views: 3"
2. Open the URL 3 times
3. ✅ On 3rd view, should show warning
4. ✅ 4th attempt should show "Paste has expired"

### Test 4: Invalid URLs
1. Try: http://localhost:3000/invalid123
2. ✅ Should show "Paste not found"

## 🚢 Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Pastebin clone"
git remote add origin https://github.com/YOUR_USERNAME/pastebin-clone.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `pastebin-clone` repository
5. Add Environment Variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Neon database connection string
6. Click "Deploy"
7. Wait 2-3 minutes

### 3. Test Live Application
- Open your Vercel URL
- Test all features
- Share the link!

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **ID Generation**: nanoid

## 🗄️ Database Schema

```sql
CREATE TABLE pastes (
  id VARCHAR(10) PRIMARY KEY,           -- Unique 8-character ID
  content TEXT NOT NULL,                -- Paste content
  created_at TIMESTAMP DEFAULT NOW(),   -- Creation timestamp
  expires_at TIMESTAMP,                 -- Expiration timestamp (nullable)
  max_views INTEGER,                    -- Maximum views allowed (nullable)
  view_count INTEGER DEFAULT 0          -- Current view count
);

-- Indexes for performance
CREATE INDEX idx_expires_at ON pastes(expires_at);
CREATE INDEX idx_created_at ON pastes(created_at);
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database connection fails
- Check `.env.local` file exists
- Verify DATABASE_URL is correct
- Restart dev server: Ctrl+C, then `npm run dev`

### Vercel build fails
- Check environment variable is set in Vercel dashboard
- Check all files are committed to GitHub
- Review Vercel build logs

### Port 3000 already in use
```bash
npx kill-port 3000
npm run dev
```

## 🎯 Key Features Explained

### Unique ID Generation
- Uses `nanoid` to generate 8-character URL-safe IDs
- Collision probability is negligible

### Expiration Logic
- **Time-based**: Compares current time with `expires_at`
- **View-based**: Compares `view_count` with `max_views`
- Expired pastes are deleted immediately upon access

### Atomic View Counting
- Uses SQL UPDATE with INCREMENT to prevent race conditions
- Ensures accurate view counts even with concurrent access

## 🔒 Security

- Input validation (content length limits)
- Parameterized SQL queries (prevents SQL injection)
- SSL database connections
- Environment variables for secrets
- No sensitive data in client-side code

## 🚀 Future Enhancements

- [ ] Syntax highlighting for code
- [ ] Paste editing capability
- [ ] User authentication
- [ ] Paste collections/folders
- [ ] Analytics dashboard
- [ ] Custom URLs
- [ ] Password-protected pastes
- [ ] File upload support

## 📝 License

This is a take-home exercise project. Feel free to use it as you wish.

## 🙏 Acknowledgments

Built with:
- Next.js - React Framework
- Neon - Serverless PostgreSQL
- Vercel - Deployment Platform
- Tailwind CSS - Styling

## 📧 Support

If you have questions about this project, please refer to the documentation files included in the ZIP package.

---

**Ready to start?**

```bash
npm install
# Set up .env.local with your database URL
node setup-db.js
npm run dev
```

Good luck! 🎉
=======
# pastebin
>>>>>>> b4e11bf073fdb9534ddeeff7b29d0d0be42d2b15
