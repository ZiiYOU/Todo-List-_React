import React from "react";

const Card = ({ item, isDone, deleteCard }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className={`${item.isDone ? "card-title-done" : "card-title"}`}>
          {item.title}
        </div>
        <div
          className={`${item.isDone ? "card-content-done" : "card-content"}`}
        >
          {item.content}
        </div>
      </div>
      <button
        className={`${item.isDone ? "working" : "done"}`}
        id={item.id}
        onClick={isDone}
      >
        {item.isDone ? "✔ working" : "✔ done"}
      </button>
      <button className="delete" id={item.id} onClick={deleteCard}>
        x
      </button>
    </div>
  );
};

export default Card;
