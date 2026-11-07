import api from "../lib/api";
import { SpecificationApiResponse } from "../types";

const motorizationApi = api('motorization');

export class MotorizationService {
  async find() {
    const { data } = await motorizationApi.get('');
    const validationResult = SpecificationApiResponse.safeParse(data);
    if (validationResult.success) return validationResult.data;

    throw new Error('Invalid Api Data');
  }
}