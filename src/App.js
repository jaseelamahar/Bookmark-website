import { useState } from "react";
import Modal from "./components/modal";
import BookMarkList from "./components/BookMarkList";

function App() {
  const [ismodalOpen, setIsModalopen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // handleAdd function for both adding and editing
  const handleAdd = (title, url) => {
    if (editingIndex !== null) {
      // If editing, update the existing bookmark
      const updatedBookmarks = bookmarks.map((bookmark, i) =>
        i === editingIndex ? { title, url } : bookmark
      );
      setBookmarks(updatedBookmarks);
    } else {
      // Otherwise, add a new bookmark
      setBookmarks([...bookmarks, { title, url }]);
    }
    setIsModalopen(false); // Close modal after action
    setEditingIndex(null);  // Reset editing index
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setIsModalopen(true); // Open modal for editing
  };

  const handleDelete = (index) => {
    setBookmarks(bookmarks.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h1>Bookmark Website</h1>

      <button onClick={() => setIsModalopen(true)}>Add NEW</button>

      {ismodalOpen && (
        <Modal
          handleAdd={handleAdd}
          bookmark={editingIndex !== null ? bookmarks[editingIndex] : null}
        />
      )}

      <BookMarkList
        bookmarks={bookmarks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
