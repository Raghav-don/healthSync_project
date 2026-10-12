// ehr-service/controllers/ehrController.js
const EHR = require('../models/EHR');

// Create an EHR record (doctor/admin)
exports.createEHR = async (req, res) => {
  try {
    const { patientId, diagnosis, prescriptions, allergies, vitals, notes } = req.body;
    if (!patientId || !diagnosis) {
      return res.status(400).json({ message: 'Patient ID and diagnosis are required.' });
    }
    const ehr = new EHR({
      patientId,
      doctorId: req.user.userId,
      diagnosis,
      prescriptions: prescriptions || [],
      allergies: allergies || [],
      vitals: vitals || {},
      notes: notes || '',
    });
    await ehr.save();
    res.status(201).json({ message: 'EHR record created successfully.', ehr });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create EHR.', error: err.message });
  }
};

// Get patient's own EHR records
exports.getMyEHR = async (req, res) => {
  try {
    const records = await EHR.find({ patientId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ records });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch EHR records.', error: err.message });
  }
};

// Get all EHR records for a specific patient (doctor/admin)
exports.getEHRByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await EHR.find({ patientId }).sort({ createdAt: -1 });
    res.json({ records });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch EHR records.', error: err.message });
  }
};

// Update an EHR record
exports.updateEHR = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await EHR.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'EHR record not found.' });
    res.json({ message: 'EHR record updated.', ehr: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update EHR.', error: err.message });
  }
};

// Delete an EHR record (admin)
exports.deleteEHR = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete EHR records.' });
    }
    const deleted = await EHR.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'EHR record not found.' });
    res.json({ message: 'EHR record deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete EHR.', error: err.message });
  }
};