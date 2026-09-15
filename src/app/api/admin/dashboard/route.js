import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Doctor from '../../../models/Doctor';
import Patient from '../../../models/Patient_model';
import Appointment from '../../../models/Appointment';

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('adminToken');

    if (!tokenCookie) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    jwt.verify(tokenCookie.value, process.env.JWT_SECRET);

    // Fetch all system metrics
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });
    const patients = await Patient.find({}).select('-password').sort({ createdAt: -1 });
    const appointments = await Appointment.find({})
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        doctors,
        patients,
        appointments,
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}