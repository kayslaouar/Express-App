import { readFile, writeFile } from 'fs/promises';
import { User, Post, Comment } from './content.js';
import { exec } from 'child_process';

const usersDBFilename = './databases/users.json';
const postsDBFilename = './databases/posts.json';
const commentsDBFilename = './databases/comments.json';
const idsDBFilename = './databases/ids.json';

export async function initDatabases() {
  await writeFile('databases/users.json', JSON.stringify({}), { encoding: 'utf8' });
  await writeFile('databases/posts.json', JSON.stringify({}), { encoding: 'utf8' });
  await writeFile('databases/comments.json', JSON.stringify({}), { encoding: 'utf8' });
  exec('node databases/ids.js > databases/ids.json');
  console.log('Databases Initialized');
}

async function load(filename) {
  try {
    return JSON.parse(await readFile(filename, { encoding: 'utf8' }) || "{}");
  } catch (err) {
    return {};
  }
}

async function save(filename, data) {
  try {
    await writeFile(filename, JSON.stringify(data), { encoding: 'utf8' });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function createUser(username) {
  const idsDB = await load(idsDBFilename);
  const usersDB = await load(usersDBFilename);
  const userId = ++idsDB.userIndex;
  const user = new User(userId, username);
  usersDB[userId] = user;
  await save(idsDBFilename, idsDB);
  await save(usersDBFilename, usersDB);
  return user;
}

export async function getUser(userId) {
  const usersDB = await load(usersDBFilename);
  return usersDB[userId];
}

function deleteAllUserPosts(userId, postsDB) {
  for (const postId in postsDB) {
    if (postsDB[postId].userId === userId) {
      delete postsDB[postId];
    }
  }
}

function deleteAllUserComments(userId, commentsDB) {
  for (const commentId in commentsDB) {
    if (commentsDB[commentId].userId === userId) {
      delete commentsDB[commentId];
    }
  }
}

function deleteAllPostComments(postId, commentsDB) {
  for (const commentId in commentsDB) {
    if (commentsDB[commentId].postId === postId) {
      delete commentsDB[commentId];
    }
  }
}

export async function deleteUser(userId) {
  const usersDB = await load(usersDBFilename);
  const postsDB = await load(postsDBFilename);
  const commentsDB = await load(commentsDBFilename);
  if (userId in usersDB) {
    const user = usersDB[userId];
    deleteAllUserPosts(userId, postsDB);
    deleteAllUserComments(userId, commentsDB);
    delete usersDB[userId];
    await save(usersDBFilename, usersDB);
    await save(postsDBFilename, postsDB);
    await save(commentsDBFilename, commentsDB);
    return user;
  } else {
    return null;
  }
}

export async function createPost(userId, username, content) {
  const idsDB = await load(idsDBFilename);
  const postsDB = await load(postsDBFilename);
  const postId = ++idsDB.postIndex;
  const post = new Post(postId, userId, username, content);
  postsDB[postId] = post;
  await save(idsDBFilename, idsDB);
  await save(postsDBFilename, postsDB);
  return post;
}

export async function getPost(postId) {
  const postsDB = await load(postsDBFilename);
  return postsDB[postId];
}

export async function deletePost(postId) {
  const postsDB = await load(postsDBFilename);
  const commentsDB = await load(commentsDBFilename);
  if (postId in postsDB) {
    const post = postsDB[postId];
    deleteAllPostComments(postId, commentsDB);
    delete postsDB[postId];
    await save(postsDBFilename, postsDB);
    await save(commentsDBFilename, commentsDB);
    return post;
  } else {
    return null;
  }
}

export async function createComment(postId, userId, username, content) {
  const idsDB = await load(idsDBFilename);
  const commentsDB = await load(commentsDBFilename);
  const commentId = ++idsDB.commentIndex;
  const comment = new Comment(commentId, postId, userId, username, content);
  commentsDB[commentId] = comment;
  await save(idsDBFilename, idsDB);
  await save(commentsDBFilename, commentsDB);
  return comment;
}

export async function getComment(commentId) {
  const commentsDB = await load(commentsDBFilename);
  return commentsDB[commentId];
}

export async function deleteComment(commentId) {
  const commentsDB = await load(commentsDBFilename);
  if (commentId in commentsDB) {
    const comment = commentsDB[commentId];
    delete commentsDB[commentId];
    return comment;
  } else {
    return null;
  }
}