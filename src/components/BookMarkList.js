import React from 'react';

const BookMarkList = ({ bookmarks, onEdit, onDelete }) => {
  return (
    <ul>
      {bookmarks.map((bookmark, index) => (
        <li key={index}>
          <strong>{bookmark.title}</strong>
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
            {bookmark.url}
          </a>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookMarkList;
