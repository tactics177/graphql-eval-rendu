import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComments } from "@fortawesome/free-solid-svg-icons";
import { Article } from "../graphql/generated";

interface ArticleCardProps {
  article: Article;
  handleLikesClick: (article: Article) => void;
  handleCommentsClick: (article: Article) => void;
  handleLike: (articleId: string) => void;
}

const ArticleCardHome: React.FC<ArticleCardProps> = ({
  article,
  handleLikesClick,
  handleCommentsClick,
  handleLike,
}) => {
  const userId = localStorage.getItem("userId");

  const isLikedByUser = article.likes && article.likes.some((like) => like && like.user.id === userId);

  // Convert the timestamp to a readable date and time format
  const createdAt = new Date(parseInt(article.createdAt));
  const formattedDate = createdAt.toLocaleDateString();
  const formattedTime = createdAt.toLocaleTimeString();

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <img
            src={`https://www.gravatar.com/avatar/${article.user.id}?d=identicon`}
            alt={`${article.user.username}'s avatar`}
            className="rounded-circle me-2"
            width="50"
            height="50"
          />
          <div>
            <Card.Title className="mb-0">{article.title}</Card.Title>
            <Card.Text className="text-muted mb-0">
              <small>
                By {article.user.username} on {formattedDate} at {formattedTime}
              </small>
            </Card.Text>
          </div>
        </div>
        <Card.Text>{article.content}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center">
            <Button
              variant="link"
              onClick={() => handleLike(article.id)}
              className="text-decoration-none p-0"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={isLikedByUser ? "text-danger" : "text-muted"}
              />
            </Button>
            <Button
              variant="link"
              onClick={() => handleLikesClick(article)}
              className="text-decoration-none p-0 ms-2"
            >
              {article.likes ? article.likes.length : 0} likes
            </Button>
          </div>
          <Button
            variant="link"
            onClick={() => handleCommentsClick(article)}
            className="text-decoration-none d-flex align-items-center p-0"
          >
            <FontAwesomeIcon icon={faComments} className="me-2" />
            {article.comments ? article.comments.length : 0} comments
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ArticleCardHome;
