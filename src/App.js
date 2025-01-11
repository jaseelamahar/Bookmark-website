import { useState, useEffect } from "react";
import Modal from "./components/modal";
import BookMarkList from "./components/BookMarkList";

function App() {
  const [ismodalOpen, setIsModalopen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const apiUrl = "https://crudcrud.com/api/fa4d570280254e80910f4001895149a6/bookmarks"; // Replace with your unique CRUD CRUD API endpoint

  // Fetch all bookmarks from CRUD CRUD API
  const fetchBookmarks = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBookmarks(data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  // Fetch bookmarks when the app loads
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // Handle adding or updating bookmarks
  const handleAdd = async (title, url) => {
    const bookmark = { title, url };

    if (editingIndex !== null) {
      // If editing, update the bookmark in the API
      try {
        const updatedBookmark = await fetch(`${apiUrl}/${bookmarks[editingIndex]._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmark),
        });
        const updatedData = await updatedBookmark.json();

        // Update the local state with the edited bookmark
        const updatedBookmarks = bookmarks.map((bookmark, i) =>
          i === editingIndex ? updatedData : bookmark
        );
        setBookmarks(updatedBookmarks);
        setEditingIndex(null); // Reset editing
      } catch (error) {
        console.error("Error updating bookmark:", error);
      }
    } else {
      // If adding new bookmark
      try {
        const newBookmark = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookmark),
        });

        const newData = await newBookmark.json();
        setBookmarks([...bookmarks, newData]); // Add new bookmark to the list
      } catch (error) {
        console.error("Error adding bookmark:", error);
      }
    }

    setIsModalopen(false); // Close modal after adding or editing
    setEditingIndex(null); // Reset the editing index
  };

  // Handle delete bookmark
  const handleDelete = async (index) => {
    try {
      const bookmarkId = bookmarks[index]._id;
      await fetch(`${apiUrl}/${bookmarkId}`, {
        method: "DELETE",
      });

      // Remove the deleted bookmark from local state
      const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  // Handle edit bookmark
  const handleEdit = (index) => {
    setEditingIndex(index); // Set the index for editing
    setIsModalopen(true);    // Open modal for editing
  };

  return (
    <div className="App">
      <h1>Bookmark Website</h1>
      <button onClick={() => setIsModalopen(true)}>Add new </button>

      {/* Show modal if it's open */}
      {ismodalOpen && (
        <Modal
          handleAdd={handleAdd}
          bookmark={editingIndex !== null ? bookmarks[editingIndex] : null} // Pass bookmark if editing
        />
      )}

      {/* List of bookmarks */}
      <BookMarkList
        bookmarks={bookmarks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
