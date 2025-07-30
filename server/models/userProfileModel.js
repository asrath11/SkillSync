import mongoose from 'mongoose';
const { Schema } = mongoose;

const userProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    profilePicture: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },
    bio: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    skills: {
      type: [String],
      set: (skills) =>
        Array.isArray(skills) ? skills.map((s) => s.trim().toLowerCase()) : [],
    },
    learningGoals: { type: String, trim: true },
    learningCategories: { type: [String] },
    learningTimeFrame: { type: String, trim: true },
    successCriteria: { type: String, trim: true },
    timeZone: { type: String, trim: true },
    timeCommitment: { type: String, required: true, trim: true },
    availability: { type: [String], required: true },
    workingStyle: {
      type: String,
      enum: ['independent', 'collaborative', 'mixed approach'],
      required: true,
    },
    preferredCommunication: {
      type: String,
      enum: ['frequent check-ins', 'regular updates', 'flexible communication'],
      required: true,
    },
    learningStyle: {
      type: String,
      enum: [
        'visual',
        'hands-on learner',
        'discussion based',
        'reading and research',
      ],
      required: true,
    },
    projectPreference: {
      type: String,
      enum: [
        'real-world projects',
        'learning exercises',
        'open source contribution',
        'personal projects',
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
export default UserProfile;
