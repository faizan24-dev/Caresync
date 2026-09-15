"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookAppointment() {
  const router = useRouter(); // Initialize the router here

  // Mock data for the UI - we will fetch real doctors from the DB later
  const mockDoctors = [
    { _id: '64b1f1c2e4b0a1a2b3c4d5e1', name: 'Dr. Sarah Jenkins', specialization: 'Cardiologist' },
    { _id: '64b1f1c2e4b0a1a2b3c4d5e2', name: 'Dr. Michael Chen', specialization: 'Dermatologist' },
    { _id: '64b1f1c2e4b0a1a2b3c4d5e3', name: 'Dr. Emily Carter', specialization: 'General Practice' },
  ];

  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    timeSlot: '',
    reason: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/patient/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      alert('Appointment booked successfully!');
      
      // Redirect the user to the home page instantly
      window.location.href = '/';

      
      // Clear the form after a successful booking (optional now that we redirect)
      setFormData({
        doctorId: '',
        date: '',
        timeSlot: '',
        reason: ''
      });

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Simple Navigation Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Care<span className="text-teal-600">Sync</span>
            </span>
          </Link>
          <span className="text-sm font-medium text-slate-500">Book an Appointment</span>
        </div>
      </header>

      {/* Booking Form Container */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Schedule Your Visit</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Doctor</label>
              <select 
                name="doctorId" 
                required 
                value={formData.doctorId} 
                onChange={handleChange} 
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white"
              >
                <option value="" disabled>Choose a specialist...</option>
                {mockDoctors.map(doc => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} - {doc.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input 
                  type="date" 
                  name="date" 
                  required 
                  value={formData.date} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Time Slot</label>
                <select 
                  name="timeSlot" 
                  required 
                  value={formData.timeSlot} 
                  onChange={handleChange} 
                  className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white"
                >
                  <option value="" disabled>Select a time...</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                </select>
              </div>
            </div>

            {/* Reason for Visit */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Visit (Optional)</label>
              <textarea 
                name="reason" 
                rows="3" 
                value={formData.reason} 
                onChange={handleChange} 
                placeholder="Briefly describe your symptoms or reason for appointment..."
                className="block w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:bg-teal-400"
              >
                {loading ? 'Confirming...' : 'Confirm Appointment'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}