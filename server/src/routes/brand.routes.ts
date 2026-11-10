import { Router } from 'express';
import { BrandController } from '@app/controllers/brand.controller';
import { container } from 'tsyringe';

const brandRouter = Router();
const brandController = container.resolve(BrandController);

brandRouter
  .route('/')
  .get(brandController.getAllBrands.bind(brandController))
  .post(brandController.createBrand.bind(brandController));

brandRouter
  .route('/:id')
  .get(brandController.getBrandById.bind(brandController))
  .put(brandController.updateBrand.bind(brandController))
  .delete(brandController.deleteBrand.bind(brandController));

export default brandRouter;