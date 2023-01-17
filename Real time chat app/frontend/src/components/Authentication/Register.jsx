import React from "react";
import { useState } from "react";
import Nav from "../Nav/Nav";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");

  const API = "http://127.0.0.1:8000/auth/register/";
  const register = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirm: password_confirm,
        username: username,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.login) {
      console.log("register and login boldi");
      localStorage.setItem("login", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      window.location.replace('/')
    } else {
      alert(data.error);
    }
  };
  return (
    <Nav>
      <div className="auth">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <input
            required
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            required
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="password_confirm"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <button>Sign Up</button>
        </form>
      </div>
    </Nav>
  );
}

export default Register;
