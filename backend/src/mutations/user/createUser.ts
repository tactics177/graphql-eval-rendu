import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers, User } from "../../types.js";

export const createUser: MutationResolvers['createUser'] = async (_, { username, password, email }, { dataSources }) => {
    try {
        const createdUser = await dataSources.db.user.create({
            data: {
                username,
                password: await hashPassword(password),
                email,
            }
        })

        const user: User = {
            id: createdUser.id,
            username: createdUser.username,
            password: createdUser.password,
            email: createdUser.email,
            articles: [],
            comments: [],
            likes: [],
        };

        return {
            code: 201,
            message: 'User has been created',
            success: true,
            user: user,
        }
    } catch (e) {
        return {
            code: 403,
            message: 'User has not been created',
            success: false,
            user: null,
        }
    }
}