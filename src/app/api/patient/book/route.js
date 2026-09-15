import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Appointment from '../../../models/Appointment';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    // 1. Check if the user is logged in by reading the cookie
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized. Please log in to book an appointment.' },
        { status: 401 }
      );
    }

    // 2. Decode the token to get the patient's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const patientId = decoded.id;

    // 3. Parse the data sent from the frontend form
    const { doctorId, date, timeSlot, reason } = await request.json();

    // 4. Save the appointment to MongoDB
    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      timeSlot,
      reason
    });

    return NextResponse.json(
      { message: 'Appointment booked successfully!', success: true },
      { status: 201 }
    );

  } catch (error) {
    console.log("\n❌ BOOKING CRASH ❌");
    console.log(error);
    console.log("------------------------\n");

    return NextResponse.json(
      { message: 'Failed to book appointment', error: error.message },
      { status: 500 }
    );
  }
}