import { MutationResolvers, Comment } from "../../types.js";

export const commentArticle: MutationResolvers['commentArticle'] = async (_, { articleId, userId, content }, { dataSources, user }) => {
    if (!user) {
        throw new Error('You must be logged in to comment on articles');
      }
    try {
        const comment = await dataSources.db.comment.create({
            data: {
                content,
                articleId,
                userId,
            },
            include: {
                user: true,
                article: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        const commentResponse: Comment = {
            id: comment.id,
            content: comment.content,
            user: {
                id: comment.userId,
                username: comment.user.username,
                email: comment.user.email,
                password: "",
                articles: [],
                comments: [],
                likes: [],
            },
            article: {
                id: comment.articleId,
                title: comment.article.title,
                content: comment.article.content,
                createdAt: comment.article.createdAt.toISOString(),
                user: {
                    id: comment.article.userId,
                    username: comment.article.user.username,
                    email: comment.article.user.email,
                    password: "",
                    articles: [],
                    comments: [],
                    likes: [],
                },
                comments: [],
                likes: [],
            },
        };

        return {
            code: 200,
            message: 'Comment created successfully',
            success: true,
            comment: commentResponse,
        };
    } catch (e) {
        console.error(e);
        return {
            code: 400,
            message: 'Comment creation failed',
            success: false,
        };
    }
}