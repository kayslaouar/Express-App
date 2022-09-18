import express from 'express';
import logger from 'morgan';
import * as db from './db.js';
import errorMessages from './errorMessages.js';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//! 500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur
app.post('/api/user/create', async (req, res) => {
	const { name } = req.body;
	if (name === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  const user = await db.createUser(name);
	if (!user) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(user);
});

app.delete('/api/user/delete', async (req, res) => {
	const { userId } = req.body;
	if (userId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  const user = await db.deleteUser(userId);
	if (!user) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(user);
});

app.post('/api/posts/create', async (req, res) => {
	const { userId, content } = req.body;
	if (userId === undefined || content === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	} else if (await db.getUser(userId) === null) {
		res.status(404).json({ message: errorMessages.userDNE });
		return;
	}
	const post = await db.createPost(userId, content);
	if (!post) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(post);
});

app.get('/api/posts/get', async (req, res) => {
	const { commentId } = req.body;
	if (commentId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
	const comment = await db.getComment(commentId);
	if (!comment) {
		res.status(404).json({ message: errorMessages.commentDNE });
		return;
	}
	res.json(comment);
});

app.delete('/api/posts/delete', async (req, res) => {
	const { postId } = req.body;
	if (postId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  const post = await db.deletePost(postId);
	if (!post) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(user);
});

app.post('/api/comments/create', async (req, res) => {
	const { userId, postId, content } = req.body;
	if (userId === undefined || postId === undefined || content === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	} else if (await db.getUser(userId) === null) {
		res.status(404).json({ message: errorMessages.userDNE });
		return;
	} else if (await db.getPost(postId) === null) {
    res.status(404).json({ message: errorMessages.postDNE });
		return;
  }
	const comment = await db.createComment(userId, postId, content);
	if (!comment) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(comment);
});

app.get('/api/comments/get', async (req, res) => {
	const { commentId } = req.body;
	if (commentId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
	const comment = await db.getComment(commentId);
	if (!comment) {
		res.status(404).json({ message: errorMessages.commentDNE });
		return;
	}
	res.json(comments);
});

app.delete('/api/comments/delete', async (req, res) => {
	const { commentId } = req.body;
	if (commentId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  const comment = await db.deleteComment(commentId);
	if (!comment) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(comment);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});