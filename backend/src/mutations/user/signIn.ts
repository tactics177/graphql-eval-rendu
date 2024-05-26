import { comparePassword, createJWT } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const signIn: MutationResolvers['signIn'] = async (_, {password, username}, {dataSources}) => {
  try {
    const user = await dataSources.db.user.findUniqueOrThrow({where: {username}});
    const isValidPassword = await comparePassword(password, user.password)

    if(!isValidPassword) throw new Error('Invalid password provided');

    const token = createJWT(user);

    return {
      code: 200,
      message: 'User has been signed',
      success: true,
      token,
      userId: user.id,
      username: user.username,
      userEmail: user.email
    }
  } catch(e) {
    console.log(`${(e as Error)?.message}`)
    return {
      code: 403,
      message: 'Something wrong happened',
      success: false,
      token: null
    }
  }
}