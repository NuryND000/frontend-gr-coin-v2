import React from 'react';
import { Link } from 'react-router-dom';

const NavbarGuest = () => {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={"/"}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ maxHeight: '50px', width: 'auto' }} />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarGuest;
