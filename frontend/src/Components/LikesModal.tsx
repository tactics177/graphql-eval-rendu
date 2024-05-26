import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { Article } from "../graphql/generated";

interface LikesModalProps {
  show: boolean;
  onHide: () => void;
  article: Article | null;
}

const LikesModal: React.FC<LikesModalProps> = ({ show, onHide, article }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {article?.likes && article.likes.length > 0 ? (
          <ListGroup>
            {article.likes.map(
              (like) =>
                like && (
                  <ListGroup.Item key={like.id} className="d-flex align-items-center">
                    <div className="me-2">
                      <img
                        src={`https://www.gravatar.com/avatar/${like.user.id}?d=identicon`}
                        alt={`${like.user.username}'s avatar`}
                        className="rounded-circle"
                        width="30"
                        height="30"
                      />
                    </div>
                    <div>{like.user.username}</div>
                  </ListGroup.Item>
                )
            )}
          </ListGroup>
        ) : (
          <p>No likes yet.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LikesModal;
