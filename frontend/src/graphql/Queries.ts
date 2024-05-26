import { gql } from "@apollo/client";

export const LOAD_ARTICLES = gql`
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

export const LOAD_ARTICLE = gql`
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

export const LOAD_USER_ARTICLES = gql`
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

export const LOAD_FILTERED_ARTICLES = gql`
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

export const SEARCH_USERNAMES = gql`
  query SearchUsernames($username: String!) {
    searchUsernames(username: $username) {
      id
      username
    }
  }
`;

