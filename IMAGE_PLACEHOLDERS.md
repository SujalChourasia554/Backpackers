# 🖼️ Placeholder Images - Quick Reference

## Option 1: Download Free Images

Use these search terms on **Unsplash** (https://unsplash.com/) or **Pexels** (https://pexels.com/):

### Landing Page Cards
1. **beaches-card.jpg**: "tropical beach aerial view turquoise"
2. **mountains-card.jpg**: "himalayan mountains landscape"
3. **cultural-card.jpg**: "indian temple heritage architecture"

### Beaches Page
1. **beach-hero.jpg**: "tropical beach paradise wide"
2. **goa-beach.jpg**: "goa beach india palm trees"
3. **maldives.jpg**: "maldives overwater bungalow"
4. **andaman.jpg**: "andaman islands clear water"
5. **kerala-beach.jpg**: "kerala beach backwaters"
6. **phuket.jpg**: "phuket beach thailand"
7. **bali-beach.jpg**: "bali beach sunset"

### Mountains Page
1. **mountain-hero.jpg**: "himalayan mountain range wide"
2. **manali.jpg**: "manali snow mountains"
3. **ladakh.jpg**: "ladakh landscape mountains"
4. **kasol.jpg**: "kasol valley himachal"
5. **shimla.jpg**: "shimla hills colonial"
6. **darjeeling.jpg**: "darjeeling tea garden mountains"
7. **mussoorie.jpg**: "mussoorie hills uttarakhand"

### Cultural & Heritage Page
1. **cultural-hero.jpg**: "indian heritage monument wide"
2. **jaipur.jpg**: "jaipur hawa mahal pink city"
3. **varanasi.jpg**: "varanasi ghats ganges"
4. **hampi.jpg**: "hampi ruins karnataka"
5. **agra.jpg**: "taj mahal agra"
6. **mysore.jpg**: "mysore palace illuminated"
7. **udaipur.jpg**: "udaipur city palace lake"

---

## Option 2: Use Unsplash API (Temporary Placeholders)

Replace image paths in the code with Unsplash URLs:

### Example for Beaches Page:
```javascript
// In pages/beaches.js, replace image paths:

const beachDestinations = [
  {
    name: "Goa Beaches",
    location: "Goa, India",
    description: "Golden sands, vibrant nightlife, and Portuguese heritage",
    price: "₹1500",
    image: "https://source.unsplash.com/800x600/?goa,beach",
    rating: 4.8
  },
  // ... more destinations
];
```

### Unsplash Source URLs:

**Landing Page:**
```javascript
image: "https://source.unsplash.com/800x600/?tropical,beach"
image: "https://source.unsplash.com/800x600/?mountain,himalaya"
image: "https://source.unsplash.com/800x600/?indian,temple"
```

**Beaches:**
```javascript
image: "https://source.unsplash.com/800x600/?goa,beach"
image: "https://source.unsplash.com/800x600/?maldives,ocean"
image: "https://source.unsplash.com/800x600/?andaman,island"
image: "https://source.unsplash.com/800x600/?kerala,beach"
image: "https://source.unsplash.com/800x600/?phuket,beach"
image: "https://source.unsplash.com/800x600/?bali,beach"
```

**Mountains:**
```javascript
image: "https://source.unsplash.com/800x600/?manali,snow"
image: "https://source.unsplash.com/800x600/?ladakh,mountain"
image: "https://source.unsplash.com/800x600/?kasol,valley"
image: "https://source.unsplash.com/800x600/?shimla,hills"
image: "https://source.unsplash.com/800x600/?darjeeling,tea"
image: "https://source.unsplash.com/800x600/?mussoorie,hills"
```

**Cultural:**
```javascript
image: "https://source.unsplash.com/800x600/?jaipur,palace"
image: "https://source.unsplash.com/800x600/?varanasi,ghat"
image: "https://source.unsplash.com/800x600/?hampi,ruins"
image: "https://source.unsplash.com/800x600/?tajmahal,agra"
image: "https://source.unsplash.com/800x600/?mysore,palace"
image: "https://source.unsplash.com/800x600/?udaipur,lake"
```

**Hero Backgrounds (in CSS):**
```css
/* In Beaches.module.css */
background-image: url('https://source.unsplash.com/1920x1080/?tropical,beach,paradise');

/* In Mountains.module.css */
background-image: url('https://source.unsplash.com/1920x1080/?mountain,himalaya,landscape');

/* In Cultural.module.css */
background-image: url('https://source.unsplash.com/1920x1080/?indian,heritage,monument');
```

---

## Option 3: Use Specific Unsplash Photo IDs

For consistent, high-quality images, use specific Unsplash photo IDs:

### Beaches:
```javascript
// Goa Beach
image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop"

// Maldives
image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop"

// Andaman
image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"

// Kerala Beach
image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop"

// Phuket
image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop"

// Bali
image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop"
```

### Mountains:
```javascript
// Manali
image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop"

// Ladakh
image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"

// Kasol
image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop"

// Shimla
image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop"

// Darjeeling
image: "https://images.unsplash.com/photo-1563979303-5c5eeea0e5e5?w=800&h=600&fit=crop"

// Mussoorie
image: "https://images.unsplash.com/photo-1571211905393-4c8e0f3a7e8f?w=800&h=600&fit=crop"
```

### Cultural:
```javascript
// Jaipur
image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop"

// Varanasi
image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop"

// Hampi
image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop"

// Agra (Taj Mahal)
image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop"

// Mysore
image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&h=600&fit=crop"

// Udaipur
image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop"
```

---

## 🎯 Recommended Approach

**For Development:**
Use Option 2 (Unsplash Source API) - Quick and easy, random images

**For Production:**
Use Option 1 (Downloaded Images) - Better performance, no external dependencies

---

## 📝 How to Apply

### Method 1: Update Code (Temporary)
Replace image paths in:
- `pages/index.js` (lines 10, 17, 24)
- `pages/beaches.js` (line 14 in CSS, lines 19-60 in destinations array)
- `pages/mountains.js` (line 14 in CSS, lines 19-60 in destinations array)
- `pages/cultural.js` (line 14 in CSS, lines 19-60 in destinations array)

### Method 2: Add to Public Folder (Permanent)
1. Download images from Unsplash/Pexels
2. Rename according to the required names
3. Place in `public/` folder
4. No code changes needed!

---

## ⚡ Quick Start Script

Want to use Unsplash placeholders immediately? Here's a quick find-and-replace guide:

### In pages/beaches.js:
Find: `image: "/goa-beach.jpg"`
Replace: `image: "https://source.unsplash.com/800x600/?goa,beach"`

### In pages/mountains.js:
Find: `image: "/manali.jpg"`
Replace: `image: "https://source.unsplash.com/800x600/?manali,snow"`

### In pages/cultural.js:
Find: `image: "/jaipur.jpg"`
Replace: `image: "https://source.unsplash.com/800x600/?jaipur,palace"`

Repeat for all destinations!

---

## 🎨 Image Optimization Tips

1. **Compress images**: Use TinyPNG (https://tinypng.com/)
2. **Resize before upload**: 800x600 for cards, 1920x1080 for heroes
3. **Use WebP format**: Better compression, modern browsers support it
4. **Lazy loading**: Next.js Image component handles this automatically

---

## 🔗 Useful Resources

- **Unsplash**: https://unsplash.com/
- **Pexels**: https://pexels.com/
- **Pixabay**: https://pixabay.com/
- **TinyPNG**: https://tinypng.com/
- **Image Resizer**: https://www.iloveimg.com/resize-image

---

**Note**: Unsplash API has rate limits. For production, download and host images locally in the `public/` folder.

