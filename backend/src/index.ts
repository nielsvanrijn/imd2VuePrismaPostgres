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
app.use(cors());

// Users
app.get('/users', validate(isAuth), getUsers);
app.get('/users/:id', getUser);
app.put('/users/:id', validate(updateUserSchema), updateUser);
app.delete('/users/:id', deleteUser);
// Auth
app.post('/register', validate(createUserSchema), createUser);
app.post('/login', validate(loginUserSchema), loginUser);
app.post('/refesh_token', refeshToken);
app.post('/revoke', validate(revokeUserRefeshTokenSchema), revokeUserRefeshToken);

// Profile
app.listen(3000, () => console.log('🚀 Server ready at: http://localhost:3000'));
