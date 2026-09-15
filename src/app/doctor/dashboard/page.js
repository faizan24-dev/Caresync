'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DoctorDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/doctor/appointments');
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
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      const res = await fetch('/api/doctor/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId, status }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh list
        fetchAppointments();
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/doctor/logout');
      router.push('/doctor/login');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Professional Logout Button */}
        <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Doctor Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your patient appointments and schedules securely.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium">Loading appointments...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center text-sm">{error}</div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No appointments assigned</h3>
            <p className="text-slate-400 text-sm">You currently have no patient bookings.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-4 px-6 font-semibold">Patient Name</th>
                    <th className="py-4 px-6 font-semibold">Email</th>
                    <th className="py-4 px-6 font-semibold">Date</th>
                    <th className="py-4 px-6 font-semibold">Time Slot</th>
                    <th className="py-4 px-6 font-semibold">Reason</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">
                        {apt.patientId?.name || 'Unknown Patient'}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {apt.patientId?.email || 'N/A'}
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
                      <td className="py-4 px-6 text-right space-x-2">
                        {apt.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(apt._id, 'confirmed')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-xs font-medium transition-all border border-red-200"
                          >
                            Cancel
                          </button>
                        )}
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