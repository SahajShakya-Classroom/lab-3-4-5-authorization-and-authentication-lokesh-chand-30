import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };


  const createTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);
    }
  const updateTodo = (id, updatedTitle) =>
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle } : todo
      )
    );
  const deleteTodo = (id) => setTodos((prev) => prev.filter((todo) => todo.id !== id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId !== null) {
      updateTodo(editingId, title);
      setEditingId(null);
    } else {
      createTodo({ id: Date.now(), title });
    }

    setTitle("");
  };


  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setTitle(todo.title); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Todo App</h2>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Add/Edit Todo */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new todo"
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className={`px-4 rounded-lg ${
              editingId !== null
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {editingId !== null ? "Edit" : "Add"}
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <span>{todo.title}</span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Todo;
