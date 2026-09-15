import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' }, { status: 200 });
    
    // Clear the doctor cookie
    response.cookies.set({
      name: 'doctorToken',
      value: '',
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}