import { MutationResolvers, Article } from "../../types.js";

export const updateArticle: MutationResolvers['updateArticle'] = async (_, { id, title, content }, { dataSources, user }) => {
    if (!user) {
        throw new Error('You must be logged in to update articles');
    }
    try {
        const updatedArticle = await dataSources.db.article.update({
            where: {
                id,
            },
            data: {
                title,
                content,
            }
        })

        const article: Article = {
            id: updatedArticle.id,
            title: updatedArticle.title,
            content: updatedArticle.content,
            createdAt: updatedArticle.createdAt.toISOString(),
            user: {
                id: updatedArticle.userId,
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
            code: 200,
            message: 'Article has been updated',
            success: true,
            article: article,
        }
    } catch (e) {
        return {
            code: 403,
            message: 'Article has not been updated',
            success: false,
            article: null,
        }
    }
}
