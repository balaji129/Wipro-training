import { Doctor } from "./doctor";

export interface Appointment {
  appointmentId: number;
  doctorId: number;
  patientName: string;
  appointmentDate: string;
  timeSlot?: string;   // UI binding
  status?: string;     // appointment status
  doctor?: Doctor;
}

// DTO for creating a new appointment
export interface AppointmentCreateDto {
  userId: number;
  doctorId: number;
  appointmentDate: string; // ISO date string
  timeSlot: string;
  status?: string; // optional, backend may default it
}
