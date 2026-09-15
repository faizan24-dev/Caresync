import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Doctor from '../../../models/Doctor';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    // 1. Find doctor by email and explicitly select password if it's set to select: false in schema
    const doctor = await Doctor.findOne({ email }).select('+password');
    if (!doctor) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    // 2. Check if password exists on the doctor document, if not, allow 'password123' as default for seeded docs
    let isMatch = false;
    if (doctor.password) {
      isMatch = password === doctor.password || (await bcrypt.compare(password, doctor.password));
    } else {
      // Fallback if password field was missing in seeded doc
      isMatch = password === 'password123';
    }

    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email, role: 'doctor' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Create response and set cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' }, { status: 200 });
    
    response.cookies.set({
      name: 'doctorToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Doctor login error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}