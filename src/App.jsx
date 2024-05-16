import React, { useState } from "react";

const App = () => {
  return <Layout />;
};

export default App;

const Layout = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState([]);
  const [list, setList] = useState([]);

  const localList = JSON.parse(localStorage.getItem("todo"));
  const localDone = JSON.parse(localStorage.getItem("done"));

  window.addEventListener("load", (event) => {
    event.preventDefault();
    if (localList) {
      setList((currentArray) => [...localList]);
    }
    if (localDone) {
      setDone((currentArray) => [...localDone]);
    }
  });

  const titleValueHandler = (event) => {
    setTitle(event.target.value);
  };

  const contentValueHandler = (event) => {
    setContent(event.target.value);
  };

  const addCard = (title, content) => {
    if (title.trim() === "") {
      alert("할 일의 제목을 입력해주세요.");
      return;
    } else if (content.trim() === "") {
      alert("할 일의 내용을 입력해주세요.");
      return;
    }

    setList((currentArray) => [[title, content], ...currentArray]);

    localStorage.setItem("todo", JSON.stringify([[title, content], ...list]));

    setTitle("");
    setContent("");
  };

  const deleteCard = (event) => {
    setList((currentArray) =>
      currentArray.filter(
        (el) => currentArray.indexOf(el) !== Number(event.target.id)
      )
    );
    let notDelete = localList.filter(
      (el) => localList.indexOf(el) !== Number(event.target.id)
    );
    localStorage.removeItem("todo");
    localStorage.setItem("todo", JSON.stringify([...notDelete]));
  };

  const isDone = (event) => {
    setDone((currentArray) => [
      [list[event.target.id][0], list[event.target.id][1]],
      ...currentArray,
    ]);
    localStorage.setItem(
      "done",
      JSON.stringify([
        [list[event.target.id][0], list[event.target.id][1]],
        ...done,
      ])
    );
    deleteCard(event);
  };

  const deleteDone = (event) => {
    setDone((currentArray) =>
      currentArray.filter(
        (el) => currentArray.indexOf(el) !== Number(event.target.id)
      )
    );
    const doneNotDelete = localDone.filter(
      (el) => localDone.indexOf(el) !== Number(event.target.id)
    );
    localStorage.removeItem("done");
    localStorage.setItem("done", JSON.stringify([...doneNotDelete]));
  };

  const isNotDone = (event) => {
    setList((currentArray) => [
      [done[event.target.id][0], done[event.target.id][1]],
      ...currentArray,
    ]);
    localStorage.setItem(
      "todo",
      JSON.stringify([
        [[done[event.target.id][0], done[event.target.id][1]]],
        ...list,
      ])
    );
    deleteDone(event);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      addCard(title, content);
    }
  };

  const trashcan = (event) => {
    if (confirm("완료된 항목을 비우시겠습니까?")) {
      setDone([]);
      localStorage.removeItem("done");
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
          {list.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-inner">
                <div className="card-title">{item[0]}</div>
                <div className="card-content">{item[1]}</div>
              </div>
              <button className="done" id={index} onClick={() => isDone(event)}>
                ✔ done
              </button>
              <button
                className="delete"
                id={index}
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
          {done.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-inner">
                <div className="card-title">{item[0]}</div>
                <div className="card-content">{item[1]}</div>
              </div>
              <button
                className="working"
                id={index}
                onClick={() => {
                  isNotDone(event);
                }}
              >
                ✔ working
              </button>
              <button
                className="delete"
                id={index}
                onClick={() => deleteDone(event)}
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
