import React, { useState } from "react";
import Component from "./Component.jsx";

const App = () => {
  return <Layout />;
};

export default App;

const Layout = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [list, setList] = useState([]);

  const titleValueHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentValueHandler = (event) => {
    setContent(event.target.value);
  };

  const addCard = () => {
    if (title.trim() === "") {
      alert("할 일의 제목을 입력해주세요.");
      return;
    } else if (content.trim() === "") {
      alert("할 일의 내용을 입력해주세요.");
      return;
    }

    setList((prev) => [
      ...prev,
      { id: Date.now(), title: title, content: content, isDone: false },
    ]);

    setTitle("");
    setContent("");
  };

  const handleEnter = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      addCard();
    }
  };

  const isDone = (event) => {
    const newList = list.map((el) => {
      if (el.id === Number(event.target.id)) {
        if (el.isDone === false) {
          el.isDone = true;
        } else {
          el.isDone = false;
        }
      }
      return el;
    });
    setList(newList);
  };

  const deleteCard = (event) => {
    setList((currentArray) =>
      currentArray.filter((el) => el.id !== Number(event.target.id))
    );
  };

  const trashcan = () => {
    if (confirm("완료된 항목을 비우시겠습니까?")) {
      setList((currentArray) =>
        currentArray.filter((el) => el.isDone === true)
      );
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="inner">
        <div className="title">할 일</div>
        <div className="input-container">
          <div className="card">
            <div className="input-inner">
              <div className="input-box">
                <input
                  type="text"
                  placeholder="제목을 입력해주세요."
                  onChange={() => titleValueHandler(event)}
                  onKeyUp={() => handleEnter(event)}
                  value={title}
                />
                <input
                  type="text"
                  placeholder="내용을 입력해주세요."
                  onChange={() => contentValueHandler(event)}
                  onKeyUp={() => handleEnter(event)}
                  value={content}
                />
              </div>
              <button className="plus" onClick={() => addCard(title, content)}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="working-container">
          {list
            .filter((item) => item.isDone === false)
            .map((item, index) => (
              <div className="card" key={index}>
                <div className="card-inner">
                  <div className="card-title">{item.title}</div>
                  <div className="card-content">{item.content}</div>
                </div>
                <button
                  className="done"
                  id={item.id}
                  onClick={() => isDone(event)}
                >
                  ✔ done
                </button>
                <button
                  className="delete"
                  id={item.id}
                  onClick={() => deleteCard(event)}
                >
                  x
                </button>
              </div>
            ))}
        </div>
        <div className="title">
          완료된 항목
          <button
            className="deleteAll"
            onClick={() => {
              trashcan(event);
            }}
          >
            🗑️
          </button>
        </div>
        <div className="done-container">
          {list
            .filter((item) => item.isDone === true)
            .map((item, index) => (
              <div className="card" key={index}>
                <div className="card-inner">
                  <div className="card-title">{item.title}</div>
                  <div className="card-content">{item.content}</div>
                </div>
                <button
                  className="working"
                  id={item.id}
                  onClick={() => isDone(event)}
                >
                  ✔ working
                </button>
                <button
                  className="delete"
                  id={item.id}
                  onClick={() => deleteCard(event)}
                >
                  x
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
