'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState({ doctors: [], patients: [], appointments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('appointments');

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const res = await fetch('/api/admin/dashboard');
        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to load admin data');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Control Center</h1>
            <p className="text-slate-500 text-sm mt-1">Full system overview of doctors, patients, and appointments.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">
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

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Appointments ({data.appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'doctors'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Registered Doctors ({data.doctors.length})
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Registered Patients ({data.patients.length})
          </button>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 font-medium">Loading system data...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center text-sm">{error}</div>
        ) : (
          <>
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">Patient</th>
                        <th className="py-4 px-6 font-semibold">Doctor</th>
                        <th className="py-4 px-6 font-semibold">Date</th>
                        <th className="py-4 px-6 font-semibold">Time Slot</th>
                        <th className="py-4 px-6 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {data.appointments.map((apt) => (
                        <tr key={apt._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-slate-900">
                            {apt.patientId?.name || 'Unknown'}
                            <span className="block text-xs text-slate-400 font-normal">{apt.patientId?.email}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-700">
                            {apt.doctorId?.name || 'Assigned Doctor'}
                            <span className="block text-xs text-slate-400 font-normal">{apt.doctorId?.specialization}</span>
                          </td>
                          <td className="py-4 px-6 text-slate-600">{new Date(apt.date).toLocaleDateString()}</td>
                          <td className="py-4 px-6 text-slate-600">{apt.timeSlot}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                              apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                              apt.status === 'cancelled' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
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

            {/* Doctors Tab */}
            {activeTab === 'doctors' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">Doctor Name</th>
                        <th className="py-4 px-6 font-semibold">Specialization</th>
                        <th className="py-4 px-6 font-semibold">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {data.doctors.map((doc) => (
                        <tr key={doc._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-slate-900">{doc.name}</td>
                          <td className="py-4 px-6 text-slate-600">{doc.specialization}</td>
                          <td className="py-4 px-6 text-slate-600">{doc.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Patients Tab */}
            {activeTab === 'patients' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">Patient Name</th>
                        <th className="py-4 px-6 font-semibold">Email</th>
                        <th className="py-4 px-6 font-semibold">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {data.patients.map((pat) => (
                        <tr key={pat._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-slate-900">{pat.name}</td>
                          <td className="py-4 px-6 text-slate-600">{pat.email}</td>
                          <td className="py-4 px-6 text-slate-600">{new Date(pat.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}