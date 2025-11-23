# Deploying KittyBooru to GitHub Pages

This guide will help you deploy KittyBooru to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Git installed on your computer (or use Replit's Git integration)
3. Supabase project set up (see SETUP.md)

## Step 1: Configure Supabase Credentials

Since GitHub Pages doesn't support environment variables, you need to hardcode your Supabase credentials in the config file.

1. Open `js/config.js`
2. Replace the placeholder values with your actual Supabase credentials:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  anonKey: 'your-anon-key-here'
};

const STORAGE_BUCKET = 'images';
```

**Important:** The anon key is designed to be public and safe to expose in client-side code. However, make sure you:
- Never commit your service role key
- Set up proper Row Level Security (RLS) policies in Supabase
- Only use the anon (public) key in your code

## Step 2: Prepare Files for Deployment

You only need these files for GitHub Pages:

**Required files:**
- `index.html`
- `upload.html`
- `image.html`
- `css/styles.css`
- `js/config.js` (with your Supabase credentials)
- `js/supabase.js`
- `js/gallery.js`
- `js/upload.js`
- `js/image.js`

**DO NOT include:**
- `.replit`
- `replit.md`
- `generate-config.sh`
- `SETUP.md`
- `DEPLOYMENT.md`
- Any `.md` files (optional - you can include README.md if you want)

## Step 3: Create GitHub Repository

### Option A: Using Replit Git Integration

1. In Replit, open the **Version Control** panel (Git icon in sidebar)
2. Click **Create a Git repo**
3. Make your initial commit
4. Click **Connect to GitHub**
5. Create a new repository named `kittybooru` (or any name you prefer)
6. Push your code

### Option B: Manual Setup

1. Create a new repository on GitHub: https://github.com/new
2. Name it `kittybooru` (or any name)
3. Make it public or private (both work with GitHub Pages)
4. In your terminal or Replit shell, run:

```bash
git init
git add index.html upload.html image.html css/ js/
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kittybooru.git
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

GitHub will start deploying your site. This usually takes 1-2 minutes.

## Step 5: Access Your Site

Your site will be available at:
- `https://YOUR_USERNAME.github.io/kittybooru/`

If you used a custom name for your repo, it will be:
- `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Optional: Custom Domain

If you want to use your own domain:

1. In GitHub Pages settings, enter your custom domain
2. Add a CNAME record in your domain's DNS settings pointing to `YOUR_USERNAME.github.io`
3. Enable **Enforce HTTPS** (recommended)

## Important Notes

### Security
- The `anonKey` in your code is safe to be public (it's designed for client-side use)
- Never commit your Supabase service role key or database passwords
- Supabase RLS policies control what users can actually do

### Updates
When you want to update your site:
1. Make changes to your files
2. Commit and push to GitHub
3. GitHub Pages automatically rebuilds your site

### .gitignore
If you want to avoid accidentally committing sensitive files, create a `.gitignore`:

```
# Replit files
.replit
replit.md
generate-config.sh

# Documentation (optional)
SETUP.md
DEPLOYMENT.md
*.md

# System files
.DS_Store
Thumbs.db
```

## Troubleshooting

### Site shows 404
- Wait a few minutes - GitHub Pages can take time to deploy
- Check that index.html is in the root directory
- Verify the branch and folder settings in GitHub Pages

### Images not loading
- Check browser console for errors
- Verify your Supabase credentials in js/config.js
- Make sure your Supabase storage bucket is public
- Check storage policies (see SETUP.md)

### Can't upload images
- Verify storage bucket policies allow INSERT operations
- Check browser console for specific error messages
- Ensure your Supabase anon key has proper permissions

## Testing Before Deployment

Before pushing to GitHub, test your site locally:
1. Make sure js/config.js has your real Supabase credentials
2. Open index.html in your browser
3. Test uploading an image
4. Verify gallery and tag functionality

That's it! Your KittyBooru image board should now be live on GitHub Pages! 🎉
