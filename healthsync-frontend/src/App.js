import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';
import EHRRecords from './pages/EHRRecords';

function App() {
  return (
    <div>
      <h1>HealthSync App</h1>
      <Register />
      <Login />
      <BookAppointment />
      <EHRRecords />
    </div>
  );
}

export default App;