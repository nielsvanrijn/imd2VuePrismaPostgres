import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Getters
export const getUsers = async (req: Request, res: Response) => {

    const users = await prisma.user.findMany();
    return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    });

    if (!user) {
        return res.status(404).send('Not Found');
    }

    return res.json(user);
};

// CRUD
// export const createUser = async (req: Request, res: Response) => {
// const { name, email, phone } = req.body

// const user = await prisma.user.create({
//     data: {
//         email,
//     }
// })

// return res.json(user)
// }

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { email }
    });

    return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    // const { id } = req.params

    // try {
    //     await prisma.post.deleteMany({
    //         where: {
    //             authorId: Number(id)
    //         }
    //     })
    //     const user = await prisma.user.delete({
    //         where: {
    //             id: Number(id)
    //         }
    //     })

    //     return res.json(user)
    // } catch (e) {
    //     return res.status(404).send('User not found')
    // }
};

// Auth
export const loginUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) return  res.status(500).json('Validation failed');

    res.cookie(
        'rt',
        sign({userId: user.id, tokenVersion: user.tokenVersion}, <string>process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'}),
        {httpOnly: true}
    );
    
    return res.status(200).json({
        accessToken: sign({userId: user.id}, <string>process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
    });
};

export const createUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 12);

    try {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });
        return res.status(200);
    }
    catch(e) {
        console.log(e);
        return res.status(500);
    }
};

// Refesh token
export const refeshToken = async (req: Request, res: Response) => {
    const token = req.cookies.rt;
    if (!token) {
        return res.status(400).send({ok: false, accessToken: ''});
    }

    let payload: any = null;
    try {
        payload = verify(token, <string>process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ok: false, accessToken: ''});
    }

    const user = await prisma.user.findUnique({
        where: { id: payload.userId },
    });

    if (!user) return res.status(500).send({ok: false, accessToken: ''});
	
    if (user.tokenVersion !== payload.tokenVersion) return res.status(400).send({ok: false, accessToken: ''});

    res.cookie(
        'rt',
        sign({userId: user.id, tokenVersion: user.tokenVersion}, <string>process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'}),
        {httpOnly: true}
    );

    return res.status(200).json({
        ok: true,
        accessToken: sign({userId: user.id}, <string>process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
    });
};

// Refesh token
export const revokeUserRefeshToken = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) return  res.status(500).json('Validation failed');

    try {
        await prisma.user.update({
            where: { email },
            data: { tokenVersion: user.tokenVersion + 1 },
        });
        return res.status(200);
    }
    catch(err) {
        console.log(err);
        return res.status(500).send(err.message ? err.message : 'Could not update user');
    }
};