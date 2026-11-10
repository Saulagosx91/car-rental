import { Request, Response } from 'express';
import { TransmissionService } from '@app/services/transmission.service';
import { injectable, inject } from 'tsyringe';
import { NotFoundException } from '@app/common/exceptions/httpException';
import { HttpStatusCode } from '@app/common/http/httpStatusCode';

@injectable()
export class TransmissionController {
  constructor(@inject(TransmissionService) private transmissionService: TransmissionService) {}
  async getAllTransmissions(req: Request, res: Response) {
    try {
      const transmission = await this.transmissionService.find();
      return res.status(HttpStatusCode.OK).json(transmission);
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

  async getTransmissionById(req: Request, res: Response) {
    try {
      const transmissiondId = Number(req.params.id);
      const transmission = await this.transmissionService.findOne(transmissiondId);
      res.status(HttpStatusCode.OK).json(transmission);
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

  async createTransmission(req: Request, res: Response) {
    try {
      const transmissiondData = req.body;
  
      const newTransmissiond = await this.transmissionService.create(transmissiondData);
      return res.status(HttpStatusCode.CREATED).json(newTransmissiond);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async updateTransmissiond(req: Request, res: Response) {
    try {
      const transmissiondId = Number(req.params.id);
      const transmissiondData = req.body;
      const updatedTransmissiond = await this.transmissionService.update(transmissiondId, transmissiondData);

      return res.status(HttpStatusCode.OK).json(updatedTransmissiond);
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }

  async deleteTransmissiond(req: Request, res: Response) {
    try {
      const transmissiondId = Number(req.params.id);
      await this.transmissionService.remove(transmissiondId);

      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (error) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: `Internal Server Error: ${error}` });
    }
  }
}
