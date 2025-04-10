import Doctor from '../models/doctorModel.js';
import { handleError } from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

// Weekday order for slot sorting
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get all approved & verified doctors with search, pagination, sorting, nextAvailable, and rating
export const getAllDoctors = asyncHandler(async (req, res) => {
  console.log("doctor controll")
  let { search = '', page = 1, limit = 10, sortBy = 'fullName', order = 'asc' } = req.query;

  // Validate page & limit
  page = Math.max(Number(page), 1);
  limit = Math.max(Number(limit), 1);

  const query = {
    fullName: { $regex: search, $options: 'i' },
    isApproved: true,
    isVerified: true,
    isProfileComplete: true,
  };

  const skip = (page - 1) * limit;
  const total = await Doctor.countDocuments(query);

  // Allow sorting by: fullName, experience
  const sortFields = ['fullName', 'experience'];
  const sortQuery = sortFields.includes(sortBy)
    ? { [sortBy]: order === 'desc' ? -1 : 1 }
    : { fullName: 1 }; // default sort

  const doctors = await Doctor.find(query)
    .select('-password')
    .sort(sortQuery)
    .limit(limit)
    .skip(skip);

  // Enhance each doctor with nextAvailable and average rating
  const updatedDoctors = doctors.map((doc) => {
    const doctorObj = doc.toObject();

    // Filter valid slots
    const validSlots = (doctorObj.availableSlots || [])
      .filter(slot => slot.startTime !== slot.endTime)
      .sort((a, b) => {
        const dayDiff = weekdays.indexOf(a.day) - weekdays.indexOf(b.day);
        return dayDiff !== 0 ? dayDiff : a.startTime.localeCompare(b.startTime);
      });

    // Assign nextAvailable slot
    const nextSlot = validSlots[0];
    doctorObj.nextAvailable = nextSlot
      ? `${nextSlot.day}, ${nextSlot.startTime}`
      : 'Not Available';

    // Calculate average rating
    if (doctorObj.ratings?.length > 0) {
      const totalRating = doctorObj.ratings.reduce((sum, r) => sum + r.rating, 0);
      doctorObj.rating = (totalRating / doctorObj.ratings.length).toFixed(1);
    } else {
      doctorObj.rating = 'N/A';
    }

    return doctorObj;
  });

  res.status(200).json({
    total,
    page,
    limit,
    doctors: updatedDoctors,
  });
});

// Get a single doctor by ID with rating and nextAvailable
export const getDoctorById = asyncHandler(async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');

    if (!doctor || !doctor.isApproved || !doctor.isVerified || !doctor.isProfileComplete) {
      return res.status(404).json({ message: 'Doctor not found or not verified/approved/complete' });
    }

    const doctorObj = doctor.toObject();

    // Process nextAvailable
    const validSlots = (doctorObj.availableSlots || [])
      .filter(slot => slot.startTime !== slot.endTime)
      .sort((a, b) => {
        const dayDiff = weekdays.indexOf(a.day) - weekdays.indexOf(b.day);
        return dayDiff !== 0 ? dayDiff : a.startTime.localeCompare(b.startTime);
      });

    const nextSlot = validSlots[0];
    doctorObj.nextAvailable = nextSlot
      ? `${nextSlot.day}, ${nextSlot.startTime}`
      : 'Not Available';

    // Average rating
    if (doctorObj.ratings?.length > 0) {
      const totalRating = doctorObj.ratings.reduce((sum, r) => sum + r.rating, 0);
      doctorObj.rating = (totalRating / doctorObj.ratings.length).toFixed(1);
    } else {
      doctorObj.rating = 'N/A';
    }

    res.status(200).json(doctorObj);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    handleError(res, error);
  }
});

// Get single doctor with rating & next slot
export const getSingleDoctorWithDetails = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if (!doctor || !doctor.isApproved || !doctor.isVerified) {
      return res.status(404).json({ message: 'Doctor not found or not verified/approved' });
    }

    const avgRating = doctor.ratings.length
      ? (doctor.ratings.reduce((acc, curr) => acc + curr.rating, 0) / doctor.ratings.length).toFixed(1)
      : 'N/A';

    const nextAvailable = computeNextAvailableSlot(doctor.availableSlots);

    res.status(200).json({
      ...doctor._doc,
      rating: avgRating,
      totalRatings: doctor.ratings.length,
      nextAvailable,
    });
  } catch (error) {
    console.error('❌ Error in getSingleDoctorWithDetails:', error);
    handleError(res, error);
  }
};

// Rate a doctor
export const rateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const { rating, comment } = req.body;
    if (!rating) return res.status(400).json({ message: 'Rating is required' });

    doctor.ratings.push({
      rating,
      comment,
      userId: req.patient._id,
      userName: req.patient.fullName,
    });

    await doctor.save();
    res.status(200).json({ message: 'Rating submitted successfully', updatedDoctor: doctor });
  } catch (error) {
    console.error('❌ Error in rateDoctor:', error);
    res.status(500).json({ message: 'Server error while rating doctor' });
  }
};


export const getDoctorProfile = async (req, res) => {
    try {
      const doctor = await User.findById(req.userId);
      if (!doctor || doctor.role !== 'doctor') return res.status(404).json({ message: 'Doctor not found' });
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
// Update Doctor Profile
export const updateDoctorProfile = async (req, res) => {
    const {
      fullName,
      phoneNumber,
      specialization,
      experience,
      qualifications,
      clinicDetails,
      documents,
    } = req.body;
  
    try {
      const doctor = await User.findById(req.userId);
      if (!doctor || doctor.role !== 'doctor') {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Update only the provided fields
      doctor.fullName = fullName || doctor.fullName;
      doctor.phoneNumber = phoneNumber || doctor.phoneNumber;
      doctor.specialization = specialization || doctor.specialization;
      doctor.experience = experience || doctor.experience;
      doctor.qualifications = qualifications || doctor.qualifications;
      doctor.clinicDetails = clinicDetails || doctor.clinicDetails;
      doctor.documents = documents || doctor.documents;
  
      const updatedDoctor = await doctor.save();
      res.json({ message: 'Doctor profile updated successfully', updatedDoctor });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };