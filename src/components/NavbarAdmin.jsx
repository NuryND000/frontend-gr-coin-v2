import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const NavbarAdmin = () => {
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
          href="/home-Admin"
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
              href="/home-admin"
              className="title-no-4"
            >
              Dashboard
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/tugas-baru"
              className="title-no-4"
            >
              Tugas Baru
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/tabel-tukar-koin"
              className="title-no-4"
            >
              Data Tukar Koin
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/data-tambah-koin"
              className="title-no-4"
            >
              Data Tambah Koin
            </a>
          </div>
          <div className="navbar-item">
            <a
              href="/pengaduan-pelanggan"
              className="title-no-4"
            >
              Data Komplain
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

export default NavbarAdmin;
