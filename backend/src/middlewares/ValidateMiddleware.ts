import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const validate = (schemas: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schemas.map(async (schema) => await schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    const errors = result.array();
    return res.status(422).json(errors);
};
