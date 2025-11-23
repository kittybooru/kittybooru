# KittyBooru

A booru-style image board built with vanilla HTML, CSS, and JavaScript using Supabase as the backend.

## Overview
KittyBooru is a simple, static image board that allows users to:
- Upload images with tags
- Browse images in a grid layout
- Search and filter by tags
- View individual image details
- See popular tags in a tag cloud

## Architecture
- **Frontend**: Vanilla HTML, CSS, JavaScript (static hosting compatible)
- **Backend**: Supabase (PostgreSQL database + Storage)
- **Hosting**: Designed for InfinityFree or any static hosting provider

## Project Structure
```
/
├── index.html          # Main gallery page
├── upload.html         # Image upload page
├── image.html          # Individual image detail page
├── css/
│   └── styles.css      # Booru-style CSS
├── js/
│   ├── config.js       # Supabase configuration
│   ├── supabase.js     # Supabase client initialization
│   ├── gallery.js      # Gallery page logic
│   ├── upload.js       # Upload page logic
│   └── image.js        # Image detail page logic
└── SETUP.md           # Supabase setup instructions
```

## Setup Requirements
1. Supabase project with:
   - Database table for images and tags
   - Storage bucket for image files
   - Public access configured
2. Environment variables:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY

## Recent Changes
- 2025-11-23: Initial project setup
