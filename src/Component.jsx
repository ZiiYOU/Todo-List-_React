import React from "react";

const Component = (item, key, isDone, deleteCard) => {
  return (
    <div className="card" key={key}>
      <div className="card-inner">
        <div className="card-title">{item.title}</div>
        <div className="card-content">{item.content}</div>
      </div>
      <button className="done" id={item.id} onClick={() => isDone(event)}>
        ✔ done
      </button>
      <button className="delete" id={item.id} onClick={() => deleteCard(event)}>
        x
      </button>
    </div>
  );
};

export default Component;
