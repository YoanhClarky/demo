import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
 
export const validateParams = (paramType: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const params = plainToInstance(paramType, req.params);
    const errors = await validate(params as any);
 
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(error => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    }
    next();
  };
};