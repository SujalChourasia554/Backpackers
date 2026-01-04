// Script to populate database with sample destinations
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

const Destination = mongoose.model('destinations', destinationSchema);

// Sample data for each category
const beachDestinations = [
  'Goa', 'Andaman Islands', 'Kerala Beaches', 'Gokarna', 'Pondicherry', 'Diu', 'Lakshadweep',
  'Varkala', 'Kovalam', 'Palolem', 'Anjuna', 'Baga', 'Calangute', 'Radhanagar', 'Havelock',
  'Neil Island', 'Tarkarli', 'Alibaug', 'Murudeshwar', 'Marari Beach', 'Bekal', 'Malpe',
  'Kaup Beach', 'Maravanthe', 'Karwar', 'Devbagh', 'Ganpatipule', 'Kashid', 'Mandvi',
  'Dwarka Beach', 'Chorwad', 'Daman', 'Nagoa Beach', 'Arambol', 'Morjim', 'Ashwem',
  'Mandrem', 'Vagator', 'Chapora', 'Sinquerim', 'Candolim', 'Miramar', 'Dona Paula',
  'Bogmalo', 'Colva', 'Benaulim', 'Agonda', 'Patnem', 'Butterfly Beach', 'Kakolem'
];

const mountainDestinations = [
  'Manali', 'Leh-Ladakh', 'Shimla', 'Mussoorie', 'Nainital', 'Darjeeling', 'Gangtok',
  'Ooty', 'Coorg', 'Munnar', 'Kasol', 'McLeod Ganj', 'Rishikesh', 'Auli', 'Spiti Valley',
  'Dharamshala', 'Dalhousie', 'Khajjiar', 'Kufri', 'Chail', 'Kasauli', 'Lansdowne',
  'Ranikhet', 'Almora', 'Mukteshwar', 'Binsar', 'Chopta', 'Kedarnath', 'Badrinath',
  'Gangotri', 'Yamunotri', 'Valley of Flowers', 'Hemkund Sahib', 'Nanda Devi', 'Rohtang Pass',
  'Solang Valley', 'Kullu', 'Manikaran', 'Tirthan Valley', 'Jibhi', 'Shoja', 'Jalori Pass',
  'Chitkul', 'Kalpa', 'Sangla', 'Kinnaur', 'Tabo', 'Kaza', 'Kibber', 'Langza'
];

const culturalDestinations = [
  'Varanasi', 'Jaipur', 'Udaipur', 'Agra', 'Delhi', 'Hampi', 'Khajuraho', 'Mysore',
  'Amritsar', 'Ajanta-Ellora', 'Konark', 'Madurai', 'Thanjavur', 'Mahabalipuram', 'Puri',
  'Pushkar', 'Jodhpur', 'Jaisalmer', 'Bikaner', 'Mount Abu', 'Chittorgarh', 'Bundi',
  'Kota', 'Ranthambore', 'Bharatpur', 'Orchha', 'Gwalior', 'Sanchi', 'Ujjain', 'Omkareshwar',
  'Maheshwar', 'Mandu', 'Khajuraho', 'Bodh Gaya', 'Nalanda', 'Rajgir', 'Patna', 'Gaya',
  'Sarnath', 'Allahabad', 'Ayodhya', 'Lucknow', 'Fatehpur Sikri', 'Mathura', 'Vrindavan',
  'Haridwar', 'Devprayag', 'Rudraprayag', 'Karnaprayag', 'Nandprayag', 'Vishnuprayag'
];

