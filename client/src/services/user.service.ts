import api from "../lib/api";
import type { UserFormData } from "../types";
import { UserSchema } from "../types";

const userApi = api('user');

export class UserService {
  async create(userData: UserFormData) {
    const { data } = await userApi.post('', userData);
    return data;
  }

  async checkAuth() {
    const { data } = await userApi.get('/authenticate');
    const validationResult = UserSchema.safeParse(data);
    if (validationResult.success) return validationResult.data;

    throw new Error('Invalid Api Data');
  }

  async checkAdminAuth() {
    const { data } = await userApi.get('/authenticate/admin');
    const validationResult = UserSchema.safeParse(data);
    if (validationResult.success) return validationResult.data;
  }

  async login(userData: { email: string, password: string }) {
    const { data } = await userApi.post('/login', userData);
    console.log(data);
  }
}