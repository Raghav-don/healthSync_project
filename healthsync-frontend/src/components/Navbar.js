import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Top emergency & hotline bar */}
      <div className="bg-gradient-to-r from-hospital-900 via-hospital-800 to-hospital-900 text-white text-xs py-2 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            24/7 Emergency Care: <strong className="text-white font-semibold">1800-425-4325</strong>
          </span>
          <span className="hidden md:inline text-hospital-200">
            <i className="fa-solid fa-location-dot mr-1 text-sky-400"></i> Main Medical Campus, Coimbatore, TN
          </span>
        </div>
        <div className="flex items-center gap-4 text-hospital-200">
          <span className="hidden sm:inline">
            <i className="fa-solid fa-clock mr-1 text-sky-400"></i> OPD: 08:00 AM – 08:00 PM
          </span>
          <span className="text-hospital-400">|</span>
          <a href="mailto:care@healthsync.com" className="hover:text-white transition">
            <i className="fa-solid fa-envelope mr-1 text-sky-400"></i> care@healthsync.com
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hospital-600 to-hospital-700 flex items-center justify-center text-white shadow-lg shadow-hospital-600/25 group-hover:scale-105 transition duration-200">
              <i className="fa-solid fa-heart-pulse text-2xl"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-hospital-900 via-hospital-700 to-hospital-800 bg-clip-text text-transparent">
                  HealthSync
                </span>
                <span className="bg-sky-100 text-hospital-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-200 uppercase tracking-wide">
                  Hospital
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Multi-Speciality Hospital & Research Center
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition ${
                isActive('/') ? 'text-hospital-600' : 'text-slate-600 hover:text-hospital-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/doctors"
              className={`text-sm font-semibold transition ${
                isActive('/doctors') ? 'text-hospital-600' : 'text-slate-600 hover:text-hospital-600'
              }`}
            >
              Find Doctors
            </Link>
            <Link
              to="/specialities"
              className={`text-sm font-semibold transition ${
                isActive('/specialities') ? 'text-hospital-600' : 'text-slate-600 hover:text-hospital-600'
              }`}
            >
              Specialities
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-semibold transition ${
                    isActive('/dashboard') ? 'text-hospital-600' : 'text-slate-600 hover:text-hospital-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/appointments"
                  className={`text-sm font-semibold transition ${
                    isActive('/appointments') ? 'text-hospital-600' : 'text-slate-600 hover:text-hospital-600'
                  }`}
                >
                  Appointments
                </Link>
                <Link
                  to="/ehr"
                  className={`text-sm font-semibold transition ${
                    isActive('/ehr') ? 'text-hospital-600' : 'text-slate-600 hover:text-hospital-600'
                  }`}
                >
                  Medical Records (EHR)
                </Link>
              </>
            )}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/book"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-hospital-600 hover:bg-hospital-700 text-white text-sm font-semibold shadow-md shadow-hospital-600/20 transition active:scale-95"
                >
                  <i className="fa-solid fa-calendar-plus"></i>
                  Book OPD
                </Link>

                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition">
                    <div className="w-8 h-8 rounded-full bg-hospital-100 text-hospital-700 flex items-center justify-center font-bold text-xs uppercase">
                      {user?.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                  </button>

                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 hidden group-hover:block transition z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-50 text-hospital-700 border border-sky-100">
                        {user?.role || 'Patient'}
                      </span>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <i className="fa-solid fa-gauge-high text-hospital-600"></i> Patient Dashboard
                    </Link>
                    <Link
                      to="/appointments"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <i className="fa-regular fa-calendar-check text-hospital-600"></i> My Appointments
                    </Link>
                    <Link
                      to="/ehr"
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <i className="fa-solid fa-notes-medical text-hospital-600"></i> Electronic Health Records
                    </Link>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-hospital-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition"
                >
                  Register
                </Link>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-hospital-600 hover:bg-hospital-700 text-white text-sm font-semibold shadow-md shadow-hospital-600/20 transition active:scale-95"
                >
                  <i className="fa-solid fa-calendar-plus"></i>
                  <span>Book Appointment</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
