import { MutationResolvers, Comment } from "../../types.js";

export const deleteComment: MutationResolvers['deleteComment'] = async (_, { id }, { dataSources, user }) => {
    if (!user) {
        throw new Error('You must be logged in to delete your comment');
    }

    try {
        // Fetch the comment to check its owner
        const comment = await dataSources.db.comment.findUnique({
            where: {
                id: id,
            },
        });

        if (!comment) {
            throw new Error('Comment not found');
        }

        if (comment.userId !== user.id) {
            throw new Error('You are not authorized to delete this comment');
        }

        // Proceed with deletion if user is authorized
        await dataSources.db.comment.delete({
            where: {
                id: id,
            },
        });

        return {
            code: 200,
            message: 'Comment deleted successfully',
            success: true,
        };
    } catch (e) {
        console.error(e);
        return {
            code: 400,
            message: 'Comment has not been deleted',
            success: false,
        };
    }
};
