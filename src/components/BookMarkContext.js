import React, { createContext, useContext, useState } from 'react';
const BookmarkContext = createContext();


export const useBookmarkContext = () => useContext(BookmarkContext);


export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [ismodalOpen, setIsModalopen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  const handleAddBookmark = (title, url) => {
    setBookmarks([...bookmarks, { title, url }]);
    setIsModalopen(false);
  };

  const handleEditBookmark = (index, title, url) => {
    const updatedBookmarks = bookmarks.map((bookmark, i) =>
      i === index ? { title, url } : bookmark
    );
    setBookmarks(updatedBookmarks);
    setIsModalopen(false);
  };

  const handleDeleteBookmark = (index) => {
    setBookmarks(bookmarks.filter((_, i) => i !== index));
  };

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setCurrentBookmark(bookmarks[index]);
    } else {
      setEditingIndex(null);
      setCurrentBookmark(null);
    }
    setIsModalopen(true);
  };

  const handleCloseModal = () => {
    setIsModalopen(false);
    setEditingIndex(null);
    setCurrentBookmark(null);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        ismodalOpen,
        editingIndex,
        currentBookmark,
        handleAddBookmark,
        handleEditBookmark,
        handleDeleteBookmark,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
