import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Appointment from '../../../models/Appointment';
import Doctor from '../../../models/Doctor';
import Patient from '../../../models/Patient_model';

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('doctorToken') || cookieStore.get('token');

    if (!tokenCookie) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET);
    const doctorId = decoded.id;

    // Strictly fetch only appointments assigned to this specific doctor
    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'name email')
      .sort({ date: 1 });

    return NextResponse.json({ success: true, data: appointments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await dbConnect();
    const { appointmentId, status } = await req.json();

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return NextResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedAppointment }, { status: 200 });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}