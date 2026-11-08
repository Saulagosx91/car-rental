import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from "@app/common/http/httpStatusCode";
import { UserService } from "@app/services/user.service";
import User from "@app/models/user.model";

const userService = new UserService();

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

async function checkToken(req: Request, res: Response): Promise<boolean> {
  const token = req.cookies?.authtoken;
  if (!token) {
    res.status(HttpStatusCode.UNAUTHORIZED).send('Unauthorized');
    return false;
  }

  try {
    const payload = jwt.verify(token, `${process.env.SECRET_KEY}`) as jwt.JwtPayload;

    if (payload) {
      const user = await userService.findOne(Number(payload.id));
      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized ' });
        return false;
      }

      req.user = user;
      return true;
    }
  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized ' });
    return false;
  }

  return false;
}

async function checkAdminToken(req: Request, res: Response): Promise<boolean> {
  const token = req.cookies?.authtoken;
  if (!token) {
    res.status(HttpStatusCode.UNAUTHORIZED).send('Unauthorized');
    return false;
  }

  try {
    const payload = jwt.verify(token, `${process.env.SECRET_KEY}`) as jwt.JwtPayload;

    if (payload) {
      const user = await userService.findOne(Number(payload.id));
      if (!user) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized ' });
        return false;
      }

      if (user.roleId !== 1) {
        res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Forbidden: Admins only' });
        return false;
      }

      req.user = user;
      return true;
    }
  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized ' });
    return false;
  }

  return false;
}

export async function validateAuth(req: Request, res: Response, next: NextFunction) {
  const ok = await checkToken(req, res);
  if (ok) next();
}

export async function validateAdmin(req: Request, res: Response, next: NextFunction) {
  const ok = await checkAdminToken(req, res);
  if (ok) next();
}

export const userAuthenticated = async (req: Request, res: Response) => {
  await checkToken(req, res);
  res.status(HttpStatusCode.OK).json(req.user);
}

export const adminAuthenticated = async (req: Request, res: Response) => {
  await checkAdminToken(req, res);
  res.status(HttpStatusCode.OK).json(req.user);
}
