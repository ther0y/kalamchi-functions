import { Request, Response, NextFunction } from 'express';

export function hasuraLoginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.body = {
    ...req.body,
    username: req.body.input.username,
    password: req.body.input.password,
  };
  next();
}
