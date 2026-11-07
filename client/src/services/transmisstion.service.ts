import api from "../lib/api";
import { SpecificationApiResponse } from "../types";

const transmissionApi = api('transmission');

export class TransmissionService {
  async find() {
    const { data } = await transmissionApi.get('');
    const validationResult = SpecificationApiResponse.safeParse(data);
    if (validationResult.success) return validationResult.data;

    throw new Error('Invalid Api Data');
  }
}