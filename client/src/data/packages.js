import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TerrainIcon from '@mui/icons-material/Terrain';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import HikingIcon from '@mui/icons-material/Hiking';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const packagesData = {
  goa: {
    name: "Goa",
    description: "Sun, Sand & Serenity - Experience the best beaches of India",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920&h=1080&fit=crop&q=80",
    budget: "₹3,000/day per person",
    includedItems: [
      {
        title: "Accommodation",
        icon: HotelIcon,
        color: "#00a8cc",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80",
        description: [
          "3-star beach resort",
          "Sea-facing rooms",
          "Complimentary breakfast",
          "Budget: ₹2,500/night"
        ]
      },
      {
        title: "Dining",
        icon: RestaurantIcon,
        color: "#ff6b35",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80",
        description: [
          "Beach shack meals",
          "Goan seafood specialties",
          "Continental breakfast",
          "Budget: ₹1,000/day"
        ]
      },
      {
        title: "Activities",
        icon: BeachAccessIcon,
        color: "#4a7c2c",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&q=80",
        description: [
          "Water sports - ₹1,500",
          "Sunset cruise - ₹800",
          "Beach hopping tour - ₹600"
        ]
      },
      {
        title: "Transport",
        icon: DirectionsBoatIcon,
        color: "#8b4513",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop&q=80",
        description: [
          "Scooter rental",
          "Airport transfers",
          "Local sightseeing"
        ]
      }
    ],
    itineraryDays: [
      {
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
      },
      {
        day: 2,
        title: "Water Sports & Adventure",
        icon: LocalActivityIcon,
        activities: [
          "Breakfast at hotel",
          "Water sports at Anjuna Beach",
          "Parasailing and jet skiing",
          "Lunch at beach cafe",
          "Visit Chapora Fort for sunset"
        ]
      },
      {
        day: 3,
        title: "South Goa Exploration",
        icon: PhotoCameraIcon,
        activities: [
          "Visit Palolem Beach",
          "Explore Cabo de Rama Fort",
          "Lunch at local restaurant",
          "Sunset cruise on Mandovi River",
          "Dinner at Panjim"
        ]
      }
    ]
  },
  manali: {
    name: "Manali",
    description: "Majestic Peaks Await - Explore the Himalayan paradise",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&h=1080&fit=crop&q=80",
    budget: "₹2,500/day per person",
    includedItems: [
      {
        title: "Accommodation",
        icon: HotelIcon,
        color: "#2d5016",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop&q=80",
        description: [
          "Mountain view hotel",
          "Cozy rooms with heating",
          "Complimentary breakfast",
          "Budget: ₹2,000/night"
        ]
      },
      {
        title: "Dining",
        icon: RestaurantIcon,
        color: "#ff6b35",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=80",
        description: [
          "Local Himachali cuisine",
          "Continental options",
          "Cafe hopping in Old Manali",
          "Budget: ₹800/day"
        ]
      },
      {
        title: "Activities",
        icon: HikingIcon,
        color: "#4a7c2c",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&q=80",
        description: [
          "Trekking - ₹1,200",
          "Paragliding - ₹2,500",
          "Solang Valley activities - ₹1,500"
        ]
      },
      {
        title: "Transport",
        icon: TerrainIcon,
        color: "#8b4513",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop&q=80",
        description: [
          "Local cab service",
          "Airport transfers",
          "Sightseeing tours"
        ]
      }
    ],
    itineraryDays: [
      {
        day: 1,
        title: "Arrival & Local Sightseeing",
        icon: TerrainIcon,
        activities: [
          "Arrive at Kullu-Manali Airport",
          "Check-in at hotel",
          "Visit Hadimba Temple",
          "Explore Mall Road",
          "Dinner at Old Manali cafe"
        ]
      },
      {
        day: 2,
        title: "Solang Valley Adventure",
        icon: LocalActivityIcon,
        activities: [
          "Breakfast at hotel",
          "Drive to Solang Valley",
          "Paragliding experience",
          "Cable car ride",
          "Return to Manali for dinner"
        ]
      },
      {
        day: 3,
        title: "Rohtang Pass Excursion",
        icon: HikingIcon,
        activities: [
          "Early morning drive to Rohtang Pass",
          "Snow activities and photography",
          "Lunch at local dhaba",
          "Visit Vashisht hot springs",
          "Evening at leisure"
        ]
      }
    ]
  },
  hampi: {
    name: "Hampi",
    description: "Journey Through Time - Discover ancient ruins and heritage",
    heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1920&h=1080&fit=crop&q=80",
    budget: "₹2,000/day per person",
    includedItems: [
      {
        title: "Accommodation",
        icon: HotelIcon,
        color: "#8b4513",
        image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop&q=80",
        description: [
          "Heritage guesthouse",
          "Traditional decor",
          "Complimentary breakfast",
          "Budget: ₹1,500/night"
        ]
      },
      {
        title: "Dining",
        icon: RestaurantIcon,
        color: "#ff6b35",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop&q=80",
        description: [
          "South Indian cuisine",
          "Rooftop restaurants",
          "Local thali meals",
          "Budget: ₹600/day"
        ]
      },
      {
        title: "Activities",
        icon: TempleHinduIcon,
        color: "#d2691e",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop&q=80",
        description: [
          "Guided heritage tour - ₹800",
          "Coracle ride - ₹300",
          "Bicycle rental - ₹200"
        ]
      },
      {
        title: "Transport",
        icon: PhotoCameraIcon,
        color: "#8b4513",
        image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop&q=80",
        description: [
          "Bicycle for temple hopping",
          "Auto rickshaw",
          "Local bus service"
        ]
      }
    ],
    itineraryDays: [
      {
        day: 1,
        title: "Arrival & Virupaksha Temple",
        icon: TempleHinduIcon,
        activities: [
          "Arrive at Hospet Junction",
          "Check-in at guesthouse",
          "Visit Virupaksha Temple",
          "Explore Hampi Bazaar",
          "Sunset at Hemakuta Hill"
        ]
      },
      {
        day: 2,
        title: "Royal Enclosure & Monuments",
        icon: PhotoCameraIcon,
        activities: [
          "Breakfast at cafe",
          "Visit Vittala Temple complex",
          "Explore Royal Enclosure",
          "Lunch at local restaurant",
          "Visit Lotus Mahal and Elephant Stables"
        ]
      },
      {
        day: 3,
        title: "Riverside & Departure",
        icon: DirectionsBoatIcon,
        activities: [
          "Coracle ride on Tungabhadra River",
          "Visit Anjaneya Hill",
          "Explore Matanga Hill",
          "Last-minute shopping",
          "Departure to Hospet"
        ]
      }
    ]
  }
};

export default packagesData;

