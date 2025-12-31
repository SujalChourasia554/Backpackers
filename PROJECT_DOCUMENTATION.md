# Backpackers Travel Website - Project Documentation

## 🎯 Project Overview

A beautiful, modern travel website built with Next.js featuring three main travel categories:
- **Beaches** - Ocean and coastal destinations
- **Mountains** - Hill stations and mountain getaways  
- **Cultural & Heritage** - Historical and cultural sites

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (Pages Router)
- **UI Library**: Material-UI (MUI) v6.1.0
- **Language**: JavaScript (No TypeScript)
- **Styling**: CSS Modules + MUI Components (No Tailwind)
- **Linting**: ESLint enabled
- **Icons**: MUI Icons

## 📁 Project Structure

```
Backpackers/
├── Components/
│   ├── Navbar.jsx              # Navigation component
│   └── Navbar.module.css       # Navbar styles
├── pages/
│   ├── index.js                # Landing page with category cards
│   ├── beaches.js              # Beaches destination page
│   ├── mountains.js            # Mountains destination page
│   ├── cultural.js             # Cultural & Heritage page
│   ├── _app.js                 # App wrapper
│   └── _document.js            # Document structure
├── src/
│   └── theme.js                # Centralized theme configuration
├── styles/
│   ├── Home.module.css         # Landing page styles
│   ├── Beaches.module.css      # Beaches page styles
│   ├── Mountains.module.css    # Mountains page styles
│   ├── Cultural.module.css     # Cultural page styles
│   └── globals.css             # Global styles
├── public/
│   └── [images]                # Static assets
├── package.json
├── jsconfig.json               # Import alias configuration
└── next.config.mjs
```

## 🎨 Theme Configuration

The `src/theme.js` file contains all color palettes, typography, and design tokens:

### Color Schemes

**Beaches Theme** (Ocean & Aqua)
- Primary: `#00a8cc` (Turquoise)
- Secondary: `#0dcaf0` (Light Cyan)
- Dark: `#006d8f` (Deep Ocean Blue)

**Mountains Theme** (Earthy Greens)
- Primary: `#2d5016` (Forest Green)
- Secondary: `#4a7c2c` (Moss Green)
- Dark: `#1b3209` (Dark Forest)

**Cultural Theme** (Rich Browns & Gold)
- Primary: `#8b4513` (Saddle Brown)
- Secondary: `#d2691e` (Chocolate)
- Dark: `#5c2e0a` (Dark Brown)

### Typography
- Primary Font: `'Poppins', 'Segoe UI', 'Roboto', sans-serif`
- Font weights: 300-800
- Responsive font sizes

## 📄 Page Structure

### 1. Landing Page (`/`)
**Sections:**
- Hero section with main tagline
- Three category cards:
  - Beaches
  - Mountains
  - Cultural & Heritage
- AI-powered trip planning section

**Features:**
- Smooth animations
- Hover effects on cards
- Links to category pages

### 2. Beaches Page (`/beaches`)
**Sections:**
- Hero section with "BEACH" title
- Popular beach destinations grid (6 cards):
  - Goa Beaches
  - Maldives
  - Andaman Islands
  - Kerala Beaches
  - Phuket
  - Bali Beaches
- "Book Now" call-to-action section
- "Reasons for Choosing Us" section

**Theme:** Ocean blue color scheme with wave animations

### 3. Mountains Page (`/mountains`)
**Sections:**
- Hero section with "MOUNTAINS" title
- Popular mountain destinations grid (6 cards):
  - Manali
  - Leh-Ladakh
  - Kasol
  - Shimla
  - Darjeeling
  - Mussoorie
- "Book Now" call-to-action section
- "Reasons for Choosing Us" section

**Theme:** Forest green color scheme with mountain imagery

### 4. Cultural & Heritage Page (`/cultural`)
**Sections:**
- Hero section with "CULTURAL & HERITAGE" title
- Popular cultural destinations grid (6 cards):
  - Jaipur
  - Varanasi
  - Hampi
  - Agra
  - Mysore
  - Udaipur
- "Book Now" call-to-action section
- "Reasons for Choosing Us" section

**Theme:** Brown and gold color scheme with heritage aesthetics

## 🖼️ Required Images

To complete the visual design, add these images to the `public/` folder:

### Landing Page Images
- `beaches-card.jpg` - Beach category card (recommended: 800x600px)
- `mountains-card.jpg` - Mountains category card (recommended: 800x600px)
- `cultural-card.jpg` - Cultural category card (recommended: 800x600px)

