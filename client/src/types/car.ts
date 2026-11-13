import { z } from 'zod';

export const CarFormSchema = z.object({
  name: z.string(),
  price: z.number(),
  color: z.string(),
  passengers: z.number(),
  plate: z.string(),
  car_image: z.string().nullable(),
  brandId: z.number(),
  transmissionId: z.number(),
  motorizationId: z.number()
});

const carSpecificaton = z.object({
  id: z.number(),
  name: z.string()
});

export const CarSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  color: z.string(),
  passengers: z.number(),
  plate: z.string(),
  car_image: z.string().nullable(),
  status: z.string().optional(),
  Brand: carSpecificaton,
  Transmission: carSpecificaton,
  Motorization: carSpecificaton
});

export const CarApiResponse = z.array(CarSchema);

export const SpecificationApiResponse = z.array(carSpecificaton);
export type CarForm = z.infer<typeof CarFormSchema>;
export type Car = z.infer<typeof CarSchema>;

export type Specification = z.infer<typeof carSpecificaton>;
export type Transmission = z.infer<typeof carSpecificaton>;
export type Motorization = z.infer<typeof carSpecificaton>;