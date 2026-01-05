// Script to populate database with packages for each destination
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schemas
const destinationSchema = new mongoose.Schema({
  name: String,
  state: String,
  category: String,
  description: String,
  images: [String],
  rating: Number,
  totalReviews: Number,
  budgetPerDay: Number,
  tags: [String],
  location: String,
  highlights: [String],
  bestTimeToVisit: String,
  createdAt: { type: Date, default: Date.now }
});

const packageSchema = new mongoose.Schema({
  destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'destinations', required: true },
  name: { type: String, required: true },
  budgetPerDay: { type: Number, required: true },
  minBudget: { type: Number, required: true },
  maxBudget: { type: Number, required: true },
  totalDays: { type: Number, default: 3 },
  defaultItemIds: [{ 
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'destinationitems' },
    itemType: { type: String, enum: ["stay", "foodspot", "localgem", "activity"] }
  }],
  popularity: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  totalBookings: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  highlights: [String],
  images: [String],
  description: String
});

const Destination = mongoose.model('destinations', destinationSchema);
const Package = mongoose.model('packages', packageSchema);

// Package templates with different budget tiers
const packageTemplates = [
  {
    name: 'Budget Package',
    budgetPerDay: 800,
    minBudget: 600,
    maxBudget: 1200,
    totalDays: 3,
    rating: 4.0,
    highlights: ['Budget Hotels', 'Local Transport', 'Basic Meals', 'Sightseeing'],
    description: 'Perfect for budget-conscious travelers'
  },
  {
    name: 'Standard Package',
    budgetPerDay: 1200,
    minBudget: 1000,
    maxBudget: 1800,
    totalDays: 4,
    rating: 4.3,
    highlights: ['3-Star Hotels', 'AC Transport', 'Breakfast & Dinner', 'City Tours'],
    description: 'Comfortable stay with good amenities'
  },
  {
    name: 'Premium Package',
    budgetPerDay: 1800,
    minBudget: 1500,
    maxBudget: 2500,
    totalDays: 5,
    rating: 4.5,
    highlights: ['Premium Hotels', 'Private Cab', 'All Meals', 'Guided Tours', 'Adventure Activities'],
    description: 'Luxury experience with premium services'
  },
  {
    name: 'Deluxe Package',
    budgetPerDay: 2500,
    minBudget: 2000,
    maxBudget: 3500,
    totalDays: 6,
    rating: 4.7,
    highlights: ['4-Star Hotels', 'Luxury Car', 'Fine Dining', 'Exclusive Tours', 'Spa Access'],
    description: 'Ultimate comfort and luxury'
  },
  {
    name: 'Luxury Package',
    budgetPerDay: 3500,
    minBudget: 3000,
    maxBudget: 5000,
    totalDays: 7,
    rating: 4.9,
    highlights: ['5-Star Hotels', 'Luxury Transport', 'Fine Dining', 'Spa & Wellness', 'Exclusive Experiences'],
    description: 'The most luxurious travel experience'
  }
];

// Function to generate random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Main seeding function
async function seedPackages() {
  try {
    console.log('Starting package seeding...');

    // Get all destinations
    const destinations = await Destination.find({}).lean();
    console.log(`Found ${destinations.length} destinations`);

    if (destinations.length === 0) {
      console.log(' No destinations found. Please seed destinations first.');
      await mongoose.connection.close();
      process.exit(1);
    }

    // Clear existing packages (optional - comment out if you want to keep existing)
    await Package.deleteMany({});
    console.log('Cleared existing packages');

    const allPackages = [];

    // Create packages for each destination
    for (const destination of destinations) {
      // Create 3-5 packages per destination (random selection from templates)
      const numPackages = getRandomNumber(3, 5);
      const selectedTemplates = packageTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, numPackages);

      for (const template of selectedTemplates) {
        const packageData = {
          destinationId: destination._id,
          name: `${destination.name} - ${template.name}`,
          budgetPerDay: template.budgetPerDay,
          minBudget: template.minBudget,
          maxBudget: template.maxBudget,
          totalDays: template.totalDays,
          rating: Math.min(5, Math.max(0, template.rating + (Math.random() * 0.3 - 0.15))), // Add slight variation, ensure 0-5
          popularity: getRandomNumber(0, 100),
          totalBookings: getRandomNumber(0, 50),
          isActive: true,
          highlights: template.highlights,
          description: template.description,
          images: destination.images || [],
          defaultItemIds: [] // Empty for now - can be populated later with actual items
        };

        allPackages.push(packageData);
      }
    }

    // Insert all packages
    console.log(`Inserting ${allPackages.length} packages into database...`);
    await Package.insertMany(allPackages);

    console.log('Packages seeded successfully!');
    console.log(`Total packages added: ${allPackages.length}`);
    console.log(`   - Average packages per destination: ${(allPackages.length / destinations.length).toFixed(1)}`);

    // Show statistics
    const packageCounts = await Package.aggregate([
      {
        $group: {
          _id: '$destinationId',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log(`\n Package Distribution:`);
    console.log(`   - Destinations with packages: ${packageCounts.length}`);
    console.log(`   - Min packages per destination: ${Math.min(...packageCounts.map(p => p.count))}`);
    console.log(`   - Max packages per destination: ${Math.max(...packageCounts.map(p => p.count))}`);

    // Close connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding packages:', error);
    process.exit(1);
  }
}

// Run the seeding
seedPackages();

