import { NextFunction, Request, Response } from "express";

import { RequestValidationError } from "..";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
