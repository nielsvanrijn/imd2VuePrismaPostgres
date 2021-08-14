import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { createUser, deleteUser, getUser, getUsers, loginUser, refeshToken, revokeUserRefeshToken, updateUser } from './controllers/UserController';
import { validate } from './middlewares/ValidateMiddleware';
import { createUserSchema, loginUserSchema, revokeUserRefeshTokenSchema, updateUserSchema } from './middlewares/UserValidation';
import { isAuth } from './middlewares/AuthValidation';

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin: true, credentials: true}));

// disable cors when live && remove withcredentials true from angular

// User(s)
app.use('/user', validate(isAuth));
app.get('/user', getUser);
app.patch('/user', validate(updateUserSchema), updateUser);
app.delete('/user/:id', deleteUser);
app.get('/users', validate(isAuth), getUsers);

// Auth
app.post('/register', validate(createUserSchema), createUser);
app.post('/login', validate(loginUserSchema), loginUser);
app.post('/refesh_token', refeshToken);
app.post('/revoke', validate(revokeUserRefeshTokenSchema), revokeUserRefeshToken);

// Profile
app.listen(3000, () => console.log('🚀 Server ready at: http://localhost:3000'));
