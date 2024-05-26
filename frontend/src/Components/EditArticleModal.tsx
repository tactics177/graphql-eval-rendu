import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Article } from '../graphql/generated'

interface EditArticleModalProps {
  show: boolean;
  handleClose: () => void;
  article: Article;
  handleSave: (article: Article) => void;
}

const EditArticleModal: React.FC<EditArticleModalProps> = ({ show, handleClose, article, handleSave }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const onSave = () => {
    handleSave({ ...article, title, content });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formContent" className="mt-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditArticleModal;
