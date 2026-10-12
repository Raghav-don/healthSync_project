import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI, appointmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function BookAppointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSpeciality = queryParams.get('speciality') || 'Cardiology';
  const initialDoctor = queryParams.get('doctor') || '';

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [selectedSpeciality, setSelectedSpeciality] = useState(initialSpeciality);
  const [formData, setFormData] = useState({
    doctorId: '',
    doctorName: initialDoctor,
    specialization: initialSpeciality,
    date: '',
    time: '10:00 AM',
    reason: '',
    patientName: user?.name || '',
    patientEmail: user?.email || '',
    consultationFee: 750,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const specialities = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine',
  ];

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  useEffect(() => {
    authAPI
      .getDoctors()
      .then((res) => {
        const docs = res.data.doctors || [];
        setDoctors(docs);

        // Pre-select doctor if matching
        if (initialDoctor) {
          const match = docs.find((d) => d.name === initialDoctor);
          if (match) {
            setFormData((prev) => ({
              ...prev,
              doctorId: match._id,
              doctorName: match.name,
              specialization: match.specialization,
              consultationFee: match.consultationFee,
            }));
            setSelectedSpeciality(match.specialization);
          }
        } else {
          // Pre-select first doctor of chosen speciality
          const filtered = docs.filter((d) => d.specialization === initialSpeciality);
          if (filtered.length > 0) {
            setFormData((prev) => ({
              ...prev,
              doctorId: filtered[0]._id,
              doctorName: filtered[0].name,
              specialization: filtered[0].specialization,
              consultationFee: filtered[0].consultationFee,
            }));
          }
        }
      })
      .finally(() => setLoadingDoctors(false));
  }, [initialDoctor, initialSpeciality]);

  // Update selected doctor when user changes speciality
  const handleSpecialityChange = (spec) => {
    setSelectedSpeciality(spec);
    const filtered = doctors.filter((d) => d.specialization === spec);
    if (filtered.length > 0) {
      setFormData((prev) => ({
        ...prev,
        specialization: spec,
        doctorId: filtered[0]._id,
        doctorName: filtered[0].name,
        consultationFee: filtered[0].consultationFee,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        specialization: spec,
        doctorId: '',
        doctorName: '',
      }));
    }
  };

  const handleDoctorSelect = (doc) => {
    setFormData((prev) => ({
      ...prev,
      doctorId: doc._id,
      doctorName: doc.name,
      specialization: doc.specialization,
      consultationFee: doc.consultationFee,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=/book');
      return;
    }

    if (!formData.doctorName || !formData.date || !formData.time || !formData.reason) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      await appointmentAPI.book({
        ...formData,
        patientName: user.name,
        patientEmail: user.email,
      });

      setMessage({
        type: 'success',
        text: 'OPD Appointment booked successfully! SMS & Email confirmation sent.',
      });

      setTimeout(() => {
        navigate('/appointments');
      }, 1500);
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to book appointment. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDoctors = doctors.filter((d) => d.specialization === selectedSpeciality);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-hospital-600 font-bold text-xs uppercase tracking-wider">
          Outpatient Department (OPD)
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Book Hospital Appointment</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Choose clinical department, verified specialist, and preferred time slot with instant token generation.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <i
            className={`fa-solid ${
              message.type === 'success' ? 'fa-circle-check text-emerald-600 text-base' : 'fa-circle-exclamation text-rose-600 text-base'
            }`}
          ></i>
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Select Clinical Specialty */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-hospital-600 text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h2 className="text-base font-bold text-slate-900">Select Clinical Department</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {specialities.map((spec) => (
              <button
                type="button"
                key={spec}
                onClick={() => handleSpecialityChange(spec)}
                className={`p-3.5 rounded-2xl border text-center transition ${
                  selectedSpeciality === spec
                    ? 'border-hospital-600 bg-sky-50 text-hospital-800 font-bold shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                }`}
              >
                <div className="text-sm font-semibold">{spec}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Specialist Doctor */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-hospital-600 text-white flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h2 className="text-base font-bold text-slate-900">Select Specialist Doctor</h2>
          </div>

          {loadingDoctors ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-28 bg-slate-50 rounded-2xl animate-pulse"></div>
              <div className="h-28 bg-slate-50 rounded-2xl animate-pulse"></div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs">
              No doctors listed currently in {selectedSpeciality}. You may type your physician's name below.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredDoctors.map((doc) => {
                const isSelected = formData.doctorName === doc.name;
                return (
                  <div
                    key={doc._id}
                    onClick={() => handleDoctorSelect(doc)}
                    className={`p-4 rounded-2xl border cursor-pointer transition ${
                      isSelected
                        ? 'border-hospital-600 bg-sky-50/70 shadow-md ring-2 ring-hospital-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-hospital-100 text-hospital-800 flex items-center justify-center font-bold text-lg">
                        {doc.name.replace('Dr. ', '').charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-slate-900 text-xs">{doc.name}</h4>
                        <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                        <p className="text-[11px] font-semibold text-hospital-700">₹{doc.consultationFee} OPD Fee</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Step 3: Date, Time & Reason for Visit */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-hospital-600 text-white flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h2 className="text-base font-bold text-slate-900">Choose Consultation Date & Time</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-hospital-500 focus:ring-2 focus:ring-hospital-100 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                OPD Time Slot *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-hospital-500 focus:ring-2 focus:ring-hospital-100 text-sm outline-none bg-white transition"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Reason for Visit / Symptoms *
            </label>
            <textarea
              name="reason"
              rows={3}
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g. Follow-up consultation for chest discomfort and routine ECG checkup"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-hospital-500 focus:ring-2 focus:ring-hospital-100 text-sm outline-none transition"
            ></textarea>
          </div>
        </div>

        {/* Step 4: Summary & Confirm */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs text-sky-400 font-bold uppercase tracking-wider">Booking Review</p>
            <h3 className="text-lg font-bold text-white">
              {formData.doctorName || 'Select a doctor'} — {formData.specialization}
            </h3>
            <p className="text-xs text-slate-300">
              {formData.date ? `${formData.date} at ${formData.time}` : 'Select date and slot above'} | Total Fee: ₹{formData.consultationFee}
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting || !formData.doctorName || !formData.date}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-hospital-600 hover:from-sky-400 hover:to-hospital-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Confirming Token...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-check"></i>
                <span>Confirm OPD Appointment</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
