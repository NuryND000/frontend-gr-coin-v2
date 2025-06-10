import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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
        <Link
          className="navbar-item"
          to={"/home-user"}
        >
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
            style={{ maxHeight: "50px", width: "auto" }}
          />
        </Link>

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
            <Link
              to={"/home-user"}
              className="title-no-4"
            >
              Dashboard
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to={"/tukar-koin"}
              className="title-no-4"
            >
              Tukar Koin
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to={"/riwayat-koin"}
              className="title-no-4"
            >
              Riwayat Koin
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to={"/pengaduan-saya"}
              className="title-no-4"
            >
              Komplain
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to={"/about-us"}
              className="title-no-4"
            >
              About Us
            </Link>
          </div>
          <div className="navbar-item">
            <Link
              to={"/ganti-password"}
              className="title-no-4"
            >
              Ganti Password
            </Link>
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
