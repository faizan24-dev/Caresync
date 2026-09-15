import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the doctor\'s name'],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Please provide a specialization (e.g., Cardiologist)'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    availableDays: {
      type: [String],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    }
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default Doctor;