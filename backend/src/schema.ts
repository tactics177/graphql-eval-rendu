import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    articles: [Article!]!
    comments: [Comment!]!
    likes: [Like!]!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    user: User!
    comments: [Comment]
    likes: [Like]
  }

  type Comment {
    id: ID!
    content: String!
    user: User!
    article: Article!
  }

  type Like {
    id: ID!
    user: User!
    article: Article!
  }

  type Query {
    users: [User]
    articles: [Article]
    article(id: ID!): Article
    comments: [Comment]
    likes: [Like]
    userArticles(userId: ID!): [Article]
    filteredArticles(authorUsername: String, orderByLikes: Boolean): [Article]
    searchUsernames(username: String!): [User]
  }

  type SignInResponse {
    code: Int!
    message: String!
    success: Boolean!
    token: String
    userId: ID
    username: String
    userEmail: String
  }

  type CreateUserResponse {
    code: Int!
    message: String!
    success: Boolean!
    user: User
  }

  type CreateArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    article: Article
  }

  type DeleteArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
  }

  type UpdateArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    article: Article
  }

  type LikeArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    like: Like
  }

  type CommentArticleResponse {
    code: Int!
    message: String!
    success: Boolean!
    comment: Comment
  }

  type DeleteCommentResponse {
    code: Int!
    message: String!
    success: Boolean!
  }

  type EditCommentResponse {
    code: Int!
    message: String!
    success: Boolean!
    comment: Comment
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      email: String!
    ): CreateUserResponse!
    signIn(username: String!, password: String!): SignInResponse!
    createArticle(
      title: String!
      content: String!
      userId: ID!
    ): CreateArticleResponse!
    deleteArticle(id: ID!): DeleteArticleResponse!
    updateArticle(
      id: ID!
      title: String!
      content: String!
    ): UpdateArticleResponse!
    likeArticle(articleId: ID!, userId: ID!): LikeArticleResponse!
    commentArticle(
      articleId: ID!
      userId: ID!
      content: String!
    ): CommentArticleResponse!
    deleteComment(id: ID!): DeleteCommentResponse!
    editComment(id: ID!, content: String!): EditCommentResponse!
  }
`;
