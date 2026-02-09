# G D Enterprises - Scrap Business Website

A modern, responsive website for a scrap buying business built with HTML, CSS, JavaScript, and Firebase. Features a secure admin panel for real-time price management.

## Features

✨ **Responsive Design**
- Mobile-first approach
- Fully responsive on all devices (mobile, tablet, desktop)
- Optimized performance

📱 **Key Sections**
- Hero Section with clear call-to-action
- Services Grid (11+ scrap categories)
- Dynamic Pricing Page (Firebase-powered)
- How It Works (3-step process)
- Why Choose Us (6 differentiators)
- Testimonials Carousel
- Contact Form
- Floating WhatsApp & Phone buttons
- Comprehensive Footer

🎨 **Design**
- Modern blue/teal color scheme
- Professional typography
- Smooth animations and transitions
- Accessible and user-friendly

🔧 **Functionality**
- Mobile responsive navigation menu
- Smooth scroll navigation
- Contact form with validation
- Testimonials carousel
- Scroll animations
- **🔥 NEW: Dynamic Price Management System**

## 🆕 Admin Panel - Price Management

**Secure admin panel for updating scrap prices in real-time!**

### Features:
✅ **Password Protected** - Secure login system  
✅ **Real-Time Updates** - Changes appear instantly  
✅ **Easy to Use** - No coding required  
✅ **Mobile Friendly** - Edit from anywhere  
✅ **9 Categories** - Electronics, Metals, Plastics, Batteries, etc.  
✅ **Add/Edit/Delete** - Full CRUD operations  
✅ **Firebase Powered** - Free, secure, and fast  

### Quick Setup:
1. Follow **QUICKSTART.md** (5 minutes)
2. Or see **FIREBASE_SETUP.md** for detailed guide
3. Access admin panel at `/admin.html`

### Documentation:
- 📖 **QUICKSTART.md** - Get started in 5 minutes
- 📚 **FIREBASE_SETUP.md** - Complete setup guide
- 🎨 **ADMIN_FEATURES.md** - Feature overview

## Project Structure

```
G D Enterprises/
├── index.html              # Main homepage
├── prices.html             # Dynamic pricing page
├── admin.html              # 🔐 Admin panel (password protected)
├── [other service pages]   # Electronics, metals, etc.
├── css/
│   ├── styles.css          # Main styles
│   └── service-pages.css   # Service page styles
├── js/
│   ├── script.js           # Main functionality
│   ├── firebase-config.js  # 🔥 Firebase configuration
│   ├── admin-prices.js     # Admin panel logic
│   └── load-prices.js      # Dynamic price loading
├── data/
│   └── prices.json         # Price data backup
├── assets/                 # Images and media
├── QUICKSTART.md           # 5-minute setup guide
├── FIREBASE_SETUP.md       # Detailed Firebase guide
├── ADMIN_FEATURES.md       # Admin panel overview
├── .gitignore
└── README.md               # This file
```

## Getting Started Locally

1. **Clone or Download the Project**
   ```bash
   git clone https://github.com/yourusername/G D Enterprises.git
   cd G D Enterprises
   ```

2. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **View in Browser**
   - Navigate to `http://localhost:8000`

## Customization Guide

### Update Contact Information
Edit the following in `index.html`:
- Phone number: `+918143695940`
- Email: `mdmazharuddin05@gmail.com`
- Address: `Hyderabad, Telangana, India`
- WhatsApp link: `https://wa.me/918143695940`

### Change Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #0066cc;        /* Main blue */
    --secondary-color: #00bfa5;      /* Teal accent */
    --accent-color: #ff6b35;         /* Orange */
    --text-dark: #333333;
    --text-light: #666666;
}
```

### Update Service Categories
Modify the services grid in the `#services` section of `index.html` to match your actual offerings.

### Add Your Business Information
Replace all placeholder text with your actual business details:
- Company name
- Service areas
- Contact details
- Testimonials
- Statistics

## Deploy to GitHub Pages

### Step 1: Initialize Git Repository
```bash
cd c:\Users\shams\Projects\G D Enterprises
git init
git add .
git commit -m "Initial G D Enterprises website commit"
```

### Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New Repository"
3. Name it `G D Enterprises` (or your preferred name)
4. **Important:** Repository name can be anything for custom domain, but for user/org pages use `username.github.io`

### Step 3: Connect Local Repo to GitHub
```bash
git remote add origin https://github.com/yourusername/G D Enterprises.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **main** and **/root** folder
   - Click **Save**
4. Wait 1-2 minutes for deployment
5. Your site will be live at: `https://yourusername.github.io/G D Enterprises`

### Step 5: Set Custom Domain (Optional)
1. In GitHub repo Settings → Pages
2. Add your custom domain (e.g., `G D Enterprises.com`)
3. Update your domain's DNS settings to point to GitHub Pages
4. GitHub will provide DNS instructions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Included

### Current Implementation
- ✅ Fully responsive HTML structure
- ✅ Mobile-first CSS with media queries
- ✅ JavaScript for interactivity
- ✅ Mobile navigation menu
- ✅ Contact form
- ✅ Testimonials carousel
- ✅ Smooth scrolling
- ✅ Floating contact buttons
- ✅ Placeholder content for pilot version

### Recommended Future Enhancements
- Add actual images to `assets/` folder
- Integrate email service (Formspree, Basin, SendGrid)
- Add Google Analytics
- Implement service area map
- Add blog section
- Customer testimonials with real images
- Price list page
- FAQ section
- Service request appointment system

## Performance Tips

- Compress and optimize images before adding to `assets/`
- Use modern image formats (WebP with fallbacks)
- Minify CSS and JavaScript for production
- Enable caching in GitHub Pages
- Test with Lighthouse in DevTools

## SEO Optimization Tips

- Add meta tags for each page
- Include structured data (Schema.org)
- Create sitemap.xml
- Submit to Google Search Console
- Use descriptive headings and alt text
- Optimize for local SEO keywords

## Troubleshooting

### GitHub Pages Not Deploying
- Ensure branch is `main` (or your default branch)
- Check Settings → Pages is configured correctly
- Wait 2-5 minutes after push
- Clear browser cache

### Styling Not Loading
- Clear browser cache (Ctrl+Shift+Del)
- Check file paths in HTML are correct
- Verify CSS file is in `css/` folder

### JavaScript Not Working
- Check browser console for errors (F12)
- Verify Font Awesome CDN is loading
- Ensure script.js is in `js/` folder

## License

This project is open source. Feel free to use, modify, and distribute as needed.

## Support

For questions or improvements, feel free to create an issue or contact support.

---

**Last Updated:** January 2026  
**Version:** 1.0 (Pilot)  
**Status:** Ready for GitHub Pages Deployment

**Note:** This is a pilot version with placeholder content. Replace placeholders with your actual business information before going live.
