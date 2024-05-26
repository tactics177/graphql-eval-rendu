import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_USER_ARTICLES } from "../graphql/Queries";
import {
  DELETE_ARTICLE_MUTATION,
  UPDATE_ARTICLE_MUTATION,
} from "../graphql/Mutations";
import ArticleCard from "./ArticleCard";
import { Article } from "../graphql/generated";
import "bootstrap/dist/css/bootstrap.min.css";

const MyArticles: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const { loading, error, data, fetchMore } = useQuery(LOAD_USER_ARTICLES, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
  });
  const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION, {
    update(cache, { data: { deleteArticle } }) {
      const { userArticles } = cache.readQuery<{ userArticles: Article[] }>({
        query: LOAD_USER_ARTICLES,
        variables: { userId },
      })!;
      cache.writeQuery({
        query: LOAD_USER_ARTICLES,
        variables: { userId },
        data: {
          userArticles: userArticles.filter(
            (article) => article.id !== deleteArticle.id
          ),
        },
      });
    },
  });
  const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION, {
    update(cache, { data: { updateArticle } }) {
      const { userArticles } = cache.readQuery<{ userArticles: Article[] }>({
        query: LOAD_USER_ARTICLES,
        variables: { userId },
      })!;
      cache.writeQuery({
        query: LOAD_USER_ARTICLES,
        variables: { userId },
        data: {
          userArticles: userArticles.map((article) =>
            article.id === updateArticle.id ? updateArticle : article
          ),
        },
      });
    },
  });
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (data && data.userArticles.length < 10) {
      setHasMore(false);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    await deleteArticle({
      variables: { id },
      update: (cache) => {
        // Read the current data from the cache for the queried articles.
        const existingArticles = cache.readQuery<{ userArticles: Article[] }>({
          query: LOAD_USER_ARTICLES,
          variables: { userId },
        });

        // Filter out the deleted article.
        const newArticles = existingArticles?.userArticles.filter(
          (article) => article.id !== id
        );

        // Write the new data back to the cache.
        cache.writeQuery({
          query: LOAD_USER_ARTICLES,
          variables: { userId },
          data: { userArticles: newArticles },
        });

        // Optionally, update hasMore state if needed.
        if (newArticles && newArticles.length === 0) {
          setHasMore(false);
        }
      },
    });
  };

  const handleEdit = async (article: Article) => {
    await updateArticle({
      variables: {
        id: article.id,
        title: article.title,
        content: article.content,
      },
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (data && hasMore) {
        fetchMore({
          variables: {
            userId,
            offset: data.userArticles.length,
            limit: 10,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult || fetchMoreResult.userArticles.length === 0) {
              setHasMore(false);
              return prev;
            }
            // Ensure no duplicate articles are added
            const existingArticleIds = new Set(prev.userArticles.map((article: Article) => article.id));
            const newArticles = fetchMoreResult.userArticles.filter((article: Article) => !existingArticleIds.has(article.id));
            return {
              ...prev,
              userArticles: [...prev.userArticles, ...newArticles],
            };
          },
        });
      }
    }
  };
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, hasMore]);
  
  return (
    <div className="container mt-4">
      <h2>My Articles</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error! {error.message}</p>
      ) : (
        <div>
          {data.userArticles.map((article: Article) => (
            <div className="mb-3" key={article.id}>
              <ArticleCard
                article={article}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </div>
          ))}
          {hasMore && <p>Loading more articles...</p>}
        </div>
      )}
    </div>
  );
};

export default MyArticles;
