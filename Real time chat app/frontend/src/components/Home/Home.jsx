import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "../Nav/Nav";

import "./home.scss";

function Home() {
  const [rooms_, setRooms] = useState("");
  const [room_get_msg, setRoomGetMsg] = useState("");
  const [msg_, setMessage] = useState("");
  const [newmsg, setNewmsg] = useState("");
  const [newroom, setNewRoom] = useState("");
  const API = "http://127.0.0.1:8000/room/";
  const API_msg = "http://127.0.0.1:8000/room/messages/";
  const msgs = async (room_name) => {
    setRoomGetMsg(room_name);
    const res = await fetch(API_msg, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: room_name,
      }),
    });
    const data = await res.json();
    console.log(1);
    setMessage(JSON.parse(data));
  };
  const rooms = async () => {
    const res = await fetch(API);
    const data = await res.json();
    console.log("room");
    setRooms(JSON.parse(data));
  };
  useEffect(() => {
    rooms();
  }, []);

  if (rooms_) {
    if (msg_) {
      return (
        <Nav>
          <div className="home">
            <div className="rooms">
              <div className="add">
                <input
                  type="text"
                  placeholder="new room"
                  onChange={(e) => {
                    setNewRoom(e.target.value);
                  }}
                  value={newroom}
                />
                <button
                  onClick={() => {
                    if (newroom) {
                      const mss = async () => {
                        const res = await fetch("http://127.0.0.1:8000/room/", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            name: newroom,
                          }),
                        });
                        const data = await res.json();
                        msgs(newroom);
                      };
                      mss();
                    }
                    setTimeout(() => {
                      rooms();
                    }, 500);
                    setNewRoom("");
                  }}
                >
                  Add room
                </button>
              </div>
              {rooms_.map((room) => {
                return (
                  <div
                    className="room"
                    onClick={() => {
                      msgs(room.fields.name);
                    }}
                    key={room.fields.name}
                  >
                    <h3 className="room__name">{room.fields.name}</h3>
                  </div>
                );
              })}
            </div>
            <div className="messages-board">
              {msg_.map((item) => {
                if (localStorage.getItem("username") == item.fields.user) {
                  return (
                    <div className="right" key={item.pk}>
                      <div className="msg">{item.fields.message}</div>
                    </div>
                  );
                } else {
                  return (
                    <div className="left" key={item.pk}>
                      <div className="msg">
                        <p className="name">{item.fields.user}</p>
                        {item.fields.message}
                      </div>
                    </div>
                  );
                }
              })}
              <div className="form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const mss = async () => {
                      const res = await fetch(
                        "http://127.0.0.1:8000/message/create/",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            room: room_get_msg,
                            message: newmsg,
                            user: localStorage.getItem("username"),
                          }),
                        }
                      );
                      const data = await res.json();
                      msgs(room_get_msg);
                      setNewmsg("");
                    };
                    mss();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Message..."
                    onChange={(e) => {
                      setNewmsg(e.target.value);
                    }}
                    value={newmsg}
                    required
                  />
                  <button>Send</button>
                </form>
              </div>
            </div>
          </div>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <div className="home">
            <div className="rooms">
              <div className="add">
                <input
                  type="text"
                  placeholder="new room"
                  onChange={(e) => {
                    setNewRoom(e.target.value);
                  }}
                  value={newroom}
                />
                <button
                  onClick={() => {
                    if (newroom) {
                      const mss = async () => {
                        const res = await fetch("http://127.0.0.1:8000/room/", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            name: newroom,
                          }),
                        });
                        const data = await res.json();
                        msgs(newroom);
                      };
                      mss();
                    }
                    setTimeout(() => {
                      rooms();
                    }, 500);
                    setNewRoom("");
                  }}
                >
                  Add room
                </button>
              </div>
              {rooms_.map((room) => {
                return (
                  <div
                    className="room"
                    onClick={() => {
                      msgs(room.fields.name);
                    }}
                    key={room.fields.name}
                  >
                    <h3 className="room__name">{room.fields.name}</h3>
                  </div>
                );
              })}
            </div>
            <div className="messages-board">
              <div className="no-msg">Select room to see messages!</div>
            </div>
          </div>
        </Nav>
      );
    }
  } else {
    return (
      <Nav>
        <div className="load">Loading...</div>
      </Nav>
    );
  }
}

export default Home;
