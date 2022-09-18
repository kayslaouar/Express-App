import express from 'express';
import logger from 'morgan';
import * as db from './db.js';
import * as cache from './cache.js';
import errorMessages from './errorMessages.js';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//! 500 INTERNAL SERVER ERROR: If there is an exception or other error condition that is rare or shouldn't occur
//! id generator (use files)
app.post('/api/user/create', (req, res) => {
	const { name } = req.body;
	if (name === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  const user = db.createUser(title, body);
	if (user === null) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(user);
});

app.post('/api/posts/create', (req, res) => {
	const { userId, content } = req.body;
	if (userId === undefined || content === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	} else if (db.getUser(userId) === null) {
		res.status(404).json({ message: errorMessages.userDNE });
		return;
	}
	const post = db.createPost(userId, content);
	if (post === null) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(post);
});

app.post('/api/comments/create', (req, res) => {
	const { userId, postId, content } = req.body;
	if (userId === undefined || postId === undefined || content === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	} else if (db.getUser(userId) === null) {
		res.status(404).json({ message: errorMessages.userDNE });
		return;
	}
	const comment = db.createComment(userId, content);
	if (comment === null) {
		res.status(500).json({ message: errorMessages.internalServer });
		return;
	}
	res.status(201).json(comment);
});

app.get('/api/comments/get', (req, res) => {
	const { commentId } = req.body;
	if (commentId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
	const comment = db.getComment(commentId);
	if (comment === null) {
		res.status(404).json({ message: errorMessages.commentDNE });
		return;
	}
	res.json(comments);
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});