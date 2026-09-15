'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch('/api/patient/appointments');
        const data = await res.json();

        if (data.success) {
          setAppointments(data.data);
        } else {
          setError(data.message || 'Failed to load appointments');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Appointments</h1>
            <p className="text-slate-500 text-sm mt-1">View and track all your scheduled healthcare appointments.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/patient/book" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-blue-600/20 text-sm transition-all"
            >
              + Book New Appointment
            </Link>
            <Link 
              href="/" 
              className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium">Loading your appointments...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center text-sm">{error}</div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No appointments found</h3>
            <p className="text-slate-400 text-sm mb-6">You haven't booked any appointments yet.</p>
            <Link 
              href="/patient/book" 
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-teal-600/20"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Doctor</th>
                    <th className="py-4 px-6 font-semibold">Date</th>
                    <th className="py-4 px-6 font-semibold">Time Slot</th>
                    <th className="py-4 px-6 font-semibold">Reason</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">
                        {apt.doctorId?.name || 'Dr. Assigned'}
                        <span className="block text-xs text-slate-400 font-normal">{apt.doctorId?.specialization || 'General'}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {new Date(apt.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-slate-600">{apt.timeSlot}</td>
                      <td className="py-4 px-6 text-slate-600">{apt.reason || 'N/A'}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          apt.status === 'confirmed' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                            : apt.status === 'cancelled' 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}