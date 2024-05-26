import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditArticleModal from './EditArticleModal';
import { Article } from '../graphql/generated';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ArticleCardProps {
  article: Article;
  handleDelete: (id: string) => void;
  handleEdit: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, handleDelete, handleEdit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card className="shadow-sm mb-3">
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">By {article.user.username}</Card.Subtitle>
          <Card.Text>{article.content}</Card.Text>
          <div className="d-flex justify-content-between">
            <div>
              <Button variant="outline-primary" size="sm" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDelete(article.id)}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </div>
            <div>
              <small className="text-muted">{article.comments ? article.comments.length : 0} comments</small>
              <small className="text-muted ms-3">{article.likes?.length ?? 0} likes</small>
            </div>
          </div>
        </Card.Body>
      </Card>
      <EditArticleModal
        show={showModal}
        handleClose={handleCloseModal}
        article={article}
        handleSave={handleEdit}
      />
    </>
  );
};

export default ArticleCard;
