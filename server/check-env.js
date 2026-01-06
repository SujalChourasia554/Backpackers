// Simple script to check if .env file is properly configured
require('dotenv').config();

console.log('\n========================================');
console.log('🔍 ENVIRONMENT VARIABLES CHECK');
console.log('========================================\n');

const requiredVars = [
  'MONGODB_URI',
  'PORT',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'JWT_SECRET'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  const exists = !!value;
  const hasSpaces = value ? (value.startsWith(' ') || value.endsWith(' ')) : false;
  
  if (exists) {
    console.log(`✅ ${varName}`);
    console.log(`   Length: ${value.length} characters`);
    if (hasSpaces) {
      console.log(`   ⚠️  WARNING: Value has leading or trailing spaces!`);
      allGood = false;
    }
    if (varName.includes('KEY')) {
      console.log(`   Preview: ${value.substring(0, 15)}...`);
    }
  } else {
    console.log(`❌ ${varName} - NOT FOUND`);
    allGood = false;
  }
  console.log('');
});

console.log('========================================');
if (allGood) {
  console.log('✅ All environment variables are properly configured!');
} else {
  console.log('❌ Some environment variables are missing or have issues.');
  console.log('\nPlease check server/env-template.txt for the correct format.');
}
console.log('========================================\n');

// Show all RAZOR* variables
const razorVars = Object.keys(process.env).filter(k => k.includes('RAZOR'));
if (razorVars.length > 0) {
  console.log('Found these Razorpay-related variables:');
  razorVars.forEach(v => console.log(`  - ${v}`));
} else {
  console.log('⚠️  No Razorpay variables found in environment!');
}
console.log('');

