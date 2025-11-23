# Deploying KittyBooru to InfinityFree

This guide will help you deploy KittyBooru to InfinityFree hosting.

## Prerequisites

1. A Supabase account with your project set up (see SETUP.md)
2. An InfinityFree hosting account
3. Your Supabase URL and anon key

## Step 1: Prepare Your Files

Before uploading to InfinityFree, you need to configure your Supabase credentials:

1. Open `js/config.js`
2. Replace the placeholder values with your actual Supabase credentials:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  anonKey: 'your-anon-key-here'
};

const STORAGE_BUCKET = 'images';
```

3. Save the file

## Step 2: Upload Files to InfinityFree

### Method 1: File Manager (Recommended for beginners)

1. Log in to your InfinityFree control panel
2. Open the "Online File Manager"
3. Navigate to the `htdocs` folder (or `public_html`)
4. Upload all project files maintaining the folder structure:
   - index.html
   - upload.html
   - image.html
   - css/ (folder with styles.css)
   - js/ (folder with all .js files)

### Method 2: FTP (Recommended for faster uploads)

1. Get your FTP credentials from InfinityFree control panel
2. Use an FTP client like FileZilla
3. Connect to your FTP server
4. Navigate to `htdocs` folder
5. Upload all project files

## Step 3: Verify Your Installation

1. Visit your InfinityFree domain (e.g., yoursite.infinityfreeapp.com)
2. You should see the KittyBooru gallery page
3. Try uploading an image from the Upload page
4. Verify the image appears in the gallery

## File Structure on InfinityFree

Your `htdocs` folder should look like this:

```
htdocs/
├── index.html
├── upload.html
├── image.html
├── css/
│   └── styles.css
└── js/
    ├── config.js
    ├── supabase.js
    ├── gallery.js
    ├── upload.js
    └── image.js
```

## Important Notes

### DO NOT Upload These Files:
- `.replit`
- `replit.md`
- `generate-config.sh` (this is only for Replit development)
- `.gitignore`
- `SETUP.md`
- `DEPLOYMENT.md`
- Any other development/documentation files

### Files You MUST Upload:
- All HTML files (index.html, upload.html, image.html)
- The entire `css/` folder
- The entire `js/` folder (with configured config.js)

## Troubleshooting

### Images not loading
- Verify your Supabase URL and anon key in config.js
- Check that your Supabase storage bucket is public
- Open browser console (F12) to check for errors

### Upload not working
- Ensure the storage bucket policies are set correctly (see SETUP.md)
- Check browser console for error messages
- Verify your anon key has proper permissions

### Site not accessible
- Wait a few minutes after upload (DNS propagation)
- Check that files are in the correct folder (htdocs or public_html)
- Verify index.html is in the root of htdocs

## Custom Domain (Optional)

If you want to use a custom domain:

1. Purchase a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In InfinityFree, add the custom domain in the control panel
3. Update your domain's DNS settings to point to InfinityFree servers
4. Wait for DNS propagation (can take up to 24 hours)

## Performance Tips

1. **Image Optimization**: Consider compressing images before upload
2. **Caching**: InfinityFree automatically caches static files
3. **CDN**: For better performance, consider using Cloudflare (free)

## Security Considerations

1. The anon key is meant to be public (it's safe in config.js)
2. Make sure you haven't exposed any service role keys
3. Supabase Row Level Security (RLS) can add extra protection
4. Monitor your Supabase usage to prevent abuse

## Support

- InfinityFree Support: https://forum.infinityfree.net/
- Supabase Docs: https://supabase.com/docs
- Check browser console (F12) for JavaScript errors

Enjoy your KittyBooru image board!
