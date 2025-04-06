import axios from "axios";

const API = axios.create({
  baseURL: "https://meditrack-app-7dfy.onrender.com/api", // Your backend route prefix
  // https://meditrack-app-7dfy.onrender.com
  // http://localhost:5000/api
});

// Example API call
export const authAPI = {
  login: (formData) => API.post("/auth/login", formData),
  register: (formData) => API.post("/auth/register", formData),
};

// Doctors
export const doctorsAPI = {
  fetch: () => API.get("/doctors"),
  add: (doctorData) => API.post("/doctors/add", doctorData),
};

// Patients
export const patientsAPI = {
  fetch: () => API.get("/patients"),
  add: (patientData) => API.post("/patients/add", patientData),
};

// Appointments
export const appointmentsAPI = {
  fetch: () => API.get("/appointments"),
  add: (formData) => API.post("/appointments/add", formData),
};

// Billing
export const billingAPI = {
  fetch: () => API.get("/billing"),
  add: (billingData) => API.post("/billing/add", billingData),
};

// Medical Records
export const medicalAPI = {
  fetch: () => API.get("/medical"),
  add: (recordData) => API.post("/medical/add", recordData),
};
