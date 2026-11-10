import { Request, Response } from 'express';
import { BrandService } from '@app/services/brand.service';
import { injectable, inject } from 'tsyringe';
import { NotFoundException } from '@app/common/exceptions/httpException';
import { HttpStatusCode } from '@app/common/http/httpStatusCode';

@injectable()
export class BrandController {
  constructor(@inject(BrandService) private brandService: BrandService) {}
  async getAllBrands(req: Request, res: Response) {
    try {
      const brands = await this.brandService.find();
      return res.status(HttpStatusCode.OK).json(brands);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
        return;
      }
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async getBrandById(req: Request, res: Response) {
    try {
      const brandId = Number(req.params.id);
      const brand = await this.brandService.findOne(brandId);
      res.status(HttpStatusCode.OK).json(brand);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
        return;
      }
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async createBrand(req: Request, res: Response) {
    try {
      const brandData = req.body;
      const newBrand = await this.brandService.create(brandData);
      return res.status(HttpStatusCode.CREATED).json(newBrand);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async updateBrand(req: Request, res: Response) {
    try {
      const brandId = Number(req.params.id);
      const brandData = req.body;
      const updatedBrand = await this.brandService.update(brandId, brandData);

      return res.status(HttpStatusCode.OK).json(updatedBrand);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async deleteBrand(req: Request, res: Response) {
    try {
      const brandId = Number(req.params.id);
      await this.brandService.remove(brandId);

      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }
}
