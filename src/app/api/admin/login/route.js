import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Default admin credentials (you can change or move these to .env as ADMIN_EMAIL & ADMIN_PASSWORD)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@caresync.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
    }

    // Create JWT token for admin
    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ success: true, message: 'Admin login successful' }, { status: 200 });
    
    response.cookies.set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}