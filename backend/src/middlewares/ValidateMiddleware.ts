import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validate = (schemas: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		await Promise.all(schemas.map((schema) => schema.run(req)));

		const result = validationResult(req);
		if (result.isEmpty()) {
			return next();
		}

		const errors = result.array();
		return res.status(422).json(errors);
	};
};

export const createUserSchema = [
	body('name', 'Name is required').notEmpty(),
	body('email', 'Email is required')
		.notEmpty()
		.custom((value) => {
			if (!value) return true;
			return prisma.user
				.findUnique({
					where: {
						email: value,
					},
				})
				.then((user) => {
					if (user) {
						return Promise.reject('E-mail already in use');
					}
				});
		}),
];

export const updateUserSchema = [
	body('name', 'Name is required').notEmpty(),
	body('email', 'Email is required').custom((value, { req: { params } }) => {
		if (!value) return true;
		return prisma.user
			.findUnique({
				where: {
					email: value,
				},
			})
			.then((user) => {
				if (user && params?.id && Number(params.id) !== user.id) {
					return Promise.reject('E-mail already in use');
				}
			});
	}),
];

export const createPostSchema = [
	body('title', 'Title is required').notEmpty(),
	body('authorId', 'Author is required').notEmpty(),
];

export const updatePostSchema = [
	body('title', 'Title is required').notEmpty(),
	body('authorId', 'Author is required').notEmpty(),
];