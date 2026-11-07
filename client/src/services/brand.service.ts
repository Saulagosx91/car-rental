import api from "../lib/api";
import { SpecificationApiResponse } from "../types";

const brandApi = api('brand');

export class BrandService {
  async find() {
    const { data } = await brandApi.get('');
    const validationResult = SpecificationApiResponse.safeParse(data);
    if (validationResult.success) return validationResult.data;

    throw new Error('Invalid Api Data');
  }
}