export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    ADMIN_LOGIN: "/auth/admin-login",
    REGISTER_PATIENT: "/auth/patient-register",
    REGISTER_DOCTOR: "/auth/doctor-register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    ME: "/auth/me",   //current logged-in user (Patient/Doctor/Admin)
  },
  PATIENT: {
    DOCTORS_LIST: "/patient/doctors",
    BOOK_APPOINTMENT: "/patient/book-appointment",
    APPOINTMENTS: "/patient/appointments",
    NOTIFICATIONS: "/patient/notifications",
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

