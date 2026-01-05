# Components Explanation Guide

## How Components Are Used in `pages/[package].js`

### Overview
The `package.js` file uses 5 reusable components to display package information. Each component handles a specific part of the UI, making the code cleaner and more maintainable.

---

## 1. PackageHero Component

### Usage in package.js (Line 132)
```javascript
<PackageHero name={name} description={description} heroImage={heroImage} budget={budget} />
```

### What It Does
- **Purpose**: Displays the hero/banner section at the top of the package page
- **Props Received**:
  - `name`: Package destination name (e.g., "Goa", "Manali")
  - `description`: Short description of the destination
  - `heroImage`: Background image URL
  - `budget`: Budget information (e.g., "₹3,000/day per person")

### Component Details
- **Styled Components**:
  - `HeroSection`: A Paper component with background image and overlay gradient
  - `HeroContent`: Stack container for centered content
  - `BudgetChip`: Glassmorphic chip showing budget info

- **Features**:
  - Full-width hero section (300px height)
  - Background image with dark gradient overlay for text readability
  - Responsive typography (smaller on mobile, larger on desktop)
  - White text with shadow for contrast
  - Budget chip with glassmorphic effect (blurred background)

### Visual Structure
```
┌─────────────────────────────────┐
│   [Background Image + Overlay]  │
│                                  │
│         Package Name             │
│      Package Description         │
│      [Budget Chip]              │
└─────────────────────────────────┘
```

---

## 2. SectionCard Component

### Usage in package.js (Lines 136, 148)
```javascript
<SectionCard title="What's Included">
  {/* Content goes here */}
</SectionCard>

<SectionCard title="Trip Itinerary">
  {/* Content goes here */}
</SectionCard>
```

### What It Does
- **Purpose**: Wrapper component that creates a consistent card container for different sections
- **Props Received**:
  - `title`: Section heading (e.g., "What's Included", "Trip Itinerary")
  - `children`: Any content placed inside the card

### Component Details
- **Styled Component**: `StyledSectionCard` - A Card with gradient background
- **Features**:
  - Consistent styling for all section cards
  - Gradient background (white to light blue)
  - Large shadow for depth
  - Title with gradient text effect (primary color gradient)
  - Full height container for flexible content

### Visual Structure
```
┌─────────────────────────────┐
│   Section Title (Gradient)   │
│ ─────────────────────────── │
│                             │
│      [Children Content]     │
│                             │
└─────────────────────────────┘
```

---

## 3. IncludedItemCard Component

### Usage in package.js (Lines 138-142)
```javascript
{displayItems.map((item, index) => (
  <Grid item xs={6} key={index}>
    <IncludedItemCard item={item} />
  </Grid>
))}
```

### What It Does
- **Purpose**: Displays individual items included in the package (Hotel, Restaurant, Activities, Transport)
- **Props Received**:
  - `item`: Object containing:
    - `title`: Item name (e.g., "Accommodation", "Dining")
    - `icon`: MUI Icon component
    - `color`: Color code for icon and gradient
    - `image`: Image URL
    - `description`: Array of description strings

### Component Details
- **Styled Component**: `StyledCard` - Card with hover effects
- **Features**:
  - Image at top (180px height) with color gradient overlay
  - Icon and title in header
  - Bullet-pointed description list
  - Hover effect: lifts up and increases shadow
  - Cursor pointer for interactivity

### Data Structure Example
```javascript
item = {
  title: "Accommodation",
  icon: HotelIcon,
  color: "#00a8cc",
  image: "https://...",
  description: [
    "3-star beach resort",
    "Sea-facing rooms",
    "Complimentary breakfast",
    "Budget: ₹2,500/night"
  ]
}
```

### Visual Structure
```
┌─────────────────┐
│   [Image]       │
│   [Gradient]    │
├─────────────────┤
│ 🏨 Accommodation│
│ • 3-star resort │
│ • Sea-facing    │
│ • Breakfast     │
└─────────────────┘
```

---

## 4. ItineraryDayCard Component

### Usage in package.js (Lines 150-152)
```javascript
{displayItinerary.map((day, index) => (
  <ItineraryDayCard key={index} day={day} index={index} />
))}
```

### What It Does
- **Purpose**: Displays a single day's itinerary with activities
- **Props Received**:
  - `day`: Object containing:
    - `day`: Day number (1, 2, 3, etc.)
    - `title`: Day title (e.g., "Arrival & Beach Exploration")
    - `icon`: MUI Icon component for the day
    - `activities`: Array of activity strings
  - `index`: Index for alternating background colors

