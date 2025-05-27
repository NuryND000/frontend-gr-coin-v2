import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgChevronRightO, CgChevronLeftO } from "react-icons/cg";
import { FcTimeline, FcCurrencyExchange  } from "react-icons/fc";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`menu ${isActive ? "is-active" : ""}`}
        style={{
          width: isActive ? "250px" : "0",
          transition: "width 0.3s",
          overflow: "hidden",
          backgroundColor: "hsl(0, 0.00%, 100.00%)",
          opacity: 0.8,
          position: "fixed",
          top: "0",
          left: "0",
          height: "100%",
          zIndex: "1",
          paddingTop: "60px",
          boxShadow: isActive ? "2px 0 5px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <ul className="menu-list mt-6">
          <li>
            <Link to="/home-admin" className="title-no-4">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/tugas-baru" className="">
            {"  "} <FcTimeline /> Tugas Baru
            </Link>
          </li>
          <li>
            <Link to="/tabel-tukar-koin" className="">
            {"  "} <FcCurrencyExchange /> Data Penarikan
            </Link>
          </li>
          <li>
            <Link to="/logout" className="title-no-3">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Tombol Toggle Sidebar */}
      <button
        className="button is-warning"
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          bottom: "300px",
          left: isActive ? "260px" : "20px",
          transition: "left 0.3s",
          zIndex: "2",
        }}
      >
        {isActive ? <CgChevronLeftO /> : <CgChevronRightO />}
      </button>
    </div>
  );
};

export default Sidebar;
