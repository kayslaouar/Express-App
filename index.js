import express from 'express';
import logger from 'morgan';
import * as db from './db.js';
import errorMessages from './errorMessages.js';

await db.initDatabases();
const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/user/create', async (req, res) => {
	const { name } = req.body;
	if (name === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const user = await db.createUser(name);
    res.status(201).json(user);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.get('/api/user/get', async (req, res) => {
	const { userId } = req.body;
	if (userId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const user = await db.getUser(userId);
	  if (!user) {
		  res.status(404).json({ message: errorMessages.userDNE });
		  return;
    }
    res.status(200).json(user);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.delete('/api/user/delete', async (req, res) => {
	const { userId } = req.body;
	if (userId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const user = await db.deleteUser(userId);
    if (!user) {
      res.status(404).json({ message: errorMessages.userDNE });
		  return;
    }
    res.status(201).json(user);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.post('/api/posts/create', async (req, res) => {
	const { userId, content } = req.body;
	if (userId === undefined || content === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const user = await db.getUser(userId);
    if (!user) {
      res.status(404).json({ message: errorMessages.userDNE });
      return;
    }
    const post = await db.createPost(userId, user.username, content);
    res.status(201).json(post);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.get('/api/posts/get', async (req, res) => {
	const { postId } = req.body;
	if (postId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const post = await db.getPost(postId);
	  if (!post) {
		  res.status(404).json({ message: errorMessages.postDNE });
		  return;
    }
    res.status(200).json(post);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.delete('/api/posts/delete', async (req, res) => {
	const { postId } = req.body;
	if (postId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const post = await db.deletePost(postId);
    if (!post) {
      res.status(404).json({ message: errorMessages.postDNE });
      return;
    }
    res.status(201).json(post);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.post('/api/comments/create', async (req, res) => {
	const { userId, postId, content } = req.body;
	if (userId === undefined || postId === undefined || content === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const user = await db.getUser(userId);
    const post = await db.getPost(postId);
    if (!user) {
      res.status(404).json({ message: errorMessages.userDNE });
      return;
    } else if (!post) {
      res.status(404).json({ message: errorMessages.postDNE });
      return;
    }
    const comment = await db.createComment(postId, userId, user.username, content);
    res.status(201).json(comment);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.get('/api/comments/get', async (req, res) => {
	const { commentId } = req.body;
	if (commentId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const comment = await db.getComment(commentId);
    if (!comment) {
      res.status(404).json({ message: errorMessages.commentDNE });
      return;
    }
    res.status(200).json(comment);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.delete('/api/comments/delete', async (req, res) => {
	const { commentId } = req.body;
	if (commentId === undefined) {
		res.status(400).json({ message: errorMessages.missingInfo });
		return;
	}
  try {
    const comment = await db.deleteComment(commentId);
    if (!comment) {
      res.status(404).json({ message: errorMessages.commentDNE });
      return;
    }
    res.status(201).json(comment);
  } catch(e) {
    res.status(500).json({ message: errorMessages.serverFailure });
  }
});

app.listen(port, async () => {
  //db.initDatabases();
  console.log(`Example app listening at http://localhost:${port}`);
});