import { Request, Response } from 'express';
import { MotorizationService } from '@app/services/motorization.service';
import { injectable, inject } from 'tsyringe';
import { NotFoundException } from '@app/common/exceptions/httpException';
import { HttpStatusCode } from '@app/common/http/httpStatusCode';

@injectable()
export class MotorizationController {
  constructor(@inject(MotorizationService) private motorizationService: MotorizationService) {}
  async getAllMotorizations(req: Request, res: Response) {
    try {
      const motorizations = await this.motorizationService.find();
      return res.status(HttpStatusCode.OK).json(motorizations);
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

  async getMotorizationById(req: Request, res: Response) {
    try {
      const motorizationId = Number(req.params.id);
      const motorization = await this.motorizationService.findOne(motorizationId);
      res.status(HttpStatusCode.OK).json(motorization);
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

  async createMotorization(req: Request, res: Response) {
    try {
      const motorizationData = req.body;
      const newMotorization = await this.motorizationService.create(
        motorizationData
      );
      return res.status(HttpStatusCode.CREATED).json(newMotorization);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async updateMotorization(req: Request, res: Response) {
    try {
      const motorizationId = Number(req.params.id);
      const motorizationData = req.body;
      const updatedMotorization = await this.motorizationService.update(
        motorizationId,
        motorizationData
      );

      return res.status(HttpStatusCode.OK).json(updatedMotorization);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async deleteMotorization(req: Request, res: Response) {
    try {
      const motorizationId = Number(req.params.id);
      await this.motorizationService.remove(motorizationId);

      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }
}
