export interface Rating {
  ratingId: number;
  doctorId: number;
  userId: number;
  value: number;
}

export interface RatingCreateDto {
  doctorId: number;
  userId: number;
  value: number; // 1..5
}
