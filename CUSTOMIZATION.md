# QuickScrap - Quick Reference Guide

## 🔧 Common Customizations

### 1. Change Phone Number
**Location:** Multiple places in `index.html`

Find and replace:
- `+919999999999` → Your phone number
- `919999999999` → Your WhatsApp number (without +91)

**Files to edit:**
- `index.html` (lines with phone numbers)

---

### 2. Change Email Address
**Find and replace:**
- `info@quickscrap.com` → Your email

**In:**
- `index.html` (contact section, footer)

---

### 3. Update Service Areas
**In `index.html`, find the footer section:**

```html
<div class="footer-section">
    <h3>Service Areas</h3>
    <ul>
        <li><a href="#">Banjara Hills</a></li>
        <li><a href="#">Jubilee Hills</a></li>
        <li><a href="#">Kondapur</a></li>
        <li><a href="#">Manikonda</a></li>
    </ul>
</div>
```

Replace with your actual service areas.

---

### 4. Change Business Colors

**In `css/styles.css`, find `:root` section:**

```css
:root {
    --primary-color: #0066cc;        /* Change this for main color */
    --primary-dark: #0052a3;         /* Darker shade of primary */
    --secondary-color: #00bfa5;      /* Change for accent color */
    --accent-color: #ff6b35;         /* Orange accents */
}
```

**Color Suggestions for Scrap Business:**
- Professional Blue: `#0066cc`
- Eco-Green: `#00a651`
- Corporate Teal: `#008080`
- Trust Gray: `#404040`

---

### 5. Update Statistics in Hero Section

**Find in `index.html`:**

```html
<div class="hero-stats">
    <div class="stat">
        <h3>5000+</h3>
        <p>Happy Customers</p>
    </div>
    <!-- Update these numbers -->
</div>
```

---

### 6. Modify Services List

**Find "What We Buy" section:**

```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-microchip"></i>
    </div>
    <h3>Electronics</h3>
    <p>Old computers, laptops, and electronic devices</p>
</div>
```

Change the `<i>` icon class, heading, and description for each service.

**Available Icons from Font Awesome:**
- `fa-microchip` (Electronics)
- `fa-fan` (AC/Appliances)
- `fa-industry` (Metal)
- `fa-battery-three-quarters` (Batteries)
- `fa-chair` (Furniture)
- `fa-car` (Vehicles)

