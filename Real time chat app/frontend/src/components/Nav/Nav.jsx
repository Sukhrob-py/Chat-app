import React from "react";
import { Link } from "react-router-dom";

import "./nav.scss";

function Nav({ children }) {
  const isLogin = localStorage.getItem("login") || false;

  return (
    <>
      <div className="nav">
        
        <div className="nav__links">
          <Link
            className={`nav__links__item ${isLogin ? "dnone" : "dblock"}`}
            to="/login"
          >
            Login
          </Link>
          <Link
            className={`nav__links__item ${isLogin ? "dnone" : "dblock"}`}
            to="/register"
          >
            Register
          </Link>
          <Link
            className={`nav__links__item ${isLogin ? "dblock" : "dnone"}`}
            onClick={() => {
              localStorage.removeItem("login");
              localStorage.removeItem("username");
              localStorage.removeItem("email");
              window.location.reload();
            }}
          >
            Logout
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}

export default Nav;
