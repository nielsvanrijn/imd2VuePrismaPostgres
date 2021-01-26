import * as bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'

import {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} from './controllers/UserController';
import {
	getPost,
	getPosts,
	createPost,
	updatePost,
	deletePost,
} from './controllers/PostController';
import {
	validate,
	createUserSchema,
	updateUserSchema,
	createPostSchema,
	updatePostSchema,
} from './middlewares/ValidateMiddleware';

const app = express()
app.use(helmet());
app.use(bodyParser.json())

// Users
app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.post('/users', validate(createUserSchema), createUser);
app.put('/users/:id', validate(updateUserSchema), updateUser);
app.delete('/users/:id', deleteUser);

// Posts
app.get('/posts', getPosts);
app.get('/posts/:id', getPost);
app.post('/posts', validate(createPostSchema), createPost);
app.put('/posts/:id', validate(updatePostSchema), updatePost);
app.delete('/posts/:id', deletePost);

app.listen(3000, () =>
	console.log('🚀 Server ready at: http://localhost:3000'),
)