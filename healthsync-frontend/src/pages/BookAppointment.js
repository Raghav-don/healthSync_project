import React, { useState } from 'react';
import { bookAppointment } from '../controllers/appointmentController';

export default function BookAppointment() {
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await bookAppointment(form);
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <input name="patientName" placeholder="Patient Name" onChange={handleChange} required />
      <input name="doctorName" placeholder="Doctor Name" onChange={handleChange} required />
      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <button type="submit">Book</button>
    </form>
  );
}