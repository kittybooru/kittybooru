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

### Option A: Simple Public Bucket (Recommended for KittyBooru)

1. In your Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Name it `images`
4. Check the box that says **Public bucket** (this allows anyone to read files)
5. Click **Create bucket**
6. After creation, you still need to allow uploads. Go to **Policies** tab
7. Click **New Policy** on the storage.objects table
8. Select **For full customization**
9. Give it a name like "Allow public uploads"
10. For **Policy Command**, select **INSERT**
11. In the **USING expression** field, enter:
```sql
bucket_id = 'images'
```
12. Click **Save policy**

### Option B: Using SQL (Advanced)

If you prefer SQL, go to the **SQL Editor** and run:

```sql
-- Create the bucket first through the UI, then run these policies:

-- Allow anyone to read files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow anyone to upload files
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');
```

**Note:** If you get a syntax error with the policies, make sure:
- The bucket `images` already exists
- You're in the SQL Editor, not the Table Editor
- Row Level Security (RLS) is enabled on storage.objects (it should be by default)

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
