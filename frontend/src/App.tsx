import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import UserProfile from "./Components/UserProfile";
import HomePage from "./Components/HomePage";
import MyArticles from "./Components/MyArticles";
import Footer from "./Components/Footer"; // Import your Footer component

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = from([errorLink, authLink.concat(httpLink)]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const App: React.FC = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/signin");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
      setUserEmail(localStorage.getItem("userEmail"));
    };

    window.addEventListener("storage", handleStorageChange);

    if ((!username || !userEmail) && location.pathname !== "/signin" && location.pathname !== "/signup") {
      navigate("/signin");
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [username, userEmail, location.pathname, navigate]);

  return (
    <ApolloProvider client={client}>
      <div id="root" className="app">
        <NavBar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfile username={username} userEmail={userEmail} userId={userId} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-articles" element={<MyArticles />} />
        </Routes>
        <Footer /> {/* Include the Footer component */}
      </div>
    </ApolloProvider>
  );
};

export default App;
