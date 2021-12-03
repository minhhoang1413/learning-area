import React, { useState, useEffect } from 'react';
import './style.css';
import List from './List';
import Alert from './Alert';
export default function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  useEffect(() => {
    if (localStorage.getItem('grocery-list')) {
      setList(JSON.parse(localStorage.getItem('grocery-list')));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('grocery-list', JSON.stringify(list));
  }, [list]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'empty', 'danger');
    } else if (isEditing) {
      setList(
        list.map((item) =>
          item.id === editId ? { ...item, title: name } : item
        )
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'edit', 'success');
    } else {
      const newItem = { id: Date.now(), title: name };
      setList(list.concat(newItem));
      setName('');
      showAlert(true, 'item add to list', 'success');
    }
  };
  const showAlert = (show = false, message = '', type = '') => {
    setAlert({ show, message, type });
  };
  const clearList = () => {
    setList([]);
    showAlert(true, 'clear list', 'success');
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, 'remove item', 'success');
  };
  const editItem = (id) => {
    const item = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(item.title);
  };
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{isEditing ? 'edit' : 'submit'}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}
