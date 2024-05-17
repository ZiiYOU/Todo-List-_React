import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const App = () => {
  return <Layout />;
};

export default App;

const Layout = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [list, setList] = useState([]);

  window.addEventListener("load", () => {
    const localList = JSON.parse(localStorage.getItem("todo"));
    setList(localList);
  });

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

    const prev = [
      ...list,
      { id: Date.now(), title: title, content: content, isDone: false },
    ];

    setList(prev);
    setItem(prev);

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
    const doneList = list.map((el) => {
      if (el.id === Number(event.target.id)) {
        if (el.isDone === false) {
          el.isDone = true;
        } else {
          el.isDone = false;
        }
      }
      return el;
    });
    setList(doneList);
    setItem(doneList);
  };

  const deleteCard = (event) => {
    const deleteList = list.filter((el) => el.id !== Number(event.target.id));
    setList(deleteList);
    setItem(deleteList);
  };

  const trashcan = () => {
    if (confirm("완료된 항목을 비우시겠습니까?")) {
      const deleteAll = list.filter((el) => el.isDone === false);
      setList(deleteAll);
      setItem(deleteAll);
    } else {
      return;
    }
  };

  const setItem = (li) => {
    localStorage.setItem("todo", JSON.stringify(li));
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
                  onChange={titleValueHandler}
                  onKeyUp={handleEnter}
                  value={title}
                />
                <input
                  type="text"
                  placeholder="내용을 입력해주세요."
                  onChange={contentValueHandler}
                  onKeyUp={handleEnter}
                  value={content}
                />
              </div>
              <button className="plus" onClick={addCard}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="working-container">
          {list
            .filter((item) => item.isDone === false)
            .map((item, index) => (
              <Card
                item={item}
                key={index}
                isDone={isDone}
                deleteCard={deleteCard}
              />
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
              <Card
                item={item}
                key={index}
                isDone={isDone}
                deleteCard={deleteCard}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
