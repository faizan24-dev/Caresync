import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Doctor from '../../models/Doctor';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();

    // Clear existing doctors to avoid duplicate key errors on email
    await Doctor.deleteMany({});

    // Seed doctors with exact IDs and matching fields for your schema & login
    const seedDoctors = [
      {
        _id: new mongoose.Types.ObjectId('64b1f1c2e4b0a1a2b3c4d5e1'),
        name: 'Dr. Sarah Jenkins',
        specialization: 'Cardiologist',
        email: 'sarah@caresync.com',
        password: 'password123', // You can use this to test doctor login
      },
      {
        _id: new mongoose.Types.ObjectId('64b1f1c2e4b0a1a2b3c4d5e2'),
        name: 'Dr. Michael Chen',
        specialization: 'Dermatologist',
        email: 'michael@caresync.com',
        password: 'password123',
      },
      {
        _id: new mongoose.Types.ObjectId('64b1f1c2e4b0a1a2b3c4d5e3'),
        name: 'Dr. Emily Carter',
        specialization: 'General Practice',
        email: 'emily@caresync.com',
        password: 'password123',
      },
    ];

    await Doctor.insertMany(seedDoctors);

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded with doctors successfully! You can now log in with password "password123" for any doctor.' 
    }, { status: 200 });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}