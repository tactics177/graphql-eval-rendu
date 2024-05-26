import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Form, Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { LOAD_FILTERED_ARTICLES, SEARCH_USERNAMES } from '../graphql/Queries';
import { Article } from '../graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface FilterSectionProps {
  setFilteredArticles: (articles: Article[]) => void;
  setIsFiltered: (isFiltered: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ setFilteredArticles, setIsFiltered }) => {
  const [authorUsername, setAuthorUsername] = useState('');
  const [orderByLikes, setOrderByLikes] = useState(false);
  const [suggestedUsernames, setSuggestedUsernames] = useState<{ id: string, username: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [loadFilteredArticles, { loading, data, error }] = useLazyQuery(LOAD_FILTERED_ARTICLES, {
    onCompleted: (data) => {
      setFilteredArticles(data.filteredArticles);
      setIsFiltered(true);
    },
  });

  const [searchUsernames] = useLazyQuery(SEARCH_USERNAMES, {
    onCompleted: (data) => {
      setSuggestedUsernames(data.searchUsernames);
      setShowSuggestions(true);
    },
  });

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorUsername(e.target.value);
    if (e.target.value.length > 0) {
      searchUsernames({ variables: { username: e.target.value } });
    } else {
      setShowSuggestions(false);
    }
  };

  const handleOrderByLikesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderByLikes(e.target.checked);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadFilteredArticles({ variables: { authorUsername, orderByLikes } });
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (username: string) => {
    setAuthorUsername(username);
    setShowSuggestions(false);
  };

  return (
    <div className="filter-section mt-3 p-3 bg-light rounded">
      <Form onSubmit={handleFilterSubmit}>
        <Form.Group controlId="formAuthorUsername">
          <Form.Label><FontAwesomeIcon icon={faUser} /> Author Username</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Enter author username"
              value={authorUsername}
              onChange={handleAuthorChange}
            />
          </InputGroup>
          {showSuggestions && (
            <ListGroup className="mt-2">
              {suggestedUsernames.map((user) => (
                <ListGroup.Item key={user.id} action onClick={() => handleSuggestionClick(user.username)}>
                  {user.username}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>
        <Form.Group controlId="formOrderByLikes" className="mt-3">
          <Form.Check
            type="checkbox"
            label={<><FontAwesomeIcon icon={faThumbsUp} /> Order by number of likes</>}
            checked={orderByLikes}
            onChange={handleOrderByLikesChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Filter Articles
        </Button>
      </Form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error loading articles: {error.message}</p>}
    </div>
  );
};

export default FilterSection;
