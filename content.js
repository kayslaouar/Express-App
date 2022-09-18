export class User {
    constructor(userId, username) {
        this.userId = userId;
        this.username = username;
    }
}

export class Post {
    constructor(postId, userId, username, content) {
        this.postId = postId;
        this.userId = userId;
        this.username = username;
        this.content = content;
    }
}

export class Comment {
    constructor(commentId, postId, userId, username, content) {
        this.commentId = commentId;
        this.postId = postId;
        this.userId = userId;
        this.username = username;
        this.content = content;
    }
}