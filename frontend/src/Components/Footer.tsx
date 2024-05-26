// src/Components/Footer.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">© 2024 Social Network App</p>
        <p className="mb-0">made by: Ali LOUDAGH & Nahel KINI</p>
      </div>
    </footer>
  );
};

export default Footer;
