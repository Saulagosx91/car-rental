import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  password: z.string(),
  roleId: z.number()
});

export const UserApiResponse = z.array(UserSchema);
export type User = z.infer<typeof UserSchema>;
export type UserFormData = Omit<User, 'id'>;