import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db'; 
import Appointment from '../../../models/Appointment';
import Doctor from '../../../models/Doctor'; // <--- Import the Doctor model here so Mongoose registers it

export async function GET() {
  try {
    await dbConnect();

    // 1. Get token from cookies
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');

    if (!tokenCookie) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // 2. Decode token to extract patient ID
    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);
    const patientId = decoded.id;

    // 3. Fetch appointments for this specific patient
    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'name specialization')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: appointments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}