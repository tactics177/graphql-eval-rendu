import React, { useState } from "react";
import { Modal, Button, Form, ListGroup, InputGroup } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { Article, Comment } from "../graphql/generated";
import {
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  EDIT_COMMENT_MUTATION,
} from "../graphql/Mutations";
import { LOAD_ARTICLE } from "../graphql/Queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPaperPlane, faSave } from "@fortawesome/free-solid-svg-icons";

interface CommentsModalProps {
  show: boolean;
  onHide: () => void;
  article: Article | null;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  show,
  onHide,
  article,
}) => {
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const userId = localStorage.getItem("userId");

  const { data, loading, error } = useQuery(LOAD_ARTICLE, {
    variables: { id: article?.id },
    skip: !article?.id, // Skip query execution if article id is not provided
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: LOAD_ARTICLE, variables: { id: article?.id } }],
  });

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    refetchQueries: [{ query: LOAD_ARTICLE, variables: { id: article?.id } }],
  });

  const [editComment] = useMutation(EDIT_COMMENT_MUTATION, {
    refetchQueries: [{ query: LOAD_ARTICLE, variables: { id: article?.id } }],
  });

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (article && newComment.trim() !== "") {
      try {
        await createComment({
          variables: {
            userId,
            articleId: article.id,
            content: newComment,
          },
        });
        setNewComment("");
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({
        variables: { id: commentId },
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (commentId: string, content: string) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleSaveEditComment = async () => {
    if (editCommentId && editCommentContent.trim() !== "") {
      try {
        await editComment({
          variables: {
            id: editCommentId,
            content: editCommentContent,
          },
        });
        setEditCommentId(null);
        setEditCommentContent("");
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading comments: {error.message}</p>;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data?.article?.comments && data.article.comments.length > 0 ? (
          <ListGroup>
            {data.article.comments.map(
              (comment: Comment) =>
                comment && (
                  <ListGroup.Item
                    key={comment.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <img
                          src={`https://www.gravatar.com/avatar/${comment.user.id}?d=identicon`}
                          alt={`${comment.user.username}'s avatar`}
                          className="rounded-circle"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div>
                        <strong>{comment.user.username}</strong>: {editCommentId === comment.id ? (
                          <Form.Control
                            type="text"
                            value={editCommentContent}
                            onChange={(e) => setEditCommentContent(e.target.value)}
                          />
                        ) : (
                          comment.content
                        )}
                      </div>
                    </div>
                    {comment.user.id === userId && (
                      <div>
                        {editCommentId === comment.id ? (
                          <Button
                            variant="link"
                            onClick={handleSaveEditComment}
                            className="text-success p-0 me-2"
                          >
                            <FontAwesomeIcon icon={faSave} />
                          </Button>
                        ) : (
                          <Button
                            variant="link"
                            onClick={() => handleEditComment(comment.id, comment.content)}
                            className="text-primary p-0 me-2"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                        )}
                        <Button
                          variant="link"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-danger p-0"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    )}
                  </ListGroup.Item>
                )
            )}
          </ListGroup>
        ) : (
          <p>No comments yet.</p>
        )}
        <Form onSubmit={handleAddComment} className="mt-3">
          <Form.Group controlId="formNewComment">
            <InputGroup>
              <Form.Control
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment"
              />
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
