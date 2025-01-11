import React, { useState, useEffect } from "react";
import "./modal.css"

const Modal = ({ handleAdd, bookmark }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  
  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title);
      setUrl(bookmark.url);
    } else {
      setTitle("");
      setUrl("");
    }
  }, [bookmark]);

  const handleSubmit = () => {
    handleAdd(title, url);
  };

  return (
    <div className="modal-box">
      <h2> Add Website </h2> 
      <div>
        <label>Website Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Website URL: </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>
        {bookmark ? "Update" : "Add"} Website
      </button>
    </div>
  );
};

export default Modal;
