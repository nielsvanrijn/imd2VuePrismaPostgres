import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
	const { posts } = req.query;

	const users = await prisma.user.findMany({
		include: { posts: posts === 'true' },
	});
	return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
	const { posts } = req.query;
	const { id } = req.params;

	const user = await prisma.user.findUnique({
		where: {
			id: Number(id),
		},
		include: { posts: posts === 'true' },
	});

	if (!user) {
		return res.status(404).send('Not Found');
	}

	return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
	const { name, email, phone } = req.body;

	const user = await prisma.user.create({
		data: {
			name,
			email,
			phone,
		},
	});

	return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, email, phone } = req.body;

	const user = await prisma.user.update({
		where: {
			id: Number(id),
		},
		data: {
			name,
			email,
			phone,
		},
	});

	return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await prisma.post.deleteMany({
			where: {
				authorId: Number(id),
			},
		});
		const user = await prisma.user.delete({
			where: {
				id: Number(id),
			},
		});

		return res.json(user);
	} catch (e) {
		return res.status(404).send('User not found');
	}
};