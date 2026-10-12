import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const specialities = [
    'All',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
  ];

  useEffect(() => {
    authAPI
      .getDoctors()
      .then((res) => setDoctors(res.data.doctors || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpec = selectedSpeciality === 'All' || doc.specialization === selectedSpeciality;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.qualification && doc.qualification.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSpec && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-hospital-600 font-bold text-xs uppercase tracking-wider">Medical Faculty</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Find Specialist Doctors</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Consult internationally trained surgeons and physicians across our dedicated centres of clinical excellence.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            placeholder="Search by doctor name, specialty, degree..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-hospital-500 focus:ring-2 focus:ring-hospital-100 text-xs outline-none transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {specialities.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpeciality(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedSpeciality === spec
                  ? 'bg-hospital-600 text-white shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white rounded-3xl border border-slate-100 animate-pulse"></div>
          ))}
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-3">
          <i className="fa-solid fa-user-doctor text-4xl text-slate-300"></i>
          <h3 className="font-bold text-slate-800 text-sm">No doctors match your search</h3>
          <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-hospital-100 to-sky-200 text-hospital-800 flex items-center justify-center text-2xl font-bold shadow-inner flex-shrink-0">
                    {doc.name.replace('Dr. ', '').charAt(0)}
                  </div>
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-hospital-50 text-hospital-700 border border-hospital-100 mb-1">
                      {doc.specialization}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.qualification}</p>
                  </div>
                </div>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Clinical Experience</span>
                    <span className="font-semibold text-slate-800">{doc.experience}+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">OPD Consultation Fee</span>
                    <span className="font-bold text-hospital-700">₹{doc.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department Location</span>
                    <span className="font-medium text-slate-700">{doc.address || 'OPD Medical Wing'}</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/book?doctor=${encodeURIComponent(doc.name)}&speciality=${doc.specialization}`}
                className="w-full py-2.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-hospital-600/20 transition"
              >
                <i className="fa-solid fa-calendar-check"></i>
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
