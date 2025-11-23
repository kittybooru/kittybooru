# KittyBooru - Supabase Setup Guide

This guide will help you set up Supabase for KittyBooru.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Note down your project URL and anon/public key

## Step 2: Create the Database Table

1. In your Supabase dashboard, go to the SQL Editor
2. Run the following SQL to create the images table:

```sql
CREATE TABLE images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_path TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index on tags for faster searching
CREATE INDEX idx_images_tags ON images USING GIN (tags);

-- Create an index on created_at for sorting
CREATE INDEX idx_images_created_at ON images (created_at DESC);
```

## Step 3: Create Storage Bucket

1. In your Supabase dashboard, go to Storage
2. Create a new bucket called `images`
3. Make the bucket **public** so images can be accessed without authentication:
   - Click on the bucket
   - Go to "Policies"
   - Click "New Policy"
   - For SELECT (read) operations, use this policy:

```sql
-- Policy name: Public Access
-- Allowed operation: SELECT
-- Policy definition:
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );
```

4. Also add an INSERT policy for uploading:

```sql
-- Policy name: Public Upload
-- Allowed operation: INSERT
-- Policy definition:
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );
```

## Step 4: Configure Your Application

1. Open `js/config.js` in your project
2. Replace the placeholder values with your Supabase credentials:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  anonKey: 'your-anon-key-here'
};
```

## Step 5: Test Your Setup

1. Open `index.html` in a web browser or deploy to InfinityFree
2. Try uploading an image from the Upload page
3. Check if it appears in the gallery

## Optional: Row Level Security (RLS)

If you want to add more security while keeping the booru public:

```sql
-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read images
CREATE POLICY "Anyone can view images"
ON images FOR SELECT
USING (true);

-- Allow anyone to insert images (you can restrict this later)
CREATE POLICY "Anyone can upload images"
ON images FOR INSERT
WITH CHECK (true);
```

## Troubleshooting

### Images not appearing
- Check that the storage bucket is public
- Verify the bucket name is exactly `images`
- Check browser console for errors

### Upload failing
- Ensure INSERT policy is created on storage bucket
- Check that your anon key has proper permissions
- Verify file size is under Supabase limits (default 50MB)

### Tags not searchable
- Make sure the GIN index is created on the tags column
- Verify tags are being saved as an array in the database

## Deployment to InfinityFree

1. Compress all files into a ZIP
2. Upload to InfinityFree via File Manager or FTP
3. Extract the files in your public_html directory
4. Access your site via your InfinityFree domain

That's it! Your KittyBooru should now be fully functional.
