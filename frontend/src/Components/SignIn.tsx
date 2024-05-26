import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_IN_MUTATION } from '../graphql/Mutations';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await signIn({ variables: formData });
            const token = data.signIn.token;
            localStorage.setItem('token', token); // Store token in local storage
            localStorage.setItem('userId', data.signIn.userId); // Store userId in local storage
            localStorage.setItem('username', data.signIn.username); // Store username in local storage
            localStorage.setItem('userEmail', data.signIn.userEmail); // Store userEmail in local storage
            
            // Trigger storage event for other tabs
            window.dispatchEvent(new Event('storage'));

            navigate('/'); // Redirect to home page after successful sign-in
        } catch (error) {
            console.error('Sign-in failed:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>Sign In</button>
                        {error && <p className="text-danger">{error.message}</p>}
                        <p className="mt-3">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
