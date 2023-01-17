import React, { useEffect } from "react";
import { useState } from "react";
import Nav from "../Nav/Nav";

import "./authentication.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API = "http://127.0.0.1:8000/auth/login/";
  const login = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    localStorage.setItem("login", data.login);
    if (data.login) {
      localStorage.setItem("username", username);
      localStorage.setItem("email", data.email);
      console.log(data);
      window.location.replace("/");
    } else {
      alert("Username or password is incorrect");
    }
    return data;
  };
  return (
    <Nav>
      <div className="auth">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            login();
          }}
        >
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Sign Up</button>
        </form>
      </div>
    </Nav>
  );
}