[Full list: https://fontawesome.com/icons]

---

### 7. Update Testimonials

**Find testimonials section:**

```html
<div class="testimonial-card">
    <div class="stars">
        <i class="fas fa-star"></i> × 5
    </div>
    <p class="testimonial-text">"Great service! They came..."</p>
    <p class="testimonial-author">- Raj Kumar, Banjara Hills</p>
</div>
```

Replace with real customer testimonials.

---

### 8. Add Company Logo

**Step 1:** Save your logo as `logo.png` in `assets/` folder

**Step 2:** Update navigation in `index.html`:

```html
<div class="logo">
    <img src="assets/logo.png" alt="QuickScrap" style="width: 40px; height: auto;">
    <span>QuickScrap</span>
</div>
```

---

### 9. Add Hero Background Image

**Step 1:** Save hero image as `hero-bg.jpg` in `assets/`

**Step 2:** Update `css/styles.css`:

```css
.hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%),
                url('../assets/hero-bg.jpg') center/cover;
    /* rest of styles */
}
```

---

### 10. Add Google Analytics

**Step 1:** Get tracking code from Google Analytics

**Step 2:** Add to `index.html` in `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 📝 Editing Guide

### Using VS Code (Recommended)

1. **Open project:**
   - File → Open Folder
   - Select `c:\Users\shams\Projects\QuickScrap`

2. **Edit files:**
   - Click file in Explorer
   - Make changes
   - Ctrl+S to save

3. **Preview changes:**
   - Right-click `index.html`
   - "Open with Default Browser"
   - Refresh (Ctrl+F5) to see changes

### Text Editor Alternative

1. Right-click file → Open with → Notepad++/VS Code
2. Make changes
3. Save (Ctrl+S)
4. Refresh browser (Ctrl+F5)

---

## 📤 Deploying Updates to GitHub

After making changes:

```powershell
cd c:\Users\shams\Projects\QuickScrap

# Check what changed
git status

# Add all changes
git add .

# Create commit with message
git commit -m "Update contact info and testimonials"

# Push to GitHub
git push origin main
```

**Website updates live in 1-2 minutes!**

---

## 🎨 CSS Classes Reference

### Button Styles

```html
<!-- Primary Button (Teal) -->
<button class="cta-btn primary-btn">Request Pickup</button>

<!-- Secondary Button (Outline) -->
<button class="cta-btn secondary-btn">Learn More</button>
```

### Grid Layouts

```html
<!-- Auto-responsive grid (3 columns on desktop, 1 on mobile) -->
<div class="services-grid">
    <div class="service-card">Content</div>
</div>

<!-- 2-column grid -->
<div class="contact-wrapper">
    <div>Left</div>
    <div>Right</div>
</div>
```

### Container

```html
<!-- Standard container with max-width -->
<div class="container">
    Content stays within 1200px on desktop
</div>
```

---

## 📱 Mobile Menu Code

The mobile menu automatically appears on screens < 768px.

Toggle button is controlled by `js/script.js`:

```javascript
// Menu opens/closes on click
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
```

---

## 🔗 External Resources

### Icons
- **Font Awesome**: https://fontawesome.com/icons
- Search for icons: heart, phone, envelope, map, etc.

### Colors
- **Color Picker**: https://htmlcolorcodes.com
- **Color Palette**: https://coolors.co

### Fonts
- Using System Fonts: `'Segoe UI', Tahoma, Geneva, Verdana`
- Or add Google Fonts to `<head>`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  ```

### Email Services
- **Formspree**: https://formspree.io (Contact forms)
- **Basin**: https://basinapp.com (Form submissions)
- **Mailchimp**: https://mailchimp.com (Email marketing)

---

## ❓ FAQ

**Q: How often should I update the website?**
A: At least monthly - update testimonials, service areas, and blog content.

**Q: Can I use a custom domain?**
A: Yes! GitHub Pages supports custom domains. Update DNS settings in your domain registrar.

**Q: How do I add a blog section?**
A: Create a new `blog.html` page and add link to navigation. Or use a static site generator.

**Q: Can I integrate payment?**
A: For accepting payments, add Stripe/PayPal integration in future version.

**Q: How do I get the website to appear in Google?**
A: Submit to Google Search Console, optimize for local keywords, add structured data.

**Q: Is the website secure?**
A: Yes! GitHub Pages provides free HTTPS. No passwords or sensitive data are stored.

---

## 🚨 Common Issues

### **Styles not loading after changes**
- Hard refresh: Ctrl+Shift+R
- Clear cache: Ctrl+Shift+Delete
- Check file path in `<link>` tag

### **Menu not responding on mobile**
- Check JavaScript is enabled
- Open DevTools (F12) → Console
- Look for error messages

### **Changes not showing on GitHub Pages**
- Push commits: `git push origin main`
- Wait 1-2 minutes
- Hard refresh GitHub Pages URL

### **Form not sending emails**
- Need to integrate email service
- Current form shows success but doesn't email
- Use Formspree (recommended): https://formspree.io

---

## ✅ Pre-Launch Checklist

Before making website live:

- [ ] Update all phone numbers
- [ ] Change email addresses
- [ ] Update service areas
- [ ] Replace testimonials
- [ ] Add company logo
- [ ] Update statistics
- [ ] Verify all links work
- [ ] Test on mobile (resize browser)
- [ ] Test contact form
- [ ] Check floating buttons
- [ ] Review colors and styling
- [ ] Test on different browsers
- [ ] Enable GitHub Pages
- [ ] Set up custom domain (optional)
- [ ] Add Google Analytics
- [ ] Submit to Google Business Profile

---

**For detailed documentation, see README.md**

**Happy customizing! 🎉**
