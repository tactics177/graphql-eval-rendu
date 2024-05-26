import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE_MUTATION } from '../graphql/Mutations';
import { LOAD_ARTICLES } from '../graphql/Queries';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Article } from '../graphql/generated';

const CreateArticleComponent: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const userId = localStorage.getItem('userId');

    const [createArticleMutation] = useMutation(CREATE_ARTICLE_MUTATION, {
        update: (cache, { data: { createArticle } }) => {
            // Read the current state of the articles query from the cache
            const existingArticles = cache.readQuery<{ articles: Article[] }>({ query: LOAD_ARTICLES });

            // Add the new article to the cache
            if (existingArticles && createArticle) {
                cache.writeQuery({
                    query: LOAD_ARTICLES,
                    data: { articles: [createArticle.article, ...existingArticles.articles] },
                });
            }
        }
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createArticleMutation({
                variables: { title, content, userId },
            });

            // Reset input fields after successful mutation
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div className="card my-3">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Title"
                            className="form-control"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <textarea
                            placeholder="What's on your mind?"
                            className="form-control"
                            value={content}
                            onChange={handleContentChange}
                            rows={3}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-sm">Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateArticleComponent;
