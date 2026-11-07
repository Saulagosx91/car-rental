import axios from "axios";
import api from "../lib/api";
import { CarApiResponse, type Car } from "../types";

const carApi = api('car');

export class CarService {
  async find() {
    const { data } = await carApi.get('');
    const validationResult = CarApiResponse.safeParse(data);
    if (validationResult.success) return validationResult.data;

    throw new Error('Invalid Api Data');
  }

  async findOne(id: number) {
    try {
      const { data } = await carApi.get(`/${id}`);
      return data as Car;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(data: FormData) {
    const response = await carApi.post('', data);
    return response.status === 201;
  }

  async update(data: unknown, id: number) {
    // const response = await carApi.put(`/${id}`, data);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/car/${id}`, data);
    console.log(response);
    return response.status === 200;
  }
}