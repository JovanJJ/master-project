import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model, models } = mongoose;

const WorkerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
    index: true, 
  },
  location: {
    type: String,
    required: true,
    index: true,
  },
  role: {
    type: String,
    default: "worker"
  },
  birthDay: {
    type: Number,
    min: 1,
    max: 31,
  },
  passwordResetToken: String,

  passwordResetExpires: Date,

  birthMonth: {
    type: Number,
    min: 1,
    max: 12,
  },
  birthYear: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Muški', 'Ženski'], // Restrict to specific values
  },
  // Contact details
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two workers share the same email
    lowercase: true,
  },
  password: { 
    type: String,
    required: true,
    select: false 
  }, 
  profileImage: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  // Optional field, kept for example
  rate: {
    type: String,
    default: 'Call for Quote'
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Hash password before saving
WorkerSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    throw new Error('Failed to hash password');
  }
});

// Method to compare passwords
WorkerSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Worker = models.Worker || model('Worker', WorkerSchema);

export default Worker;