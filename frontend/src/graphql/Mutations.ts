import { gql } from "@apollo/client";

export const CREATE_ARTICLE_MUTATION = gql`
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

export const CREATE_USER_MUTATION = gql`
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

export const SIGN_IN_MUTATION = gql`
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

export const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      code
      message
      success
    }
  }
`;

export const UPDATE_ARTICLE_MUTATION = gql`
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

export const LIKE_ARTICLE_MUTATION = gql`
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

export const CREATE_COMMENT_MUTATION = gql`
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

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      code
      message
      success
    }
  }
`;

export const EDIT_COMMENT_MUTATION = gql`
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
