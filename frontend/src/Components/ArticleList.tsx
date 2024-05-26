import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Article } from "../graphql/generated";
import { LOAD_ARTICLES } from "../graphql/Queries";
import { LIKE_ARTICLE_MUTATION } from "../graphql/Mutations";
import ArticleCardHome from "./ArticleCardHome";
import LikesModal from "./LikesModal";
import CommentsModal from "./CommentsModal";
import FilterSection from "./FilterSection";
import { Button } from "react-bootstrap";

const ArticleList: React.FC = () => {
  const { loading, error, data, fetchMore, refetch } = useQuery(LOAD_ARTICLES);
  const [hasMore, setHasMore] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const userId = localStorage.getItem("userId");

  const [likeArticle] = useMutation(LIKE_ARTICLE_MUTATION, {
    refetchQueries: [{ query: LOAD_ARTICLES }],
  });

  useEffect(() => {
    if (data && data.articles.length < 10) {
      setHasMore(false);
    }
  }, [data]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (data && hasMore && !isFiltered) {
        fetchMore({
          variables: {
            offset: data.articles.length,
            limit: 10,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult || fetchMoreResult.articles.length === 0) {
              setHasMore(false);
              return prev;
            }
            const existingArticleIds = new Set(
              prev.articles.map((article: Article) => article.id)
            );
            const newArticles = fetchMoreResult.articles.filter(
              (article: Article) => !existingArticleIds.has(article.id)
            );
            return {
              ...prev,
              articles: [...prev.articles, ...newArticles],
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
  }, [data, hasMore, isFiltered]);

  const handleLikesClick = (article: Article) => {
    setSelectedArticle(article);
    setShowLikesModal(true);
  };

  const handleCommentsClick = (article: Article) => {
    setSelectedArticle(article);
    setShowCommentsModal(true);
  };

  const handleLike = async (articleId: string) => {
    try {
      await likeArticle({
        variables: {
          userId,
          articleId,
        },
      });
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const handleClearFilter = () => {
    setIsFiltered(false);
    setFilteredArticles([]);
    refetch();
  };

  const articlesToDisplay = isFiltered ? filteredArticles : data?.articles;

  return (
    <div className="mt-3">
      <FilterSection setFilteredArticles={setFilteredArticles} setIsFiltered={setIsFiltered} />
      {isFiltered && (
        <Button variant="secondary" onClick={handleClearFilter} className="mb-3">
          Clear Filters
        </Button>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading articles: {error.message}</p>
      ) : (
        articlesToDisplay && articlesToDisplay.map((article: Article) => (
          <ArticleCardHome
            key={article.id}
            article={article}
            handleLikesClick={handleLikesClick}
            handleCommentsClick={handleCommentsClick}
            handleLike={handleLike}
          />
        ))
      )}
      <LikesModal
        show={showLikesModal}
        onHide={() => setShowLikesModal(false)}
        article={selectedArticle}
      />
      <CommentsModal
        show={showCommentsModal}
        onHide={() => setShowCommentsModal(false)}
        article={selectedArticle}
      />
    </div>
  );
};

export default ArticleList;