### Component Details
- **Styled Component**: `StyledDayCard` - Paper with alternating backgrounds
- **Features**:
  - Alternating background colors (even/odd days)
  - Avatar with icon on the left
  - Day number and title
  - Bullet points for each activity
  - Hover effect: slides right and highlights
  - Responsive spacing

### Data Structure Example
```javascript
day = {
  day: 1,
  title: "Arrival & Beach Exploration",
  icon: BeachAccessIcon,
  activities: [
    "Arrive at Goa Airport",
    "Check-in at beach resort",
    "Relax at Baga Beach",
    "Evening at Calangute Beach",
    "Dinner at beach shack"
  ]
}
```

### Visual Structure
```
┌─────────────────────────────┐
│ [Icon] Day 1: Arrival &...   │
│        • Arrive at Airport   │
│        • Check-in at resort  │
│        • Relax at Baga Beach │
└─────────────────────────────┘
```

---

## 5. BudgetSummaryCard Component

### Usage in package.js (Lines 155-159)
```javascript
<BudgetSummaryCard
  totalBudget={totalBudget}
  isWithinBudget={isWithinBudget}
  customizedData={customizedData}
/>
```

### What It Does
- **Purpose**: Displays total budget calculation and budget status
- **Props Received**:
  - `totalBudget`: Calculated total amount (number)
  - `isWithinBudget`: Boolean indicating if total is within budget limit
  - `customizedData`: Object containing customized hotel/restaurant data (or null)

### Component Details
- **Styled Component**: `StyledBudgetCard` - Paper with conditional styling
- **Features**:
  - Dynamic background color:
    - Green gradient if within budget
    - Red gradient if over budget
    - Neutral if no customization
  - Shows total amount in formatted currency (₹)
  - Status chip (only shown when customized):
    - "✓ Within Budget" (green) or "⚠ Over Budget" (red)
  - Conditional border color based on status

### Visual Structure
```
┌─────────────────────────────┐
│      Total Budget            │
│ ─────────────────────────── │
│ Total Amount:  ₹12,000      │
│ ─────────────────────────── │
│   [✓ Within Budget]         │
└─────────────────────────────┘
```

---

## Complete Flow in package.js

### 1. Data Preparation (Lines 101-126)
```javascript
// Map items and check for customizations
const displayItems = packageData.includedItems.map(...)
const displayItinerary = customizedItinerary || packageData.itineraryDays
const totalBudget = calculateTotalBudget(...)
const isWithinBudget = totalBudget <= budgetLimit
```

### 2. Component Rendering (Lines 128-172)
```javascript
<PageContainer>
  <Navbar />
  <Container>
    {/* 1. Hero Section */}
    <PackageHero {...heroProps} />
    
    <Grid container>
      {/* 2. Left Column - Included Items */}
      <Grid item xs={12} lg={6}>
        <SectionCard title="What's Included">
          <Grid container>
            {displayItems.map(item => (
              <IncludedItemCard item={item} />
            ))}
          </Grid>
        </SectionCard>
      </Grid>
      
      {/* 3. Right Column - Itinerary */}
      <Grid item xs={12} lg={6}>
        <SectionCard title="Trip Itinerary">
          <Stack>
            {displayItinerary.map((day, index) => (
              <ItineraryDayCard day={day} index={index} />
            ))}
          </Stack>
          
          <BudgetSummaryCard {...budgetProps} />
          
          {/* Action Buttons */}
        </SectionCard>
      </Grid>
    </Grid>
  </Container>
</PageContainer>
```

---

## Benefits of This Component Structure

1. **Reusability**: Each component can be used in other pages
2. **Maintainability**: Changes to card styles only need to be made once
3. **Readability**: Main file is cleaner and easier to understand
4. **Consistency**: All cards follow the same design patterns
5. **Separation of Concerns**: Each component handles its own styling and logic

---

## Component Props Summary

| Component | Props | Type | Description |
|-----------|-------|------|-------------|
| `PackageHero` | `name`, `description`, `heroImage`, `budget` | string, string, string, string | Hero section data |
| `SectionCard` | `title`, `children` | string, ReactNode | Section wrapper |
| `IncludedItemCard` | `item` | object | Item data (hotel, restaurant, etc.) |
| `ItineraryDayCard` | `day`, `index` | object, number | Day itinerary data |
| `BudgetSummaryCard` | `totalBudget`, `isWithinBudget`, `customizedData` | number, boolean, object | Budget information |

