export const ENDPOINTS = {
  AUTH: {

    REGISTER_PATIENT: '/auth/register/patient',
    REGISTER_DOCTOR: '/auth/register/doctor',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',


    // LOGIN: "/auth/login",
    ADMIN_LOGIN: "/auth/admin-login",
    // REGISTER_PATIENT: "/auth/patient-register",
    // REGISTER_DOCTOR: "/auth/doctor-register",
    // FORGOT_PASSWORD: "/auth/forgot-password",
    // RESET_PASSWORD: "/auth/reset-password",
    // LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    ME: "/auth/me",   //current logged-in user (Patient/Doctor/Admin)
  },
    PATIENT: {
      DOCTORS: '/patient/doctors', // Updated path if you want to fetch doctors via patient route
      SINGLE_DOCTOR: (id) => `/patient/${id}`,
      SINGLE_DOCTOR_DETAILS: (id) => `/patient/${id}/details`,
      BOOK_APPOINTMENT: '/appointments/book',
      RESCHEDULE_APPOINTMENT: (id) => `/appointments/reschedule/${id}`,
      CANCEL_APPOINTMENT: (id) => `/appointments/${id}`,
      GET_APPOINTMENTS: '/appointments/appointments',
      PROFILE: '/patients/profile',
      UPDATE_PROFILE: '/patients/profile/update',
      NOTIFICATIONS: '/notifications',



      // PROFILE: '/patients/profile', // GET
      // UPDATE_PROFILE: '/patients/profile/update', // PUT
      // DOCTORS_LIST: '/patient/doctors',
      // SINGLE_DOCTOR: (id) => `/patient/doctors/${id}`,
      // BOOK_APPOINTMENT: '/patient/book-appointment', 
      // APPOINTMENTS: '/patient/get-appointments',
      // CANCEL_APPOINTMENT: '/patient/appointments/cancel',
      // NOTIFICATIONS: '/patient/notifications',
    },
  DOCTOR: {
    PROFILE: "/doctor/profile",
    UPDATE_PROFILE: "/doctor/profile",
    
  },

  ADMIN: {
    // Doctor Management
    VERIFY_DOCTOR: (id) => `/admin/verify-doctor/${id}`,
    APPROVE_DOCTOR: (id) => `/admin/approve-doctor/${id}`,
    DELETE_DOCTOR: (id) => `/admin/delete-doctor/${id}`,
    GET_ALL_DOCTORS: "/admin/doctors",

    // Patient Management
    GET_ALL_PATIENTS: "/admin/patients",
    DELETE_PATIENT: (id) => `/admin/delete-patients/${id}`,
    BLOCK_PATIENT: (id) => `/admin/block-patient/${id}`,
    UNBLOCK_PATIENT: (id) => `/admin/unblock-patient/${id}`,

    // Appointment Management
    GET_ALL_APPOINTMENTS: "/admin/appointments",
    UPDATE_APPOINTMENT_STATUS: (id) => `/admin/appointments/${id}`,
    DELETE_APPOINTMENT: (id) => `/admin/appointments/${id}`,

    // Reports and Analytics
    GET_REPORTS: "/admin/reports",

    // Dispute Management
    RAISE_DISPUTE: "/admin/dispute",
    RESOLVE_DISPUTE: (id) => `/admin/dispute/${id}`,
    GET_ALL_DISPUTES: "/admin/disputes",
  },
};

