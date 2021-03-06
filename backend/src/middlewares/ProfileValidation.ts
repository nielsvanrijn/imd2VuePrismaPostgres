import { body } from 'express-validator';

export const createProfileSchema = [
    body('title', 'Title is required').notEmpty(),
    body('authorId', 'Author is required').notEmpty()
];

export const updateProfileSchema = [
    body('title', 'Title is required').notEmpty(),
    body('authorId', 'Author is required').notEmpty()
];