import React, { useEffect, useState } from "react";

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
    // localStorage.clear();
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
