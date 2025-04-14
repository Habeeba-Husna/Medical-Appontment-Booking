
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import Admin from '../models/adminModel.js';

const getUserById = async (id) => {
  return (
    (await Patient.findById(id).select('-password')) ||
    (await Doctor.findById(id).select('-password')) ||
    (await Admin.findById(id).select('-password'))
  );
};

export default getUserById;
