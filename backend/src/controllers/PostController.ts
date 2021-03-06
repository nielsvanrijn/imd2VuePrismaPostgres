import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
    const { author } = req.query;

    const posts = await prisma.post.findMany({
        include: { author: author === 'true' }
    });
    return res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
    const { author } = req.query;
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            id: Number(id)
        },
        include: { author: author === 'true' }
    });

    if (!post) {
        return res.status(404).send('Not Found');
    }

    return res.json(post);
};

export const createPost = async (req: Request, res: Response) => {
    const { author } = req.query;
    const { title, content, published, authorId } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            content,
            published,
            author: { connect: { id: authorId } }
        },
        include: { author: author === 'true' }
    });

    return res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { author } = req.query;
    const { title, content, published } = req.body;

    const post = await prisma.post.update({
        where: {
            id: Number(id)
        },
        data: {
            title,
            content,
            published
        },
        include: { author: author === 'true' }
    });

    return res.json(post);
};

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const post = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        });

        return res.json(post);
    } catch (e) {
        return res.status(404).send('Post not found');
    }
};
