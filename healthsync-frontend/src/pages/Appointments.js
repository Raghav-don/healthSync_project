import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { appointmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchAppointments = () => {
    setLoading(true);
    appointmentAPI
      .getMy()
      .then((res) => setAppointments(res.data.appointments || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment token?')) return;
    try {
      await appointmentAPI.cancel(id);
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    if (filter === 'all') return true;
    return a.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-hospital-600 font-bold text-xs uppercase tracking-wider">Patient Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">My OPD Appointments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track token confirmation, view appointment slips, or reschedule your doctor visits.
          </p>
        </div>

        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-xs shadow-md shadow-hospital-600/20 transition active:scale-95 self-start sm:self-auto"
        >
          <i className="fa-solid fa-plus"></i>
          Book New Consultation
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
              filter === tab
                ? 'bg-hospital-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 animate-pulse"></div>
          ))}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-2xl">
            <i className="fa-regular fa-calendar-xmark"></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">No {filter !== 'all' ? filter : ''} appointments found</h3>
            <p className="text-xs text-slate-500 mt-1">You have no booked appointments matching this criteria.</p>
          </div>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-hospital-600 text-white text-xs font-bold"
          >
            Schedule Consultation Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-hospital-50 text-hospital-700 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  <i className="fa-solid fa-stethoscope"></i>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{appt.doctorName}</h3>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        appt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : appt.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : appt.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-hospital-700">{appt.specialization}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>
                      <i className="fa-regular fa-calendar text-slate-400 mr-1.5"></i>
                      <strong>Date:</strong> {appt.date}
                    </span>
                    <span>
                      <i className="fa-regular fa-clock text-slate-400 mr-1.5"></i>
                      <strong>Time:</strong> {appt.time}
                    </span>
                    <span>
                      <i className="fa-solid fa-receipt text-slate-400 mr-1.5"></i>
                      <strong>Fee:</strong> ₹{appt.consultationFee}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <strong>Reason for Consultation:</strong> {appt.reason}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Token ID</span>
                  <p className="text-xs font-bold text-slate-800 font-mono">#{appt._id.slice(-8).toUpperCase()}</p>
                </div>

                {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                  <button
                    onClick={() => handleCancel(appt._id)}
                    className="px-3.5 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition"
                  >
                    Cancel Token
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
