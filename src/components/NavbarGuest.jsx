import React from 'react';

const NavbarGuest = () => {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="/logo.png" alt="Logo" style={{ maxHeight: '50px', width: 'auto' }} />
        </a>
      </div>
    </nav>
  );
};

export default NavbarGuest;
