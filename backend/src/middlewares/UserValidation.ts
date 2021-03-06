import { body } from 'express-validator';
import { compare } from 'bcryptjs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create / register
export const createUserSchema = [
    body('email', 'Email is required').notEmpty()
        .isEmail().withMessage('Email is not valid')
        .custom((value) => {
            if (!value) return true;
            return prisma.user
                .findUnique({
                    where: {
                        email: value
                    }
                })
                .then(async (user) => {
                    if (user) {
                        return await Promise.reject(new Error('E-mail already in use'));
                    }
                    return await Promise.resolve();
                });
        }),
    body('password', 'Name is required').notEmpty()
        .isLength({min: 6}).withMessage('Password must be longer than 6 characters')
        .matches(/[A-Z]/).withMessage('Password does not contain an uppercase character')
        .matches(/\W/).withMessage('Password does not contain any non-word characters')
];

// Update
export const updateUserSchema = [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').custom((value, { req: { params } }) => {
        if (!value) return true;
        return prisma.user
            .findUnique({
                where: {
                    email: value
                }
            })
            .then(async (user) => {
                if (user && params?.id && Number(params.id) !== user.id) {
                    return await Promise.reject(new Error('E-mail already in use'));
                }
                return await Promise.resolve();
            });
    })
];

// Login
export const loginUserSchema = [
    body('email', 'Email is required').notEmpty()
        .custom(async (value) => {
            if (!value) return true;
            const user = await prisma.user
                .findUnique({
                    where: {
                        email: value
                    }
                });
                
            if (!user) return await Promise.reject(new Error('No users found with that E-mail'));
            return await Promise.resolve();
        }),
    body('password', 'Password is required').notEmpty()
        .custom(async (value, meta) => {
            if (!value) return true;
            const user = await prisma.user
                .findUnique({
                    where: {
                        email: meta.req.body.email
                    }
                });
            if (!user) return await Promise.reject(new Error('Validation failed'));

            const valid = await compare(value, user.password);
            if (!valid) return await Promise.reject(new Error('Invalid E-mail password combination'));

            return await Promise.resolve();
        })
];

// revoke refeshToken for user
export const revokeUserRefeshTokenSchema = [
    body('email', 'Email is required').notEmpty()
        .custom(async (value) => {
            if (!value) return true;
            const user = await prisma.user
                .findUnique({
                    where: {
                        email: value
                    }
                });
                
            if (!user) return await Promise.reject(new Error('No user found with that E-mail'));
            return await Promise.resolve();
        })
];