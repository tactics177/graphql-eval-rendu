import React from 'react';
import CreateArticleComponent from './CreateArticleComponent';
import ArticleList from './ArticleList';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <CreateArticleComponent />
          <ArticleList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
