import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  title: Scalars['String']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  article: Article;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
};

export type CommentArticleResponse = {
  __typename?: 'CommentArticleResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateArticleResponse = {
  __typename?: 'CreateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeleteArticleResponse = {
  __typename?: 'DeleteArticleResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteCommentResponse = {
  __typename?: 'DeleteCommentResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type EditCommentResponse = {
  __typename?: 'EditCommentResponse';
  code: Scalars['Int']['output'];
  comment?: Maybe<Comment>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Like = {
  __typename?: 'Like';
  article: Article;
  id: Scalars['ID']['output'];
  user: User;
};

export type LikeArticleResponse = {
  __typename?: 'LikeArticleResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  commentArticle: CommentArticleResponse;
  createArticle: CreateArticleResponse;
  createUser: CreateUserResponse;
  deleteArticle: DeleteArticleResponse;
  deleteComment: DeleteCommentResponse;
  editComment: EditCommentResponse;
  likeArticle: LikeArticleResponse;
  signIn: SignInResponse;
  updateArticle: UpdateArticleResponse;
};


export type MutationCommentArticleArgs = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateArticleArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditCommentArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationLikeArticleArgs = {
  articleId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateArticleArgs = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles?: Maybe<Array<Maybe<Article>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  filteredArticles?: Maybe<Array<Maybe<Article>>>;
  likes?: Maybe<Array<Maybe<Like>>>;
  searchUsernames?: Maybe<Array<Maybe<User>>>;
  userArticles?: Maybe<Array<Maybe<Article>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryArticleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFilteredArticlesArgs = {
  authorUsername?: InputMaybe<Scalars['String']['input']>;
  orderByLikes?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySearchUsernamesArgs = {
  username: Scalars['String']['input'];
};


export type QueryUserArticlesArgs = {
  userId: Scalars['ID']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  userEmail?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UpdateArticleResponse = {
  __typename?: 'UpdateArticleResponse';
  article?: Maybe<Article>;
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  articles: Array<Article>;
  comments: Array<Comment>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likes: Array<Like>;
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateNewArticleMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;


export type CreateNewArticleMutation = { __typename?: 'Mutation', createArticle: { __typename?: 'CreateArticleResponse', code: number, message: string, success: boolean, article?: { __typename?: 'Article', id: string, title: string, content: string, user: { __typename?: 'User', id: string, username: string, email: string } } | null } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserResponse', code: number, message: string, success: boolean, user?: { __typename?: 'User', id: string, username: string, email: string } | null } };

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInResponse', code: number, message: string, success: boolean, token?: string | null, userId?: string | null, username?: string | null, userEmail?: string | null } };

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: { __typename?: 'DeleteArticleResponse', code: number, message: string, success: boolean } };

export type UpdateArticleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: { __typename?: 'UpdateArticleResponse', code: number, message: string, success: boolean, article?: { __typename?: 'Article', id: string, title: string, content: string } | null } };

export type LikeArticleMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  articleId: Scalars['ID']['input'];
}>;


export type LikeArticleMutation = { __typename?: 'Mutation', likeArticle: { __typename?: 'LikeArticleResponse', code: number, message: string, success: boolean, like?: { __typename?: 'Like', id: string, user: { __typename?: 'User', id: string, username: string, email: string }, article: { __typename?: 'Article', id: string, title: string, content: string, user: { __typename?: 'User', id: string, username: string, email: string } } } | null } };

export type CommentArticleMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type CommentArticleMutation = { __typename?: 'Mutation', commentArticle: { __typename?: 'CommentArticleResponse', code: number, message: string, success: boolean, comment?: { __typename?: 'Comment', id: string, content: string, user: { __typename?: 'User', id: string, username: string, email: string }, article: { __typename?: 'Article', id: string, title: string, content: string, user: { __typename?: 'User', id: string, username: string, email: string } } } | null } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'DeleteCommentResponse', code: number, message: string, success: boolean } };

export type EditCommentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  content: Scalars['String']['input'];
}>;


export type EditCommentMutation = { __typename?: 'Mutation', editComment: { __typename?: 'EditCommentResponse', code: number, message: string, success: boolean, comment?: { __typename?: 'Comment', id: string, content: string, user: { __typename?: 'User', id: string, username: string, email: string }, article: { __typename?: 'Article', id: string, title: string, content: string, user: { __typename?: 'User', id: string, username: string, email: string } } } | null } };

export type ArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename?: 'Query', articles?: Array<{ __typename?: 'Article', id: string, title: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, username: string }, comments?: Array<{ __typename?: 'Comment', id: string, content: string, user: { __typename?: 'User', id: string, username: string } } | null> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', id: string, username: string } } | null> | null } | null> | null };

export type ArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', id: string, title: string, content: string, user: { __typename?: 'User', id: string, username: string }, comments?: Array<{ __typename?: 'Comment', id: string, content: string, user: { __typename?: 'User', id: string, username: string } } | null> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', id: string, username: string } } | null> | null } | null };

