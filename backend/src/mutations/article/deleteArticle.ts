import { MutationResolvers } from "../../types.js";

export const deleteArticle: MutationResolvers['deleteArticle'] = async (_, { id }, { dataSources, user }) => {
    if (!user) {
        throw new Error('You must be logged in to delete your articles');
    }
    console.log('id', id)
    try {
        // Delete related comments
        await dataSources.db.comment.deleteMany({
            where: {
                articleId: id,
            },
        });

        // Delete related likes
        await dataSources.db.like.deleteMany({
            where: {
                articleId: id,
            },
        });

        // Delete the article
        await dataSources.db.article.delete({
            where: {
                id,
            },
        });

        return {
            code: 204,
            message: 'Article and its related comments and likes have been deleted',
            success: true,
        }
    } catch (e) {
        return {
            code: 403,
            message: 'Article has not been deleted',
            success: false,
        }
    }
}
