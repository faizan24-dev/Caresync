import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Patient from '../../../models/Patient_model';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectDB();
    
    const { name, email, password } = await request.json();

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return NextResponse.json(
        { message: 'Patient with this email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = await Patient.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'Patient registered successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred during registration', error: error.message },
      { status: 500 }
    );
  }
}