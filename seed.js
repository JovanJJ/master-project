import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables FIRST
dotenv.config({ path: path.resolve('.env.local') });

// Now import modules that use environment variables
import { connectDB } from './lib/db';
import Worker from './lib/models/Worker';
import mongoose from 'mongoose';

// --- Utility function to generate a random number within a range ---
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- Data for generation ---
const professions = ['Plumber', 'Electrician', 'Programer', 'Handyman', 'Carpenter', 'Tutor'];
const cities = ['New York', 'London', 'Boston', 'Los Angeles', 'Chicago'];
const genders = ['Male', 'Female'];

// --- 1. Generate a large array of data ---
const initialWorkers = Array.from({ length: 50 }).map((_, index) => {
  const firstName = index % 2 === 0 ? 'John' + index : 'Jane' + index;
  const lastName = 'Doe' + index;
  const gender = genders[getRandom(0, 1)];

  return {
    firstName: firstName,
    lastName: lastName,
    profession: professions[getRandom(0, professions.length - 1)],
    location: cities[getRandom(0, cities.length - 1)],
    birthDay: getRandom(1, 28),
    birthMonth: getRandom(1, 12),
    birthYear: getRandom(1975, 2000),
    gender: gender,
    email: `${firstName.toLowerCase()}${index}@example.com`,
    phone: `+1-555-${getRandom(100, 999)}-${getRandom(1000, 9999)}`,
    rate: `$${getRandom(40, 150)}/hr`,
  };
});


// --- 2. The Core Seeding Function (remains the same structure) ---
async function seedDB() {
  console.log('Starting database seeding...');
  await connectDB();
  
  try {
    console.log('🗑️ Deleting all existing Worker records...');
    await Worker.deleteMany({});
    
    console.log(`✨ Inserting ${initialWorkers.length} new Worker records...`);
    await Worker.insertMany(initialWorkers);
    
    console.log('✅ Database seeding complete!');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1); 
  } finally {
    console.log('🔌 Disconnecting from MongoDB.');
    await mongoose.connection.close();
    process.exit(0); 
  }
}

// --- 3. Run the script ---
seedDB();