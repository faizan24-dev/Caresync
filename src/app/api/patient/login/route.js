import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db'; // Updated to match your db.js
import Patient from '../../../models/Patient_model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    console.log("--- CHECKPOINT 1: Login Route Started ---");
    
    await connectDB();
    console.log("--- CHECKPOINT 2: Database Connected ---");
    
    const { email, password } = await request.json();
    console.log("--- CHECKPOINT 3: Checking credentials for:", email, "---");

    // 1. Check if patient exists
    const patient = await Patient.findOne({ email }).select('+password');
    if (!patient) {
      console.log("--- FAIL: Patient not found in DB ---");
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    console.log("--- CHECKPOINT 4: Patient Found ---");

    // 2. Verify password
    const isPasswordMatch = await bcrypt.compare(password, patient.password);
    if (!isPasswordMatch) {
      console.log("--- FAIL: Password does not match ---");
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    console.log("--- CHECKPOINT 5: Password Verified ---");

    // 3. Verify JWT Secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from .env.local file");
    }

    // 4. Create a JWT token
    const token = jwt.sign(
      { id: patient._id, role: patient.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log("--- CHECKPOINT 6: Token Generated ---");

    // 5. Send token in cookie
    const response = NextResponse.json(
      { message: 'Login successful', success: true },
      { status: 200 }
    );
    
    // UPDATED: maxAge has been removed to create a true Session Cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    
    console.log("--- CHECKPOINT 7: Login Complete! ---");
    return response;

  } catch (error) {
    console.log("\n❌ FATAL LOGIN CRASH ❌");
    console.log(error);
    console.log("------------------------\n");

    return NextResponse.json(
      { message: 'An error occurred during login', error: error.message },
      { status: 500 }
    );
  }
}