export type UserArticlesQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type UserArticlesQuery = { __typename?: 'Query', userArticles?: Array<{ __typename?: 'Article', id: string, title: string, content: string, user: { __typename?: 'User', id: string, username: string }, comments?: Array<{ __typename?: 'Comment', id: string, content: string } | null> | null, likes?: Array<{ __typename?: 'Like', id: string } | null> | null } | null> | null };

export type GetFilteredArticlesQueryVariables = Exact<{
  authorUsername?: InputMaybe<Scalars['String']['input']>;
  orderByLikes?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetFilteredArticlesQuery = { __typename?: 'Query', filteredArticles?: Array<{ __typename?: 'Article', id: string, title: string, content: string, createdAt: string, user: { __typename?: 'User', id: string, username: string }, comments?: Array<{ __typename?: 'Comment', id: string, content: string, user: { __typename?: 'User', id: string, username: string } } | null> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', id: string, username: string } } | null> | null } | null> | null };

export type SearchUsernamesQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type SearchUsernamesQuery = { __typename?: 'Query', searchUsernames?: Array<{ __typename?: 'User', id: string, username: string } | null> | null };


export const CreateNewArticleDocument = gql`
    mutation CreateNewArticle($title: String!, $content: String!, $userId: ID!) {
  createArticle(title: $title, content: $content, userId: $userId) {
    code
    message
    success
    article {
      id
      title
      content
      user {
        id
        username
        email
      }
    }
  }
}
    `;
export type CreateNewArticleMutationFn = Apollo.MutationFunction<CreateNewArticleMutation, CreateNewArticleMutationVariables>;

/**
 * __useCreateNewArticleMutation__
 *
 * To run a mutation, you first call `useCreateNewArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewArticleMutation, { data, loading, error }] = useCreateNewArticleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateNewArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewArticleMutation, CreateNewArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewArticleMutation, CreateNewArticleMutationVariables>(CreateNewArticleDocument, options);
      }
export type CreateNewArticleMutationHookResult = ReturnType<typeof useCreateNewArticleMutation>;
export type CreateNewArticleMutationResult = Apollo.MutationResult<CreateNewArticleMutation>;
export type CreateNewArticleMutationOptions = Apollo.BaseMutationOptions<CreateNewArticleMutation, CreateNewArticleMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!, $email: String!) {
  createUser(username: $username, password: $password, email: $email) {
    code
    message
    success
    user {
      id
      username
      email
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    code
    message
    success
    token
    userId
    username
    userEmail
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($id: ID!) {
  deleteArticle(id: $id) {
    code
    message
    success
  }
}
    `;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const UpdateArticleDocument = gql`
    mutation UpdateArticle($id: ID!, $title: String!, $content: String!) {
  updateArticle(id: $id, title: $title, content: $content) {
    code
    message
    success
    article {
      id
      title
      content
    }
  }
}
    `;
export type UpdateArticleMutationFn = Apollo.MutationFunction<UpdateArticleMutation, UpdateArticleMutationVariables>;

/**
 * __useUpdateArticleMutation__
 *
 * To run a mutation, you first call `useUpdateArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateArticleMutation, { data, loading, error }] = useUpdateArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateArticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateArticleMutation, UpdateArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateArticleMutation, UpdateArticleMutationVariables>(UpdateArticleDocument, options);
      }
export type UpdateArticleMutationHookResult = ReturnType<typeof useUpdateArticleMutation>;
export type UpdateArticleMutationResult = Apollo.MutationResult<UpdateArticleMutation>;
export type UpdateArticleMutationOptions = Apollo.BaseMutationOptions<UpdateArticleMutation, UpdateArticleMutationVariables>;
export const LikeArticleDocument = gql`
    mutation LikeArticle($userId: ID!, $articleId: ID!) {
  likeArticle(userId: $userId, articleId: $articleId) {
    code
    message
    success
    like {
      id
      user {
        id
        username
        email
      }
      article {
        id
        title
        content
        user {
          id
          username
          email
        }
      }
    }
  }
}
    `;
export type LikeArticleMutationFn = Apollo.MutationFunction<LikeArticleMutation, LikeArticleMutationVariables>;

/**
 * __useLikeArticleMutation__
 *
 * To run a mutation, you first call `useLikeArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeArticleMutation, { data, loading, error }] = useLikeArticleMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useLikeArticleMutation(baseOptions?: Apollo.MutationHookOptions<LikeArticleMutation, LikeArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeArticleMutation, LikeArticleMutationVariables>(LikeArticleDocument, options);
      }
export type LikeArticleMutationHookResult = ReturnType<typeof useLikeArticleMutation>;
export type LikeArticleMutationResult = Apollo.MutationResult<LikeArticleMutation>;
export type LikeArticleMutationOptions = Apollo.BaseMutationOptions<LikeArticleMutation, LikeArticleMutationVariables>;
export const CommentArticleDocument = gql`
    mutation CommentArticle($userId: ID!, $articleId: ID!, $content: String!) {
  commentArticle(userId: $userId, articleId: $articleId, content: $content) {
    code
    message
    success
    comment {
      id
      content
      user {
        id
        username
        email
      }
      article {
        id
        title
        content
        user {
          id
          username
          email
        }
      }
    }
  }
}
    `;
export type CommentArticleMutationFn = Apollo.MutationFunction<CommentArticleMutation, CommentArticleMutationVariables>;

/**
 * __useCommentArticleMutation__
 *
 * To run a mutation, you first call `useCommentArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentArticleMutation, { data, loading, error }] = useCommentArticleMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      articleId: // value for 'articleId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCommentArticleMutation(baseOptions?: Apollo.MutationHookOptions<CommentArticleMutation, CommentArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentArticleMutation, CommentArticleMutationVariables>(CommentArticleDocument, options);
      }
export type CommentArticleMutationHookResult = ReturnType<typeof useCommentArticleMutation>;
export type CommentArticleMutationResult = Apollo.MutationResult<CommentArticleMutation>;
export type CommentArticleMutationOptions = Apollo.BaseMutationOptions<CommentArticleMutation, CommentArticleMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: ID!) {
  deleteComment(id: $id) {
    code
    message
    success
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($id: ID!, $content: String!) {
  editComment(id: $id, content: $content) {
    code
    message
    success
    comment {
      id
      content
      user {
        id
        username
        email
      }
      article {
        id
        title
        content
        user {
          id
          username
          email
        }
      }
    }
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const ArticlesDocument = gql`
    query Articles {
  articles {
    id
    title
    content
    createdAt
    user {
      id
      username
    }
    comments {
      id
      content
      user {
        id
        username
      }
    }
    likes {
      id
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export function useArticlesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesSuspenseQueryHookResult = ReturnType<typeof useArticlesSuspenseQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const ArticleDocument = gql`
    query Article($id: ID!) {
  article(id: $id) {
    id
    title
    content
    user {
      id
      username
    }
    comments {
      id
      content
      user {
        id
        username
      }
    }
    likes {
      id
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useArticleQuery__
 *
 * To run a query within a React component, call `useArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArticleQuery(baseOptions: Apollo.QueryHookOptions<ArticleQuery, ArticleQueryVariables> & ({ variables: ArticleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
      }
export function useArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export function useArticleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArticleQuery, ArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArticleQuery, ArticleQueryVariables>(ArticleDocument, options);
        }
export type ArticleQueryHookResult = ReturnType<typeof useArticleQuery>;
export type ArticleLazyQueryHookResult = ReturnType<typeof useArticleLazyQuery>;
export type ArticleSuspenseQueryHookResult = ReturnType<typeof useArticleSuspenseQuery>;
export type ArticleQueryResult = Apollo.QueryResult<ArticleQuery, ArticleQueryVariables>;
export const UserArticlesDocument = gql`
    query UserArticles($userId: ID!) {
  userArticles(userId: $userId) {
    id
    title
    content
    user {
      id
      username
    }
    comments {
      id
      content
    }
    likes {
      id
    }
  }
}
    `;

/**
 * __useUserArticlesQuery__
 *
 * To run a query within a React component, call `useUserArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserArticlesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserArticlesQuery(baseOptions: Apollo.QueryHookOptions<UserArticlesQuery, UserArticlesQueryVariables> & ({ variables: UserArticlesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserArticlesQuery, UserArticlesQueryVariables>(UserArticlesDocument, options);
      }
export function useUserArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserArticlesQuery, UserArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserArticlesQuery, UserArticlesQueryVariables>(UserArticlesDocument, options);
        }
export function useUserArticlesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserArticlesQuery, UserArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserArticlesQuery, UserArticlesQueryVariables>(UserArticlesDocument, options);
        }
export type UserArticlesQueryHookResult = ReturnType<typeof useUserArticlesQuery>;
export type UserArticlesLazyQueryHookResult = ReturnType<typeof useUserArticlesLazyQuery>;
export type UserArticlesSuspenseQueryHookResult = ReturnType<typeof useUserArticlesSuspenseQuery>;
export type UserArticlesQueryResult = Apollo.QueryResult<UserArticlesQuery, UserArticlesQueryVariables>;
export const GetFilteredArticlesDocument = gql`
    query GetFilteredArticles($authorUsername: String, $orderByLikes: Boolean) {
  filteredArticles(authorUsername: $authorUsername, orderByLikes: $orderByLikes) {
    id
    title
    content
    createdAt
    user {
      id
      username
    }
    comments {
      id
      content
      user {
        id
        username
      }
    }
    likes {
      id
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetFilteredArticlesQuery__
 *
 * To run a query within a React component, call `useGetFilteredArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredArticlesQuery({
 *   variables: {
 *      authorUsername: // value for 'authorUsername'
 *      orderByLikes: // value for 'orderByLikes'
 *   },
 * });
 */
export function useGetFilteredArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetFilteredArticlesQuery, GetFilteredArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilteredArticlesQuery, GetFilteredArticlesQueryVariables>(GetFilteredArticlesDocument, options);
      }
export function useGetFilteredArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilteredArticlesQuery, GetFilteredArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilteredArticlesQuery, GetFilteredArticlesQueryVariables>(GetFilteredArticlesDocument, options);
        }
export function useGetFilteredArticlesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFilteredArticlesQuery, GetFilteredArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilteredArticlesQuery, GetFilteredArticlesQueryVariables>(GetFilteredArticlesDocument, options);
        }
