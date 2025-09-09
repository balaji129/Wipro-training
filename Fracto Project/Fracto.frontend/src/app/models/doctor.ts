export interface Doctor {
  doctorId: number; //required
  name: string;
  specializationId?: number;
  city: string;
  rating: number;
  specializationName?: string;
}
