# Homework 1: SnapBook

## Overview

The world is overrun with social media applications. *SnapBook* is the latest craze that has hit the street. SnapBook allows the user to make posts at a specific time of day when notified by the system. The user is unaware of when they will be notified, but that they will be notified and then make a post. After a post is made, users are then allowed to comment on other users' posts. The posts/comments are added to a feed that can be shared according to several levels of visibility (family only, friends only, world, etc.). Posts and comments can also be set to disappear after a set time period. Users can set a default time for posts/comments to delete or never delete. Specific features include:

- Posting to the user's SnapBook feed.
- Comment on other user's posts.
- Setting post and/or comment visibility.
- Configure default post and comment visibility.
- And many more...

This homework requires you to implement a *monolithic* back-end Express server that provides an API for SnapBook.

## API Requirements

Your monolith must implement the following API. Each HTTP endpoint specifies the criteria that you must adhere to.

---

### Create User

---

Create a new SnapBook user.

**URL**: `/api/user/create`

**METHOD**: `POST`

**BODY**:

Request Data Constraints:

```json
{ "name" : "[unicode 64 characters max]" }
```

Request Data Example:

```json
{ "name" : "Vebjørn Nordhagen" }
```

**RESPONSE**:

- `201 CREATED`: If user is successfully created.

  Response Data Constraints:

  ```json
  { "userid" : "[unique identifier]", "name" : "[unicode 64 characters max]" }
  ```

  Response Data Example:

  ```json
  { "userid" : "4fab42cc01", "name" : "Vebjørn Nordhagen" }
  ```

- `400 BAD REQUEST`: If request data is incomplete
- `500 INTERNAL SERVER ERROR`: If there is an exception or other error condition that is rare or shouldn't occur

---

### Create Post

---

Create a new SnapBook post.

**URL**: `/api/posts/create`

**METHOD**: `POST`

**BODY**:

Request Data Constraints:

```json
{ "userid" : "[unique identifier]",
  "content" : "[unicode 128 characters max]" }
```

Request Data Example:

```json
{ "userid" : "4fab42cc01", 
  "content" : "So much to do, so little time..." }
```

**RESPONSE**:

- `201 CREATED`: If post is successfully created.
  Response Data Constraints:

  ```json
  { "postid" : "[unique identifier]",
    "userid" : "[unique identifier]", 
    "name" : "[unicode 64 characters max]",
    "content" : "[unicode 128 characters max]" }
  ```

  Response Data Example:

  ```json
  { "postid" : "bfe3a44ca9",
    "userid" : "4fab42cc01", 
    "name" : "Vebjørn Nordhagen",
    "content" : "So much to do, so little time.." }
  ```

- `400 BAD REQUEST`: If request data is incomplete
- `404 BAD REQUEST`: If the user doesn't exist
- `500 INTERNAL SERVER ERROR`: If there is an exception or other error condition that is rare or shouldn't occur

---

### Create Comment

---

Create a new SnapBook comment.

**URL**: `/api/comments/create`

**METHOD**: `POST`

**BODY**:

Request Data Constraints:

```json
{ "userid" : "[unique identifier]",
  "postid" : "[unique identifier]",
  "content" : "[unicode 128 characters max]" }
```

Request Data Example:

```json
{ "userid" : "5abc52dd12",
  "postid" : "bfe3a44ca9",
  "content" : "Time is a figment of our imagination" }
```

**RESPONSE**:

- `201 CREATED`: If comment is successfully created.
  Response Data Constraints:

  ```json
  { "commentid" : "[unique identifier]",
    "postid" : "[unique identifier]",
    "userid" : "[unique identifier]", 
    "name" : "[unicode 64 characters max]",
    "content" : "[unicode 128 characters max]" }
  ```

  Response Data Example:

  ```json
  { "commentid" : "caf4b55db2",
    "postid" : "bfe3a44ca9",
    "userid" : "5abc52dd12", 
    "name" : "Ava Lovelace",
    "content" : "Time is a figment of our imagination" }
  ```

- `400 BAD REQUEST`: If request data is incomplete
- `404 NOT FOUND`: If the user doesn't exist OR If the post doesn't exist.
- `500 INTERNAL SERVER ERROR`: If there is an exception or other error condition that is rare or shouldn't occur

---

### Get Comment

---

Get a new SnapBook comment.

**URL**: `/api/comments/get`

**METHOD**: `GET`

**BODY**:

Request Data Constraints:

```json
{ "commentid" : "[unique identifier]" }
```

Request Data Example:

```json
{ "commentid" : "caf4b55db2" }
```

**RESPONSE**:

- `200 OK`: If comment is found
  Response Data Constraints:

  ```json
  { "commentid" : "[unique identifier]",
    "postid" : "[unique identifier]",
    "userid" : "[unique identifier]", 
    "name" : "[unicode 64 characters max]",
    "content" : "[unicode 128 characters max]" }
  ```

  Response Data Example:

  ```json
  { "commentid"  : "caf4b55db2",
    "postid" : "bfe3a44ca9",
    "userid" : "5abc52dd12", 
    "name" : "Ava Lovelace",
    "content" : "Time is a figment of our imagination" }
  ```

- `400 BAD REQUEST`: If request data is incomplete
- `404 NOT FOUND`: If the comment doesn't exist
- `500 INTERNAL SERVER ERROR`: If there is an exception or other error condition that is rare or shouldn't occur

## Server Requirements

The following is a list of requirements that your monolith must meet:

- A `package.json` file containing the dependencies used in your application (automatically added by `npm install`). This file must also include a `"type" : "module"` declaration as we will be using ES modules in this assignment. This file must also include a script allowing the server to be started by simply typing in `npm start`.
- You must use `nodemon` to start your server and use it in your script in the `package.json` file.
- An `index.js` file containing the code for your monolith. You are welcome to partition your code into other files, but you must include `index.js` as the main entry-point to the server. If you use other files, they must be imported using ES module syntax (i.e., `import express from 'express';`).
- All data is stored in memory (not externally in a file or database).

## Testing Requirements

You must include an exported collection of *Thunder Client* tests. You must include a test request for each API endpoint required above.

## Version Control

You must have at least 10 commits to your Git repository. Each commit must provide a comment that accurately (but briefly) describes the changes you made. You should commit often.

## Exceeding

To achieve an A grade in this homework, you must include the following in your submission:

- Persistent storage in a file. All data must be stored and retrieved from a file. You may not use a database in this assignment.
- Provide at least 3 additional routes that perform additional CRUD operations (i.e., update and delete) using the PUT and DELETE HTTP methods.
- Automatically generate at least 1000 users, posts, and comments data into your server using [Faker](https://fakerjs.dev).

Note, the previous requirements must be completed successfully and with high quality.
