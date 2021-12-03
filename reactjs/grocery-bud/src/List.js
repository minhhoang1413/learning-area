import React, { useState } from 'react';
const List = ({ list, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {list.map((item) => (
        <article key={item.id} className="grocery-item">
          <p className="title">{item.title}</p>
          <div className="btn-container">
            <button
              type="button"
              className="edit-btn"
              onClick={() => editItem(item.id)}
            >
              <span>&#9998;</span>
            </button>
            <button
              type="button"
              className="del-btn"
              onClick={() => removeItem(item.id)}
            >
              <span>&#10008;</span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
export default List;
