import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive(!isActive);
  };

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          className="navbar-item"
          href="/home-user"
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ maxHeight: "50px", width: "auto" }}
          />
        </a>

        <button
          className={`button navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive ? "true" : "false"}
          data-target="navbarBasicExample"
          onClick={toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start"></div>

        <div className="navbar-end">
          <div className="navbar-item">
            <a
              href="/home-user"
              className="title-no-4"
            >
              Dashboard
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/tukar-koin"
              className="title-no-4"
            >
              Tukar Koin
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/riwayat-koin"
              className="title-no-4"
            >
              Riwayat Koin
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/pengaduan-saya"
              className="title-no-4"
            >
              Komplain
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/about-us"
              className="title-no-4"
            >
              About Us
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/ganti-password"
              className="title-no-4"
            >
              Ganti Password
            </a>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <a
                onClick={logout}
                className="button is-rounded is-warning is-outlined"
                style={{ maxHeight: "150px", width: "200px" }}
              >
                <strong className="has-text-dark"> Log Out </strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
