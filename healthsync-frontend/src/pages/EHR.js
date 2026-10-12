import React, { useState, useEffect } from 'react';
import { ehrAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function EHR() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ehrAPI
      .getMy()
      .then((res) => setRecords(res.data.records || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-hospital-600 font-bold text-xs uppercase tracking-wider">Clinical Informatics</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Electronic Health Records (EHR)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Digital diagnostic records, recorded clinical vitals, verified prescriptions and laboratory panels.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition flex items-center gap-2"
          >
            <i className="fa-solid fa-print"></i>
            Print Dossier
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-white rounded-3xl border border-slate-100 animate-pulse"></div>
          ))}
        </div>
      ) : records.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-50 text-slate-400 flex items-center justify-center text-2xl">
            <i className="fa-solid fa-notes-medical"></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">No Medical Records on File</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your diagnostic records and prescriptions will appear here once finalized by your attending physician.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {records.map((rec) => (
            <div
              key={rec._id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6"
            >
              {/* Record Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-hospital-50 text-hospital-700 flex items-center justify-center text-xl font-bold">
                    <i className="fa-solid fa-file-waveform"></i>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Encounter Date: {new Date(rec.date).toLocaleDateString()}
                    </span>
                    <h2 className="text-base font-bold text-slate-900">{rec.diagnosis}</h2>
                    <p className="text-xs text-hospital-700 font-semibold">Attending: {rec.doctorName || 'Senior Consultant'}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-400">Record ID</span>
                  <p className="text-xs font-mono font-bold text-slate-700">#EHR-{rec._id.slice(-8).toUpperCase()}</p>
                </div>
              </div>

              {/* Vitals Grid */}
              {rec.vitals && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-heart-pulse text-rose-500"></i> Recorded Clinical Vitals
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Blood Pressure</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{rec.vitals.bloodPressure || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Heart Rate</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{rec.vitals.heartRate ? `${rec.vitals.heartRate} bpm` : 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">SpO2 Level</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{rec.vitals.oxygenSaturation ? `${rec.vitals.oxygenSaturation}%` : 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Body Temp</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{rec.vitals.temperature ? `${rec.vitals.temperature}°F` : 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Weight</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{rec.vitals.weight ? `${rec.vitals.weight} kg` : 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">Height</span>
                      <p className="text-sm font-bold text-slate-900 mt-0.5">{rec.vitals.height ? `${rec.vitals.height} cm` : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Prescriptions Table */}
              {rec.prescriptions && rec.prescriptions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <i className="fa-solid fa-pills text-hospital-600"></i> Prescribed Medications
                  </h3>
                  <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4 font-semibold">Medicine</th>
                          <th className="py-2.5 px-4 font-semibold">Dosage</th>
                          <th className="py-2.5 px-4 font-semibold">Duration</th>
                          <th className="py-2.5 px-4 font-semibold">Instructions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rec.prescriptions.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4 font-bold text-slate-900">{typeof p === 'string' ? p : p.medicine}</td>
                            <td className="py-3 px-4 text-slate-700">{p.dosage || 'As directed'}</td>
                            <td className="py-3 px-4 text-slate-700">{p.duration || 'N/A'}</td>
                            <td className="py-3 px-4 text-slate-600">{p.instructions || 'With water'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Lab Reports & Allergies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rec.allergies && rec.allergies.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-2">
                      <i className="fa-solid fa-triangle-exclamation text-amber-600"></i> Documented Drug Allergies
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {rec.allergies.map((a, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {rec.labReports && rec.labReports.length > 0 && (
                  <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/60 space-y-2">
                    <h4 className="text-xs font-bold text-hospital-900 uppercase tracking-wide flex items-center gap-2">
                      <i className="fa-solid fa-flask text-hospital-600"></i> Diagnostic Lab Results
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      {rec.labReports.map((lab, idx) => (
                        <div key={idx} className="flex justify-between py-1 border-b border-sky-100 last:border-0">
                          <span className="font-semibold text-slate-800">{lab.testName}:</span>
                          <span className="text-hospital-700">{lab.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Physician Advice & Notes */}
              {rec.notes && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wide">Physician Clinical Notes:</span>
                  <p className="text-slate-600 italic">{rec.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
