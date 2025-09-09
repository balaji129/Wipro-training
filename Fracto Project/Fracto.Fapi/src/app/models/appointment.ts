import { Doctor } from "./doctor";

export interface Appointment {
  appointmentId: number;
  doctorId: number;
  patientName: string;
  userId: number;
  appointmentDate: string;
  timeSlot?: string;   
  status?: string;     
  doctor?: Doctor;
}

export interface AppointmentCreateDto {
  doctorId: number;
  appointmentDate: string; 
  timeSlot: string;
  status?: string; 
}