### Beaches Page Images
- `beach-hero.jpg` - Hero background (recommended: 1920x1080px)
- `goa-beach.jpg` - Goa destination card
- `maldives.jpg` - Maldives destination card
- `andaman.jpg` - Andaman destination card
- `kerala-beach.jpg` - Kerala destination card
- `phuket.jpg` - Phuket destination card
- `bali-beach.jpg` - Bali destination card

### Mountains Page Images
- `mountain-hero.jpg` - Hero background (recommended: 1920x1080px)
- `manali.jpg` - Manali destination card
- `ladakh.jpg` - Ladakh destination card
- `kasol.jpg` - Kasol destination card
- `shimla.jpg` - Shimla destination card
- `darjeeling.jpg` - Darjeeling destination card
- `mussoorie.jpg` - Mussoorie destination card

### Cultural Page Images
- `cultural-hero.jpg` - Hero background (recommended: 1920x1080px)
- `jaipur.jpg` - Jaipur destination card
- `varanasi.jpg` - Varanasi destination card
- `hampi.jpg` - Hampi destination card
- `agra.jpg` - Agra destination card
- `mysore.jpg` - Mysore destination card
- `udaipur.jpg` - Udaipur destination card

**Image Guidelines:**
- Hero images: 1920x1080px (landscape, high quality)
- Destination cards: 800x600px (landscape)
- Format: JPG or WebP for better performance
- Optimize images before adding (use tools like TinyPNG)

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## ✨ Key Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px
- Fluid typography and spacing

### 2. Smooth Animations
- Fade-in effects on page load
- Hover animations on cards
- Smooth transitions throughout

### 3. MUI Integration
- Material-UI components for consistency
- Custom theme integration
- Responsive Grid system
- Beautiful buttons and cards

### 4. Theme System
- Centralized color management
- Easy theme switching
- Consistent design tokens
- Typography system

### 5. SEO Ready
- Semantic HTML structure
- Proper heading hierarchy
- Meta tags support (via _document.js)

## 🎯 Component Features

### Navbar Component
- Fixed position at top
- Links: Home, Explore, Moments, Book
- Responsive design
- Logo placeholder

### Category Cards (Landing Page)
- Hover effects with scale transform
- Background images
- Smooth transitions
- Color-coded by category

### Destination Cards
- Image zoom on hover
- Rating display
- Price per day
- Location information
- Smooth shadow transitions

### Book Now Section
- Prominent call-to-action
- Gradient background
- Pattern overlay
- Responsive button

### Reasons Section
- Three key benefits:
  - Trust (verified reviews)
  - Support (24/7 service)
  - One-stop Travel
- Icon-based cards
- Hover animations

## 🔧 Configuration

### Import Alias
The project uses `@/` as an alias for the root directory:
```javascript
import Navbar from "@/Components/Navbar";
import theme from "@/src/theme";
import styles from "@/styles/Home.module.css";
```

Configured in `jsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🎨 Styling Approach

### CSS Modules
- Scoped styles per component
- No naming conflicts
- Better maintainability

### MUI sx Prop
- Inline styling with theme access
- Dynamic styles based on state
- Responsive design utilities

### Global Styles
- Font imports
- CSS resets
- Base typography

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 768px
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🌟 Best Practices Implemented

1. **Component Reusability**: Consistent card structure across pages
2. **Performance**: CSS Modules for optimal loading
3. **Accessibility**: Semantic HTML and ARIA labels
4. **Maintainability**: Centralized theme configuration
5. **Code Organization**: Clear folder structure
6. **Naming Conventions**: Descriptive and consistent

## 🔄 Future Enhancements

Potential features to add:
- [ ] Search functionality
- [ ] Filter destinations by price/rating
- [ ] User authentication
- [ ] Booking system integration
- [ ] Reviews and ratings system
- [ ] Image gallery for destinations
- [ ] Map integration
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Blog section

## 📞 Support

For issues or questions:
1. Check the Next.js documentation: https://nextjs.org/docs
2. Review MUI documentation: https://mui.com/
3. Check the terminal for error messages
4. Verify all images are in the `public/` folder

## 📝 Notes

- The project uses Next.js Pages Router (not App Router)
- No TypeScript - pure JavaScript
- No Tailwind CSS - using CSS Modules + MUI
- ESLint is configured for code quality
- The server runs on port 3000 (or 3001 if 3000 is busy)

## 🎉 Current Status

✅ **Completed:**
- Landing page with 3 category cards
- Beaches destination page
- Mountains destination page
- Cultural & Heritage destination page
- Theme configuration
- Responsive design
- MUI integration
- Navigation component
- Book Now sections
- Reasons sections

⏳ **Pending:**
- Add actual images to public folder
- Optional: Add more destinations
- Optional: Implement booking functionality

---

**Built with ❤️ for Backpackers**

