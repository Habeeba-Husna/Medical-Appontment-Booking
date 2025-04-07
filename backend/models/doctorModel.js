// import mongoose from 'mongoose';

// const doctorSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phoneNumber: { type: String, required: true },
//     password: { type: String, required: true },
//     specialization: { type: String, required: true },
//     experience: { type: Number, required: true },
//     qualifications: { type: String, required: true },
//     clinicDetails: { type: String, required: true },
//     documents: { type: [String], required: true },
//     isVerified: { type: Boolean, default: false },
//     isApproved: { type: Boolean, default: false }
//   }, 
//    { timestamps: true });
  
//   const Doctor = mongoose.model('Doctor', doctorSchema);

//   export default Doctor;


// import mongoose from 'mongoose';

// const clinicDetailsSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   location: { type: String, required: true },
// }, { _id: false });

// const availableSlotSchema = new mongoose.Schema({
//   date: { type: String, required: true }, // Format: YYYY-MM-DD
//   times: [{ type: String, required: true }], // Format: HH:mm
// }, { _id: false });

// const doctorSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true },
//   password: { type: String, required: true },

//   specialization: { type: String, required: true },
//   experience: { type: Number, required: true },
//   qualifications: { type: String, required: true },

//   clinicDetails: {
//     type: clinicDetailsSchema,
//     required: true
//   },

//   availableSlots: {
//     type: [availableSlotSchema],
//     default: []
//   },

//   documents: {
//     type: [String], // URLs or file paths
//     required: true
//   },

//   imageUrl: {
//     type: String,
//     default: ''
//   },

//   isVerified: {
//     type: Boolean,
//     default: false
//   },

//   isApproved: {
//     type: Boolean,
//     default: false
//   }
// }, {
//   timestamps: true
// });

// const Doctor = mongoose.model('Doctor', doctorSchema);
// export default Doctor;



import mongoose from 'mongoose';

// Slot Schema for profile editing
const availableSlotSchema = new mongoose.Schema({
  day: { type: String, required: true },      // e.g., "Monday"
  startTime: { type: String, required: true }, // e.g., "09:00"
  endTime: { type: String, required: true },   // e.g., "12:00"
});

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    qualifications: { type: String, required: true },
    clinicDetails: { type: String, required: true },

    // Required during registration
    documents: { type: [String], required: true },  // Mandatory

    // These will be updated from dashboard (optional at registration)
    // clinicDetails: {
    //   name: { type: String },
    //   address: { type: String },
    //   location: { type: String },
    // },

    imageUrl: { type: String },   // Doctor profile image (uploaded later)
    availableSlots: {
      type: [availableSlotSchema],
      default: [],
    },

    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    isProfileComplete: { type: Boolean, default: false },  // optional flag
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