export type GetFilteredArticlesQueryHookResult = ReturnType<typeof useGetFilteredArticlesQuery>;
export type GetFilteredArticlesLazyQueryHookResult = ReturnType<typeof useGetFilteredArticlesLazyQuery>;
export type GetFilteredArticlesSuspenseQueryHookResult = ReturnType<typeof useGetFilteredArticlesSuspenseQuery>;
export type GetFilteredArticlesQueryResult = Apollo.QueryResult<GetFilteredArticlesQuery, GetFilteredArticlesQueryVariables>;
export const SearchUsernamesDocument = gql`
    query SearchUsernames($username: String!) {
  searchUsernames(username: $username) {
    id
    username
  }
}
    `;

/**
 * __useSearchUsernamesQuery__
 *
 * To run a query within a React component, call `useSearchUsernamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsernamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsernamesQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSearchUsernamesQuery(baseOptions: Apollo.QueryHookOptions<SearchUsernamesQuery, SearchUsernamesQueryVariables> & ({ variables: SearchUsernamesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsernamesQuery, SearchUsernamesQueryVariables>(SearchUsernamesDocument, options);
      }
export function useSearchUsernamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsernamesQuery, SearchUsernamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsernamesQuery, SearchUsernamesQueryVariables>(SearchUsernamesDocument, options);
        }
export function useSearchUsernamesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchUsernamesQuery, SearchUsernamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchUsernamesQuery, SearchUsernamesQueryVariables>(SearchUsernamesDocument, options);
        }
export type SearchUsernamesQueryHookResult = ReturnType<typeof useSearchUsernamesQuery>;
export type SearchUsernamesLazyQueryHookResult = ReturnType<typeof useSearchUsernamesLazyQuery>;
export type SearchUsernamesSuspenseQueryHookResult = ReturnType<typeof useSearchUsernamesSuspenseQuery>;
export type SearchUsernamesQueryResult = Apollo.QueryResult<SearchUsernamesQuery, SearchUsernamesQueryVariables>;