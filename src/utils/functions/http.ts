import { Request, Response } from 'express';

export const response = (res: Response, status: number, msg: string, data: any) => {
  res.status(status).json({
    status,
    msg,
    data,
  });
}
