import mongoose from 'mongoose';
const { Schema } = mongoose;
import validator from 'validator';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minLength: [6, 'Full name must be at least 6 characters long'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Combined pre-save hook
userSchema.pre('save', async function () {
  if (this.password !== this.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  this.confirmPassword = undefined;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);
