import { MutationResolvers, Article } from "../../types.js";

export const createArticle: MutationResolvers['createArticle'] = async (_, { title, content, userId }, { dataSources, user }) => {
    if (!user) {
        throw new Error('You must be logged in to create articles');
    }
    try {
        const createdArticle = await dataSources.db.article.create({
            data: {
                title,
                content,
                userId,
            }
        })

        const article: Article = {
            id: createdArticle.id,
            title: createdArticle.title,
            content: createdArticle.content,
            createdAt: createdArticle.createdAt.toISOString(),
            user: {
                id: createdArticle.userId,
                articles: [],
                comments: [],
                email: "",
                likes: [],
                password: "",
                username: ""
            },
            comments: [],
            likes: [],
        };

        return {
            code: 201,
            message: 'Article has been created',
            success: true,
            article: article,
        }
    } catch (e) {
        return {
            code: 403,
            message: 'Article has not been created',
            success: false,
            article: null,
        }
    }
}