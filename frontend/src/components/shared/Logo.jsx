import React from 'react';
import logo from '../assets/pngegg.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" className="w-20" />
    </Link>
  );
};

export default Logo;
