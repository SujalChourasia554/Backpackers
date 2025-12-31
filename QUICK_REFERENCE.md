# 🚀 Quick Reference Card - Backpackers Website

## 📍 URLs
- **Local**: http://localhost:3001
- **Landing**: http://localhost:3001/
- **Beaches**: http://localhost:3001/beaches
- **Mountains**: http://localhost:3001/mountains
- **Cultural**: http://localhost:3001/cultural

---

## 🎨 Theme Colors

### Beaches (Ocean Blue)
```css
Primary: #00a8cc
Dark: #006d8f
Accent: #80deea
```

### Mountains (Forest Green)
```css
Primary: #2d5016
Dark: #1b3209
Accent: #689f38
```

### Cultural (Brown/Gold)
```css
Primary: #8b4513
Dark: #5c2e0a
Accent: #daa520
```

---

## 📂 Key Files

### Pages
```
pages/index.js          → Landing page
pages/beaches.js        → Beaches page
pages/mountains.js      → Mountains page
pages/cultural.js       → Cultural page
```

### Theme
```
src/theme.js            → All colors & fonts
```

### Styles
```
styles/Home.module.css      → Landing styles
styles/Beaches.module.css   → Beaches styles
styles/Mountains.module.css → Mountains styles
styles/Cultural.module.css  → Cultural styles
```

---

## 🎯 Quick Commands

### Start Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Run Linter
```bash
npm run lint
```

### Install Dependencies
```bash
npm install
```

---

## 🖼️ Images Needed

### Landing Page (3)
- beaches-card.jpg
- mountains-card.jpg
- cultural-card.jpg

### Beaches Page (7)
- beach-hero.jpg
- goa-beach.jpg
- maldives.jpg
- andaman.jpg
- kerala-beach.jpg
- phuket.jpg
- bali-beach.jpg

### Mountains Page (7)
- mountain-hero.jpg
- manali.jpg
- ladakh.jpg
- kasol.jpg
- shimla.jpg
- darjeeling.jpg
- mussoorie.jpg

### Cultural Page (7)
- cultural-hero.jpg
- jaipur.jpg
- varanasi.jpg
- hampi.jpg
- agra.jpg
- mysore.jpg
- udaipur.jpg

**Total**: 24 images

---

## 🔧 Common Edits

### Change Destination Info
Edit the array in respective page:
```javascript
// pages/beaches.js (line 13-62)
const beachDestinations = [
  {
    name: "Destination Name",
    location: "Location, Country",
    description: "Description here",
    price: "₹2000",
    image: "/image.jpg",
    rating: 4.8
  }
];
```

### Change Theme Colors
Edit `src/theme.js`:
```javascript
beaches: {
  primary: '#00a8cc',  // Change this
}
```

### Change Hero Text
Edit in each page's JSX:
```javascript
<h1 className={styles.heroTitle}>BEACH</h1>
<p className={styles.heroSubtitle}>
  The Wonders Of Nature
</p>
```

---

## 📱 Responsive Breakpoints

```
Mobile:    < 480px
Tablet:    768px
Desktop:   1024px
Large:     1280px+
```

---

## 🎨 Import Theme

```javascript
import theme from '@/src/theme';

// Use in MUI:
sx={{ color: theme.colors.beaches.primary }}

// Access fonts:
sx={{ fontFamily: theme.typography.fontFamily.primary }}
```

---

## 🔗 Import Alias

```javascript
// Instead of: '../../../Components/Navbar'
import Navbar from '@/Components/Navbar';

// Instead of: '../../../styles/Home.module.css'
import styles from '@/styles/Home.module.css';

// Instead of: '../../../src/theme'
import theme from '@/src/theme';
```

---

## ✨ MUI Components Used

```javascript
import { 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Container, 
  Grid 
} from '@mui/material';

import { 
  ArrowForwardIcon,
  BeachAccessIcon,
  TerrainIcon,
  AccountBalanceIcon
} from '@mui/icons-material';
```

---

## 🎯 Page Structure

### All Destination Pages Have:
1. **Hero Section** - Full-screen with background
2. **Destinations Grid** - 6 cards in 3x2 grid
3. **Book Now Section** - CTA with gradient
4. **Reasons Section** - 3 benefit cards

---

## 🐛 Troubleshooting

### Port Already in Use
✅ Next.js auto-switches to 3001

### Images Not Loading
1. Check `public/` folder
2. Verify file names (case-sensitive)
3. Clear cache (Ctrl + Shift + R)

### Styles Not Updating
1. Stop server (Ctrl + C)
2. Delete `.next` folder
3. Run `npm run dev`

### Module Not Found
```bash
npm install
```

---

## 📚 Documentation

- **Full Docs**: PROJECT_DOCUMENTATION.md
- **Setup Guide**: SETUP_GUIDE.md
- **Images Guide**: IMAGE_PLACEHOLDERS.md
- **Summary**: IMPLEMENTATION_SUMMARY.md

---

## ✅ Status

```
✅ 4 Pages Complete
✅ Theme System Ready
✅ Responsive Design
✅ MUI Integrated
✅ Animations Working
✅ Navigation Functional
✅ No Linting Errors
```

---

## 🎊 Quick Test

1. Open http://localhost:3001
2. Click "Beaches" card → Should go to beaches page
3. Click "Mountains" card → Should go to mountains page
4. Click "Cultural & Heritage" → Should go to cultural page
5. Click "Home" in navbar → Should return to landing
6. Hover over cards → Should see animations

---

## 🌟 Features

- ✅ 18 destination cards
- ✅ 3 themed pages
- ✅ Book Now buttons
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Hover effects
- ✅ Rating system
- ✅ Price display

---

## 🚀 Production Ready

### To Deploy:
1. Add all images
2. Run `npm run build`
3. Deploy to Vercel/Netlify
4. Done! 🎉

---

**Need Help?** Check the documentation files or terminal for errors.

**Server Running?** Check http://localhost:3001

**Everything Working?** Start adding images! 🖼️

---

*Travel Smarter. Backpack Lighter.* ✈️

