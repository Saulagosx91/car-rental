import { z } from 'zod';
// import { CarSchema } from './car';
import { UserSchema } from './user';

const ReservationSchema = z.object({
  id: z.number(),
  userId: z.number(),
  total: z.number(),
  start_date: z.string(),
  return_date: z.string(),
  carId: z.number(),
  status: z.enum(['SOLICITED', 'CANCELLED', 'COMPLETED']),
  Car: z.object({
    id: z.number(),
    name: z.string(),
    car_image: z.string()
  }),
  User: UserSchema.optional()
});

export type Reservation = z.infer<typeof ReservationSchema>;
export const ReservationAPIResponse = z.array(ReservationSchema);