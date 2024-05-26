import { MutationResolvers, Like } from "../../types.js";

export const likeArticle: MutationResolvers['likeArticle'] = async (_, { articleId, userId }, { dataSources, user }) => {
    if (!user) {
        throw new Error('You must be logged in to like or unlike articles');
    }
    try {
        // Check if the like already exists
        const existingLike = await dataSources.db.like.findFirst({
            where: {
                userId,
                articleId,
            },
            include: {
                user: true, // Ensure that the user is included
                article: {
                    include: {
                        user: true, // Ensure that the article's user is included
                    }
                }
            },
        });

        if (existingLike) {
            // Unlike the article by deleting the existing like
            await dataSources.db.like.delete({
                where: { id: existingLike.id },
            });

            const unlikeResponse: Like = {
                id: existingLike.id,
                user: {
                    id: existingLike.userId,
                    username: existingLike.user.username,
                    email: existingLike.user.email,
                    password: "",
                    articles: [],
                    comments: [],
                    likes: [],
                },
                article: {
                    id: existingLike.articleId,
                    title: existingLike.article.title,
                    content: existingLike.article.content,
                    createdAt: existingLike.article.createdAt.toISOString(),
                    user: {
                        id: existingLike.article.userId,
                        username: existingLike.article.user.username,
                        email: existingLike.article.user.email,
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
                message: 'Article has been unliked',
                success: true,
                like: unlikeResponse,
            };
        }

        // Create a new like
        const createdLike = await dataSources.db.like.create({
            data: {
                userId,
                articleId,
            },
            include: {
                user: true, // Ensure that the user is included
                article: {
                    include: {
                        user: true, // Ensure that the article's user is included
                    }
                }
            },
        });

        const like: Like = {
            id: createdLike.id,
            user: {
                id: createdLike.user.id,
                username: createdLike.user.username,
                email: createdLike.user.email,
                password: "", // Typically you wouldn't include passwords like this
                articles: [], // Assuming you're not loading related articles here
                comments: [],
                likes: [],
            },
            article: {
                id: createdLike.article.id,
                title: createdLike.article.title,
                content: createdLike.article.content,
                createdAt: createdLike.article.createdAt.toISOString(),
                user: {
                    id: createdLike.article.user.id,
                    username: createdLike.article.user.username,
                    email: createdLike.article.user.email,
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
            code: 201,
            message: 'Article has been liked',
            success: true,
            like: like,
        };
    } catch (e) {
        console.error(e);
        return {
            code: 403,
            message: 'Article has not been liked',
            success: false,
            like: null,
        };
    }
};
