import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Hospital overview */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hospital-500 to-hospital-700 flex items-center justify-center text-white shadow-lg">
                <i className="fa-solid fa-heart-pulse text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">HealthSync</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-sm">
              A JCI-accredited multi-speciality tertiary care hospital delivering world-class clinical excellence, cutting-edge medical technology, and compassionate patient care.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#fb" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#tw" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#in" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#yt" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-hospital-600 hover:text-white flex items-center justify-center transition">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition">Find a Doctor</Link></li>
              <li><Link to="/book" className="hover:text-white transition">Book OPD Appointment</Link></li>
              <li><Link to="/ehr" className="hover:text-white transition">Patient Health Records</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">Patient Portal</Link></li>
            </ul>
          </div>

          {/* Clinical Departments */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Centres of Excellence</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-white transition cursor-pointer">Cardiology & Cardiac Surgery</li>
              <li className="hover:text-white transition cursor-pointer">Neurology & Neuro Surgery</li>
              <li className="hover:text-white transition cursor-pointer">Orthopaedics & Joint Replacement</li>
              <li className="hover:text-white transition cursor-pointer">Pediatrics & Neonatology</li>
              <li className="hover:text-white transition cursor-pointer">Dermatology & Cosmetology</li>
            </ul>
          </div>

          {/* Contact / Emergency */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">24/7 Emergency</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start gap-3">
                <i className="fa-solid fa-phone text-emerald-400 mt-1"></i>
                <span><strong>Emergency:</strong> 1800-425-4325</span>
              </p>
              <p className="flex items-start gap-3">
                <i className="fa-solid fa-envelope text-sky-400 mt-1"></i>
                <span>care@healthsync.com</span>
              </p>
              <p className="flex items-start gap-3 text-slate-400">
                <i className="fa-solid fa-location-dot text-rose-400 mt-1"></i>
                <span>HealthSync Towers, Medical Campus, Avinashi Road, Coimbatore, TN - 641014</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} HealthSync Multi-Speciality Hospital & Research Center. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Patient Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
