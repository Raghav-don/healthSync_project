// seed.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('./healthsync-backend/user-service/models/User');
const Appointment = require('./healthsync-backend/appointment-service/models/Appointment');
const EHR = require('./healthsync-backend/ehr-service/models/EHR');

async function seed() {
  try {
    console.log('Connecting to user DB...');
    const userConn = await mongoose.createConnection('mongodb://localhost:27017/healthsync_users').asPromise();
    const UserModel = userConn.model('User', User.schema);

    console.log('Connecting to appointment DB...');
    const apptConn = await mongoose.createConnection('mongodb://localhost:27017/healthsync_appointments').asPromise();
    const ApptModel = apptConn.model('Appointment', Appointment.schema);

    console.log('Connecting to EHR DB...');
    const ehrConn = await mongoose.createConnection('mongodb://localhost:27017/healthsync_ehr').asPromise();
    const EhrModel = ehrConn.model('EHR', EHR.schema);

    const rawData = fs.readFileSync(path.join(__dirname, 'seed_data.json'), 'utf-8');
    const users = JSON.parse(rawData);

    console.log('Seeding Users / Doctors...');
    const createdUsers = [];
    for (const u of users) {
      let existing = await UserModel.findOne({ email: u.email });
      if (!existing) {
        existing = new UserModel(u);
        await existing.save();
        console.log(`+ Created: ${u.name} (${u.role})`);
      } else {
        console.log(`- Exists: ${u.name}`);
      }
      createdUsers.push(existing);
    }

    const patient = createdUsers.find(u => u.role === 'patient');
    const cardioDoctor = createdUsers.find(u => u.specialization === 'Cardiology');
    const neuroDoctor = createdUsers.find(u => u.specialization === 'Neurology');

    if (patient && cardioDoctor) {
      const existingAppt = await ApptModel.findOne({ patientId: patient._id });
      if (!existingAppt) {
        const appt1 = new ApptModel({
          patientId: patient._id,
          patientName: patient.name,
          patientEmail: patient.email,
          doctorId: cardioDoctor._id,
          doctorName: cardioDoctor.name,
          specialization: cardioDoctor.specialization,
          date: '2026-10-20',
          time: '10:30 AM',
          reason: 'Routine annual cardiology checkup & ECG review',
          status: 'confirmed',
          consultationFee: cardioDoctor.consultationFee
        });
        await appt1.save();

        const appt2 = new ApptModel({
          patientId: patient._id,
          patientName: patient.name,
          patientEmail: patient.email,
          doctorId: neuroDoctor._id,
          doctorName: neuroDoctor.name,
          specialization: neuroDoctor.specialization,
          date: '2026-10-25',
          time: '02:00 PM',
          reason: 'Occasional migraine follow-up consultation',
          status: 'pending',
          consultationFee: neuroDoctor.consultationFee
        });
        await appt2.save();
        console.log('+ Seeded Demo Appointments');
      }
    }

    if (patient && cardioDoctor) {
      const existingEhr = await EhrModel.findOne({ patientId: patient._id });
      if (!existingEhr) {
        const ehrRecord = new EhrModel({
          patientId: patient._id,
          doctorId: cardioDoctor._id,
          doctorName: cardioDoctor.name,
          diagnosis: 'Mild Essential Hypertension - Controlled',
          prescriptions: [
            {
              medicine: 'Amlodipine Besylate',
              dosage: '5mg once daily',
              duration: '90 days',
              instructions: 'Take in the morning with a glass of water'
            },
            {
              medicine: 'Omega-3 Fish Oil',
              dosage: '1000mg',
              duration: '30 days',
              instructions: 'Post dinner'
            }
          ],
          allergies: ['Penicillin', 'Sulfa drugs'],
          vitals: {
            temperature: 98.6,
            bloodPressure: '122/78 mmHg',
            heartRate: 72,
            weight: 74,
            height: 178,
            oxygenSaturation: 99
          },
          labReports: [
            {
              testName: 'Lipid Profile Panel',
              result: 'Total Cholesterol 185 mg/dL (Normal)',
              date: new Date('2026-09-15')
            },
            {
              testName: 'Echocardiogram',
              result: 'Normal LV function, EF 62%',
              date: new Date('2026-09-15')
            }
          ],
          notes: 'Patient shows excellent compliance to lifestyle modifications. Continue daily 30m aerobic exercise.'
        });
        await ehrRecord.save();
        console.log('+ Seeded Demo EHR Record');
      }
    }

    console.log('✅ Seeding process completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
