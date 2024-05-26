import { MutationResolvers, Comment } from "../../types.js";

export const editComment: MutationResolvers['editComment'] = async (_, { id, content }, { dataSources, user }) => {
    if (!user) {
        throw new Error('You must be logged in to edit comments');
      }
    try {
        const comment = await dataSources.db.comment.findUnique({
            where: {
                id: id,
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

        if (!comment) {
            return {
                code: 400,
                message: 'Comment not found',
                success: false,
                comment: null,
            };
        }

        if (comment.userId !== user.id) {
            return {
                code: 401,
                message: 'You are not authorized to edit this comment',
                success: false,
                comment: null,
            };
        }

        const updatedComment = await dataSources.db.comment.update({
            where: {
                id: id,
            },
            data: {
                content,
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
            id: updatedComment.id,
            content: updatedComment.content,
            user: {
                id: updatedComment.userId,
                username: updatedComment.user.username,
                email: updatedComment.user.email,
                password: "",
                articles: [],
                comments: [],
                likes: [],
            },
            article: {
                id: updatedComment.articleId,
                title: updatedComment.article.title,
                content: updatedComment.article.content,
                createdAt: updatedComment.article.createdAt.toISOString(),
                user: {
                    id: updatedComment.article.userId,
                    username: updatedComment.article.user.username,
                    email: updatedComment.article.user.email,
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
            message: 'Comment updated successfully',
            success: true,
            comment: commentResponse,
        };
    } catch (e) {
        return {
            code: 500,
            message: 'An error occurred while updating the comment',
            success: false,
            comment: null,
        };
    }
}