import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authAPI
      .getDoctors()
      .then((res) => setDoctors(res.data.doctors || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const specialities = [
    { name: 'Cardiology', icon: 'fa-solid fa-heart-pulse', desc: 'Heart care, angioplasty, pacemaker & bypass surgery', color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { name: 'Neurology', icon: 'fa-solid fa-brain', desc: 'Stroke unit, spine surgery, epilepsy & neuro-rehab', color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { name: 'Orthopedics', icon: 'fa-solid fa-bone', desc: 'Robotic joint replacement, sports injury & arthroscopy', color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { name: 'Pediatrics', icon: 'fa-solid fa-baby', desc: 'NICU, child health, vaccinations & pediatric surgery', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { name: 'Dermatology', icon: 'fa-solid fa-hand-dots', desc: 'Laser skin treatments, cosmetic surgery & derma therapy', color: 'bg-sky-50 text-sky-600 border-sky-100' },
    { name: 'Oncology', icon: 'fa-solid fa-ribbon', desc: 'Precision radiation, surgical oncology & chemotherapy', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-hospital-900 via-hospital-800 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-hospital-700/50 border border-hospital-500/30 text-sky-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              JCI & NABH Accredited Tertiary Healthcare
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              World-Class Care, <br />
              <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Right When You Need It.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Experience clinical excellence at HealthSync Multi-Speciality Hospital. Book verified specialist consultations online, view diagnostic EHR records in real-time, and get round-the-clock emergency support.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/book"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-hospital-600 hover:from-sky-400 hover:to-hospital-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition active:scale-95 flex items-center gap-2"
              >
                <i className="fa-solid fa-calendar-check"></i>
                Book OPD Appointment
              </Link>
              <Link
                to="/doctors"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 backdrop-blur-sm transition flex items-center gap-2"
              >
                <i className="fa-solid fa-user-doctor"></i>
                Browse Specialist Doctors
              </Link>
            </div>

            {/* Quick stats banner */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">50+</p>
                <p className="text-xs text-slate-400 font-medium">Senior Consultants</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-sky-400">99.4%</p>
                <p className="text-xs text-slate-400 font-medium">Patient Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">24/7</p>
                <p className="text-xs text-slate-400 font-medium">Emergency Care</p>
              </div>
            </div>
          </div>

          {/* Hero right card: Instant OPD Booking Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Instant Appointment Booking</h3>
                  <p className="text-xs text-slate-500">Zero waiting time at the OPD counter</p>
                </div>
                <span className="w-10 h-10 rounded-xl bg-hospital-50 text-hospital-600 flex items-center justify-center font-bold">
                  <i className="fa-solid fa-stethoscope"></i>
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Select Speciality
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'].map((spec) => (
                      <Link
                        key={spec}
                        to={`/book?speciality=${spec}`}
                        className="p-3 text-left border border-slate-200 rounded-xl hover:border-hospital-500 hover:bg-sky-50/50 transition group flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold text-slate-700 group-hover:text-hospital-700">{spec}</span>
                        <i className="fa-solid fa-arrow-right text-[10px] text-slate-400 group-hover:text-hospital-600"></i>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Real-time Doctor Slot Availability</span>
                  </div>
                  <p className="text-slate-600">Instant SMS & Email confirmation with digital OPD appointment slip.</p>
                </div>

                <Link
                  to="/book"
                  className="w-full py-3.5 rounded-xl bg-hospital-600 hover:bg-hospital-700 text-white font-bold text-sm shadow-md shadow-hospital-600/25 flex items-center justify-center gap-2 transition"
                >
                  <span>Proceed to Select Doctor & Date</span>
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars / Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: 'fa-solid fa-user-doctor', title: 'Top Specialists', desc: 'Board certified clinicians with global surgical fellowship credentials.' },
            { icon: 'fa-solid fa-laptop-medical', title: 'Digital EHR Records', desc: 'Secure, paperless health records accessible 24/7 on your portal.' },
            { icon: 'fa-solid fa-microscope', title: 'Advanced Diagnostics', desc: 'Latest 3-Tesla MRI, CT Angiography and automated pathology labs.' },
            { icon: 'fa-solid fa-truck-medical', title: 'Critical Care / ICU', desc: 'Level-1 Trauma and dedicated Coronary Care with round-the-clock intensivists.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-hospital-50 text-hospital-600 flex items-center justify-center text-xl mb-4">
                <i className={item.icon}></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Clinical Specialities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-hospital-600 font-bold text-xs uppercase tracking-wider">Clinical Departments</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Centres of Clinical Excellence</h2>
          <p className="text-slate-600 text-sm mt-3">Comprehensive multi-disciplinary care powered by modern surgical infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((spec) => (
            <div key={spec.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl mb-4 ${spec.color}`}>
                  <i className={spec.icon}></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{spec.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">{spec.desc}</p>
              </div>

              <Link
                to={`/book?speciality=${spec.name}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-hospital-600 hover:text-hospital-700 transition"
              >
                <span>Book {spec.name} Consultation</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Doctors */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-hospital-600 font-bold text-xs uppercase tracking-wider">Our Medical Faculty</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Consult Top Specialists</h2>
              <p className="text-slate-600 text-sm mt-2">Meet our team of leading consultants and surgeons.</p>
            </div>
            <Link
              to="/doctors"
              className="mt-4 md:mt-0 text-xs font-bold text-hospital-600 hover:text-hospital-700 flex items-center gap-1"
            >
              View All Doctors <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.slice(0, 3).map((doc) => (
                <div key={doc._id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-hospital-100 to-sky-200 text-hospital-800 flex items-center justify-center text-2xl font-bold shadow-inner">
                      {doc.name.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-hospital-50 text-hospital-700 border border-hospital-100 mb-1">
                        {doc.specialization}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
                      <p className="text-xs text-slate-500">{doc.qualification}</p>
                    </div>
                  </div>

                  <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience</span>
                      <span className="font-semibold text-slate-800">{doc.experience}+ Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Consultation Fee</span>
                      <span className="font-semibold text-hospital-700">₹{doc.consultationFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department Location</span>
                      <span className="font-medium text-slate-700">{doc.address || 'OPD Block'}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-2">
                    <Link
                      to={`/book?doctor=${encodeURIComponent(doc.name)}&speciality=${doc.specialization}`}
                      className="w-full py-2.5 rounded-xl bg-hospital-50 hover:bg-hospital-600 text-hospital-700 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <i className="fa-solid fa-calendar-plus"></i>
                      Book Appointment
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Patient Portal CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-hospital-700 via-hospital-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative max-w-2xl space-y-4">
            <span className="text-sky-300 font-bold text-xs uppercase tracking-wider">Patient Self-Service</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Manage Your Health Records, Prescriptions & Visits in One Place
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Login to the HealthSync Patient Portal to download electronic prescriptions, track test results, and manage your family's appointment schedule.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl bg-white text-hospital-900 font-bold text-xs shadow-lg hover:bg-slate-100 transition"
              >
                Create Free Patient Account
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition"
              >
                Sign In to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}