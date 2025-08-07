import React, { useState } from 'react';
import { getEHRRecords } from '../controllers/ehrController';

export default function EHRRecords() {
  const [patientId, setPatientId] = useState('');
  const [records, setRecords] = useState(null);

  const handleSearch = async () => {
    const data = await getEHRRecords(patientId);
    setRecords(data);
  };

  return (
    <div>
      <h2>Electronic Health Records</h2>
      <input
        type="text"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        placeholder="Enter Patient ID"
      />
      <button onClick={handleSearch}>Get Records</button>
      {records && (
        <pre>{JSON.stringify(records, null, 2)}</pre>
      )}
    </div>
  );
}