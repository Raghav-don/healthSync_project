import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [appointmentData, setAppointmentData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value
    });
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', appointmentData); // Debug line

    try {
      const response = await axios.post(
        'http://localhost:7002/api/appointments',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Appointment booked:', response.data);
      setMessage('Appointment booked successfully!');
      // Clear the form
      setAppointmentData({
        doctor: '',
        date: '',
        time: '',
        reason: ''
      });
    } catch (err) {
      console.error('Error booking appointment:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleAppointmentSubmit}>
        <input
          type="text"
          name="doctor"
          placeholder="Doctor's Name"
          value={appointmentData.doctor}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="date"
          name="date"
          value={appointmentData.date}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input
          type="time"
          name="time"
          value={appointmentData.time}
          onChange={handleChange}
          required
        />
        <br /><br />
        <textarea
          name="reason"
          placeholder="Reason for Appointment"
          value={appointmentData.reason}
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Book Appointment</button>
      </form>

      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}
    </div>
  );
}