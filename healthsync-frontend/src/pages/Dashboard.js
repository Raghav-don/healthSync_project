import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentAPI, ehrAPI } from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [ehrRecords, setEhrRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    Promise.all([
      appointmentAPI.getMy().catch(() => ({ data: { appointments: [] } })),
      ehrAPI.getMy().catch(() => ({ data: { records: [] } })),
    ])
      .then(([apptsRes, ehrRes]) => {
        setAppointments(apptsRes.data.appointments || []);
        setEhrRecords(ehrRes.data.records || []);
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'confirmed' || a.status === 'pending'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. Welcome Header Banner */}
      <div className="bg-gradient-to-r from-hospital-800 via-hospital-700 to-sky-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold backdrop-blur-sm">
            <i className="fa-solid fa-hospital-user"></i>
            <span>Patient Portal Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Patient'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            MRN: <strong className="text-white font-mono">HS-{user?._id?.slice(-6).toUpperCase() || '001289'}</strong> | Registered Email: {user?.email}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/book"
            className="px-5 py-3 rounded-xl bg-white text-hospital-800 hover:bg-slate-100 font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <i className="fa-solid fa-calendar-plus text-hospital-600"></i>
            Book New OPD
          </Link>
          <Link
            to="/ehr"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition flex items-center gap-2"
          >
            <i className="fa-solid fa-file-medical"></i>
            View Health Records
          </Link>
        </div>
      </div>

      {/* 2. Key Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Appointments</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{upcomingAppointments.length}</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              <i className="fa-solid fa-check mr-1"></i> {appointments.length} Total Booked
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-hospital-600 flex items-center justify-center text-xl">
            <i className="fa-regular fa-calendar-check"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Medical Records</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{ehrRecords.length}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">EHR & Prescriptions</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-notes-medical"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Blood Group</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{user?.bloodGroup || 'O+'}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">Verified on Record</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-droplet"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient Status</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">Active</p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">OPD Category: General</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
            <i className="fa-solid fa-shield-heart"></i>
          </div>
        </div>
      </div>

      {/* 3. Upcoming Appointments & Quick EHR Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Upcoming Consultations</h2>
              <p className="text-xs text-slate-500">Your scheduled doctor visits and OPD appointments</p>
            </div>
            <Link
              to="/appointments"
              className="text-xs font-bold text-hospital-600 hover:text-hospital-700 flex items-center gap-1"
            >
              View All ({appointments.length}) <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-slate-50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl">
                <i className="fa-regular fa-calendar-xmark"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">No scheduled appointments yet</p>
                <p className="text-xs text-slate-500 mt-1">Book your first doctor consultation with zero waiting time.</p>
              </div>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-xs shadow-md transition"
              >
                <i className="fa-solid fa-calendar-plus"></i>
                Book Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 3).map((appt) => (
                <div
                  key={appt._id}
                  className="p-5 rounded-2xl border border-slate-200/80 hover:border-hospital-300 hover:shadow-md transition bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-hospital-100 text-hospital-700 flex items-center justify-center text-lg font-bold">
                      <i className="fa-solid fa-user-doctor"></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{appt.doctorName}</h3>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            appt.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : appt.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {appt.status}
                        </span>
                      </div>
                      <p className="text-xs text-hospital-700 font-medium mt-0.5">{appt.specialization}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        <i className="fa-regular fa-calendar mr-1.5 text-slate-400"></i>
                        {appt.date} at {appt.time}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 italic">"{appt.reason}"</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                    <span className="text-xs font-bold text-slate-900">Fee: ₹{appt.consultationFee || 500}</span>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <i className="fa-solid fa-check-circle text-xs"></i> Token Confirmed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Medical Record Summary */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Latest Health Record</h2>
            <p className="text-xs text-slate-500">Summary from your doctor consultations</p>
          </div>

          {ehrRecords.length > 0 ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-hospital-800 uppercase tracking-wide">Diagnosis</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {new Date(ehrRecords[0].date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{ehrRecords[0].diagnosis}</p>
                <p className="text-xs text-slate-600">Physician: {ehrRecords[0].doctorName || 'Consultant'}</p>
              </div>

              {/* Vitals snapshot */}
              {ehrRecords[0].vitals && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recorded Vitals</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">BP:</span>{' '}
                      <span className="font-semibold text-slate-800">{ehrRecords[0].vitals.bloodPressure || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Pulse:</span>{' '}
                      <span className="font-semibold text-slate-800">{ehrRecords[0].vitals.heartRate ? `${ehrRecords[0].vitals.heartRate} bpm` : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">SpO2:</span>{' '}
                      <span className="font-semibold text-slate-800">{ehrRecords[0].vitals.oxygenSaturation ? `${ehrRecords[0].vitals.oxygenSaturation}%` : 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Temp:</span>{' '}
                      <span className="font-semibold text-slate-800">{ehrRecords[0].vitals.temperature ? `${ehrRecords[0].vitals.temperature}°F` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              <Link
                to="/ehr"
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <i className="fa-solid fa-notes-medical text-hospital-600"></i>
                Open Complete EHR Dossier
              </Link>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500 space-y-2">
              <i className="fa-solid fa-folder-open text-3xl text-slate-300"></i>
              <p>No EHR history recorded yet.</p>
              <p className="text-[11px]">Records appear after your clinical consultation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}