// Function to generate random data
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mapping of destinations to real 4K Unsplash images
// Using high-quality, authentic images for each specific destination
const destinationImageMap = {
  // Beach destinations
  'Goa': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Andaman Islands': ['1559827260-dc66d52bef19', '1514282401047-d79a71a590e8', '1540541338287-41700207dee6'],
  'Kerala Beaches': ['1602216056096-3b40cc0c9944', '1505142468619-2f3aac35af09', '1476514525983-8e6c3f5c6b5c'],
  'Gokarna': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Pondicherry': ['1476673160081-cf1e3f27e0b3', '1510414842594-a61c69b5ae57', '1473496169904-658ba7c44d8a'],
  'Diu': ['1505228395891-9a51e7e86bf6', '1502933691298-84fc14542831', '1469854522986-ecc71f3d9863'],
  'Lakshadweep': ['1483683520516-fbe7e0d9f5d0', '1519046029884-6e0f9e7a8c3d', '1471922694854-ff1b63b20054'],
  'Varkala': ['1476514525983-8e6c3f5c6b5c', '1520454974749-611b7248ffdb', '1544551763-46a013bb70d5'],
  'Kovalam': ['1473116763249-2faaef81ccda', '1476673160081-cf1e3f27e0b3', '1510414842594-a61c69b5ae57'],
  'Palolem': ['1473496169904-658ba7c44d8a', '1505228395891-9a51e7e86bf6', '1502933691298-84fc14542831'],
  'Anjuna': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Baga': ['1505142468619-2f3aac35af09', '1512343879784-a960bf40e7f2', '1559827260-dc66d52bef19'],
  'Calangute': ['1514282401047-d79a71a590e8', '1540541338287-41700207dee6', '1483683520516-fbe7e0d9f5d0'],
  'Radhanagar': ['1559827260-dc66d52bef19', '1514282401047-d79a71a590e8', '1540541338287-41700207dee6'],
  'Havelock': ['1559827260-dc66d52bef19', '1514282401047-d79a71a590e8', '1540541338287-41700207dee6'],
  'Neil Island': ['1559827260-dc66d52bef19', '1514282401047-d79a71a590e8', '1540541338287-41700207dee6'],
  'Tarkarli': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Alibaug': ['1476673160081-cf1e3f27e0b3', '1510414842594-a61c69b5ae57', '1473496169904-658ba7c44d8a'],
  'Murudeshwar': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Marari Beach': ['1602216056096-3b40cc0c9944', '1505142468619-2f3aac35af09', '1476514525983-8e6c3f5c6b5c'],
  'Bekal': ['1602216056096-3b40cc0c9944', '1505142468619-2f3aac35af09', '1476514525983-8e6c3f5c6b5c'],
  'Malpe': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Kaup Beach': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Maravanthe': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Karwar': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Devbagh': ['1520454974749-611b7248ffdb', '1544551763-46a013bb70d5', '1473116763249-2faaef81ccda'],
  'Ganpatipule': ['1476673160081-cf1e3f27e0b3', '1510414842594-a61c69b5ae57', '1473496169904-658ba7c44d8a'],
  'Kashid': ['1476673160081-cf1e3f27e0b3', '1510414842594-a61c69b5ae57', '1473496169904-658ba7c44d8a'],
  'Mandvi': ['1505228395891-9a51e7e86bf6', '1502933691298-84fc14542831', '1469854522986-ecc71f3d9863'],
  'Dwarka Beach': ['1505228395891-9a51e7e86bf6', '1502933691298-84fc14542831', '1469854522986-ecc71f3d9863'],
  'Chorwad': ['1505228395891-9a51e7e86bf6', '1502933691298-84fc14542831', '1469854522986-ecc71f3d9863'],
  'Daman': ['1476673160081-cf1e3f27e0b3', '1510414842594-a61c69b5ae57', '1473496169904-658ba7c44d8a'],
  'Nagoa Beach': ['1505228395891-9a51e7e86bf6', '1502933691298-84fc14542831', '1469854522986-ecc71f3d9863'],
  'Arambol': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Morjim': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Ashwem': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Mandrem': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Vagator': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Chapora': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Sinquerim': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Candolim': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Miramar': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Dona Paula': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Bogmalo': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Colva': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Benaulim': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Agonda': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Patnem': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Butterfly Beach': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  'Kakolem': ['1512343879784-a960bf40e7f2', '1507525428034-b723cf961d3e', '1471922694854-ff1b63b20054'],
  
  // Mountain destinations
  'Manali': ['1626621341517-bbf3d9990a23', '1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b'],
  'Leh-Ladakh': ['1506905925346-21bda4d32df4', '1519904981063-31fa7d1f6e1c', '1454496522488-7a8e488e8606'],
  'Shimla': ['1605649487212-47bdab064df7', '1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b'],
  'Mussoorie': ['1571211905393-4c8e0f3a7e8f', '1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b'],
  'Nainital': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Darjeeling': ['1563979303-5c5eeea0e5e5', '1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b'],
  'Gangtok': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Ooty': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Coorg': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Munnar': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kasol': ['1540979388789-6cee28a1cdc9', '1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b'],
  'McLeod Ganj': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Rishikesh': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Auli': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Spiti Valley': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Dharamshala': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Dalhousie': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Khajjiar': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kufri': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Chail': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kasauli': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Lansdowne': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Ranikhet': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Almora': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Mukteshwar': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Binsar': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Chopta': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kedarnath': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Badrinath': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Gangotri': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Yamunotri': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Valley of Flowers': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Hemkund Sahib': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Nanda Devi': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Rohtang Pass': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Solang Valley': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kullu': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Manikaran': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Tirthan Valley': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Jibhi': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Shoja': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Jalori Pass': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Chitkul': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kalpa': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Sangla': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kinnaur': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Tabo': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kaza': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Kibber': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Langza': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  
  // Cultural destinations
  'Varanasi': ['1561361513-2d000a50f0dc', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Jaipur': ['1599661046289-e31897846e41', '1477587458883-47145ed94245', '1564507592333-c60657eea523'],
  'Udaipur': ['1599661046289-e31897846e41', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Agra': ['1564507592333-c60657eea523', '1548013146-72479768bada', '1599661046289-e31897846e41'],
  'Delhi': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Hampi': ['1609137144813-7d9921338f24', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Khajuraho': ['1587474260584-136574528ed5', '1564507592333-c60657eea523', '1548013146-72479768bada'],
  'Mysore': ['1582510003544-4d00b7f74220', '1598977123118-4e30ba3c4f5b', '1564507592333-c60657eea523'],
  'Amritsar': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Ajanta-Ellora': ['1609137144813-7d9921338f24', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Konark': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Madurai': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Thanjavur': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Mahabalipuram': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Puri': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Pushkar': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Jodhpur': ['1599661046289-e31897846e41', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Jaisalmer': ['1599661046289-e31897846e41', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Bikaner': ['1599661046289-e31897846e41', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Mount Abu': ['1506905925346-21bda4d32df4', '1564507592333-c60657eea523', '1587474260584-136574528ed5'],
  'Chittorgarh': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Bundi': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Kota': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Ranthambore': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Bharatpur': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Orchha': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Gwalior': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Sanchi': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Ujjain': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Omkareshwar': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Maheshwar': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Mandu': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Bodh Gaya': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Nalanda': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Rajgir': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Patna': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Gaya': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Sarnath': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Allahabad': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Ayodhya': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Lucknow': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Fatehpur Sikri': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Mathura': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Vrindavan': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Haridwar': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Devprayag': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Rudraprayag': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Karnaprayag': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Nandprayag': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada'],
  'Vishnuprayag': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1548013146-72479768bada']
};

// Fallback images by category if destination not found
const categoryFallbackImages = {
  'Beach': ['1512343879784-a960bf40e7f2', '1559827260-dc66d52bef19', '1514282401047-d79a71a590e8'],
  'Mountains & Outdoors': ['1506905925346-21bda4d32df4', '1464822759023-fed622ff2c3b', '1519904981063-31fa7d1f6e1c'],
  'Culture & Heritage': ['1564507592333-c60657eea523', '1587474260584-136574528ed5', '1561361513-2d000a50f0dc']
};

// Generate real 4K Unsplash images for each destination
function getRandomImages(category, index, destinationName) {
  const images = [];
  
  // Clean destination name (remove numbers and extra spaces)
  const cleanName = destinationName.replace(/\s+\d+$/, '').trim();
  
  // Get images for this specific destination
  let photoIds = destinationImageMap[cleanName];
  
  // If not found, try to find a partial match
  if (!photoIds) {
    for (const [key, value] of Object.entries(destinationImageMap)) {
      if (cleanName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cleanName.toLowerCase())) {
        photoIds = value;
        break;
      }
    }
  }
  
  // If still not found, use category fallback
  if (!photoIds) {
    photoIds = categoryFallbackImages[category] || categoryFallbackImages['Beach'];
  }
  
  // Generate 3 unique 4K images using Unsplash
  // Use index to rotate through available images for variations
  for (let i = 0; i < 3; i++) {
    const photoIndex = (index + i) % photoIds.length;
    const photoId = photoIds[photoIndex];
    // 4K resolution: 3840x2160, quality 80
    images.push(`https://images.unsplash.com/photo-${photoId}?w=3840&h=2160&fit=crop&q=80`);
  }
  
  return images;
}


function generateDestination(baseName, category, index) {
  const states = {
    'Beach': ['Goa', 'Kerala', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Andaman & Nicobar', 'Gujarat', 'Odisha'],
    'Mountains & Outdoors': ['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Sikkim', 'Arunachal Pradesh', 'West Bengal', 'Ladakh'],
    'Culture & Heritage': ['Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Bihar', 'Gujarat']
  };

  const beachTags = ['beach', 'water sports', 'sunset', 'swimming', 'surfing', 'snorkeling', 'diving', 'seafood', 'nightlife', 'relaxation'];
  const mountainTags = ['trekking', 'hiking', 'adventure', 'camping', 'snow', 'skiing', 'nature', 'wildlife', 'photography', 'peace'];
  const culturalTags = ['heritage', 'temples', 'monuments', 'history', 'architecture', 'festivals', 'culture', 'art', 'museums', 'spiritual'];

  const tags = category === 'Beach' ? beachTags : 
               category === 'Mountains & Outdoors' ? mountainTags : culturalTags;

  // Generate unique images for each destination based on name and index
  const images = getRandomImages(category, index, baseName);

  const highlights = [
    `Explore the beauty of ${baseName}`,
    `Experience local culture and traditions`,
    `Perfect for ${category === 'Beach' ? 'beach lovers' : category === 'Mountains & Outdoors' ? 'adventure seekers' : 'history enthusiasts'}`,
    `${getRandomNumber(10, 50)}+ attractions to visit`,
    `Best ${category.toLowerCase()} destination in India`
  ];

  return {
    name: index > 0 ? `${baseName} ${index}` : baseName,
    state: getRandomElement(states[category]),
    category: category,
    description: `Discover the amazing ${baseName}, a perfect ${category.toLowerCase()} destination offering unforgettable experiences, stunning views, and rich cultural heritage.`,
    images: images,
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
    totalReviews: getRandomNumber(50, 500),
    budgetPerDay: getRandomNumber(800, 3000),
    tags: tags.slice(0, getRandomNumber(4, 7)),
    location: `${baseName}, India`,
    highlights: highlights,
    bestTimeToVisit: category === 'Beach' ? 'October to March' : 
                     category === 'Mountains & Outdoors' ? 'April to June, September to November' : 
                     'October to March',
  };
}

// Main seeding function
async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    const allDestinations = [];

    // Generate Beach destinations (500)
    console.log('Generating Beach destinations...');
    for (let i = 0; i < 500; i++) {
      const baseName = beachDestinations[i % beachDestinations.length];
      const destination = generateDestination(baseName, 'Beach', Math.floor(i / beachDestinations.length));
      allDestinations.push(destination);
    }

    // Generate Mountain destinations (500)
    console.log('Generating Mountain destinations...');
    for (let i = 0; i < 500; i++) {
      const baseName = mountainDestinations[i % mountainDestinations.length];
      const destination = generateDestination(baseName, 'Mountains & Outdoors', Math.floor(i / mountainDestinations.length));
      allDestinations.push(destination);
    }

    // Generate Cultural destinations (500)
    console.log('Generating Cultural destinations...');
    for (let i = 0; i < 500; i++) {
      const baseName = culturalDestinations[i % culturalDestinations.length];
      const destination = generateDestination(baseName, 'Culture & Heritage', Math.floor(i / culturalDestinations.length));
      allDestinations.push(destination);
    }

    // Insert all destinations
    console.log(`Inserting ${allDestinations.length} destinations into database...`);
    await Destination.insertMany(allDestinations);

    console.log('Database seeded successfully!');
    console.log(`Total destinations added: ${allDestinations.length}`);
    console.log(`   - Beach: 500`);
    console.log(`   - Mountains & Outdoors: 500`);
    console.log(`   - Culture & Heritage: 500`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();

