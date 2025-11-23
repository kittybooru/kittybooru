# 🐱 KittyBooru

A lightweight, booru-style image board built with vanilla HTML, CSS, and JavaScript, powered by Supabase.

## ✨ Features

- 📤 **Drag-and-drop image uploads** with preview
- 🏷️ **Tag-based organization** with multi-tag support
- 🔍 **Search and filter** images by tags
- 🖼️ **Grid gallery view** with responsive design
- 📄 **Individual image pages** with full details
- 🌐 **Tag cloud** showing popular tags with counts
- 🎨 **Dark booru-style theme** optimized for browsing

## 🚀 Live Demo

Visit the live site: [Your GitHub Pages URL will be here]

## 🛠️ Tech Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Supabase (PostgreSQL + Storage)
- **Hosting:** GitHub Pages
- **No build process required!**

## 📦 Setup

### 1. Prerequisites

- A [Supabase](https://supabase.com) account (free tier works great)
- A GitHub account for hosting

### 2. Supabase Configuration

Follow the detailed instructions in [SETUP.md](SETUP.md) to:
1. Create a Supabase project
2. Set up the database table for images
3. Configure storage bucket for image files
4. Enable public access policies

### 3. Configure Your Credentials

Edit `js/config.js` and add your Supabase project details:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',
  anonKey: 'your-anon-key-here'
};
```

### 4. Deploy to GitHub Pages

See [GITHUB_PAGES_DEPLOY.md](GITHUB_PAGES_DEPLOY.md) for complete deployment instructions.

## 📁 Project Structure

```
kittybooru/
├── index.html              # Main gallery page
├── upload.html             # Image upload interface
├── image.html              # Individual image detail page
├── css/
│   └── styles.css          # Booru-style CSS
├── js/
│   ├── config.js           # Supabase configuration
│   ├── supabase.js         # Supabase client & API wrapper
│   ├── gallery.js          # Gallery page logic
│   ├── upload.js           # Upload page logic
│   └── image.js            # Image detail page logic
└── README.md               # You are here!
```

## 🎯 Usage

### Uploading Images
1. Click **Upload** in the navigation
2. Drag and drop an image or click to select
3. Add tags (comma-separated)
4. Optionally add a description
5. Click **Upload Image**

### Browsing & Searching
- Browse all images on the main gallery page
- Use the search box to filter by tag
- Click tags in the tag cloud to filter
- Click any image to view full details

### Tag Navigation
- Tags are clickable throughout the site
- Click a tag to filter the gallery
- Tag cloud shows the most popular tags

## 🔒 Security

- All user input is sanitized to prevent XSS attacks
- Supabase anon key is safe to expose in client-side code
- Row Level Security (RLS) policies control data access
- No sensitive credentials in the codebase

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers supported

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Future Enhancements

- Pagination for large galleries
- Tag autocomplete from existing tags
- Advanced search with tag combinations
- Image sorting options (newest, popular, random)
- User accounts and favorites
- Rating system

---

Built with ❤️ using vanilla JavaScript and Supabase
