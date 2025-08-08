import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [ehr, setEhr] = useState([]);
  const [form, setForm] = useState({ date: '', doctor: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const appointmentsRes = await axios.get('http://localhost:7002/api/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(appointmentsRes.data);

        const ehrRes = await axios.get('http://localhost:7004/api/ehr', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEhr(ehrRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7002/api/appointments', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Appointment booked!');
      window.location.reload(); // refresh dashboard to show new data
    } catch (err) {
      alert('Failed to book appointment');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <section>
        <h3>Book Appointment</h3>
        <form onSubmit={handleAppointmentSubmit}>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="text" name="doctor" placeholder="Doctor's Name" value={form.doctor} onChange={handleChange} required />
          <button type="submit">Book</button>
        </form>
      </section>

      <section>
        <h3>Your Appointments</h3>
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>{appt.date} - {appt.doctor}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Your Health Records (EHR)</h3>
        <ul>
          {ehr.map((record) => (
            <li key={record._id}>{record.description} ({record.date})</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;