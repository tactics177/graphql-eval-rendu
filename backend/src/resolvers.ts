import { PrismaClient, Prisma, Like, Comment } from "@prisma/client";
import { createUser } from "./mutations/user/createUser.js";
import { signIn } from "./mutations/user/signIn.js";
import { createArticle } from "./mutations/article/createArticle.js";
import { Article } from "./types.js";
import { deleteArticle } from "./mutations/article/deleteArticle.js";
import { updateArticle } from "./mutations/article/updateArticle.js";
import { likeArticle } from "./mutations/likes/likeArticle.js";
import { commentArticle } from "./mutations/comments/commentArticle.js";
import { deleteComment } from "./mutations/comments/deleteComment.js";
import { editComment } from "./mutations/comments/editComment.js";
import { Context } from "./context.js";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    articles: () => {
      return prisma.article.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
          comments: {
            include: { user: true },
          },
          likes: {
            include: { user: true },
          },
        },
      });
    },
    article: (_: {}, { id }: { id: string }) => {
      return prisma.article.findUnique({
        where: {
          id: id,
        },
        include: {
          user: true,
          comments: {
            include: { user: true },
          },
          likes: {
            include: { user: true },
          },
        },
      });
    },
    comments: () => prisma.comment.findMany(),
    likes: () => prisma.like.findMany(),
    userArticles: (_: {}, { userId }: { userId: string }, { user }: Context) => {
      // console.log('User:', user);
      // console.log('User ID:', userId);
      if (!user) {
        throw new Error('You must be logged in to view your articles');
      }
      return prisma.article.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true,
          comments: true,
          likes: true,
        },
      });
    },
    filteredArticles: async (
      _: {},
      { authorUsername, orderByLikes }: { authorUsername?: string; orderByLikes?: boolean },
      { user }: Context
    ) => {
      if (!user) {
        throw new Error('You must be logged in to view articles');
      }

      let where: Prisma.ArticleWhereInput = {};
      let orderBy: Prisma.ArticleOrderByWithRelationInput = {};

      if (authorUsername) {
        const author = await prisma.user.findUnique({
          where: { username: authorUsername },
        });
        if (!author) {
          // Return an empty array if no author is found
          return [];
        }
        where.userId = author.id;
      }

      if (orderByLikes) {
        orderBy.likes = { _count: 'desc' };
      }

      return prisma.article.findMany({
        where,
        orderBy,
        include: {
          user: true,
          comments: {
            include: { user: true },
          },
          likes: {
            include: { user: true },
          },
        },
      });
    },
    searchUsernames: (_: {}, { username }: { username: string }) => {
      return prisma.user.findMany({
        where: {
          username: {
            contains: username,
          },
        },
      });
    },
  },
  Mutation: {
    createUser,
    signIn,
    createArticle,
    deleteArticle,
    updateArticle,
    likeArticle,
    commentArticle,
    deleteComment,
    editComment
  },
  Article: {
    user: (article: Article) => {
      return prisma.user.findUnique({
        where: {
          id: article.user.id,
        },
      });
    },
    comments: (article: Article) => {
      return prisma.comment.findMany({
        where: {
          articleId: article.id,
        },
      });
    },
    likes: (article: Article) => {
      return prisma.like.findMany({
        where: {
          articleId: article.id,
        },
      });
    },
  },
  Comment: {
    user: (comment: Comment) => {
      return prisma.user.findFirst({
        where: {
          id: comment.userId,
        },
      });
    },
  },
  Like: {
    user: (like: Like) => {
      return prisma.user.findFirst({
        where: {
          id: like.userId,
        },
      });
    },
  },
};
