// controllers/ehrController.js
const EHR = require('../models/EHR');

exports.createEHR = async (req, res) => {
  try {
    const ehr = new EHR(req.body);
    await ehr.save();
    res.status(201).json(ehr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEHRByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await EHR.find({ patientId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEHR = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await EHR.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};