import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);


  const fetchTasks = async () => {
  try {
    setLoading(true);

    const res = await API.get("/tasks");
    
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    
    setTasks(res.data.data || []);
  } catch (err) {
    console.error("Error fetching tasks:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

// Update useEffect to depend on user
useEffect(() => {
  if (user) {
    fetchTasks();
  }
}, [user]);

  // Create task
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const response = await API.post("/tasks", {
      title: title.trim(),
      description: description.trim(),
      status
    });

    if (response.data.success) {
      setTitle("");
      setDescription("");
      setStatus("pending");
      await fetchTasks();
    } else {
      throw new Error(response.data.message || "Failed to create task");
    }
  } catch (err) {
    console.error("Error creating task:", err);
    alert(err.response?.data?.message || "Failed to create task");
  } finally {
    setLoading(false);
  }
  };

  // Update task status
  const handleUpdate = async (id, newStatus) => {
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  // Delete task (admin only)
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Create Task */}
      <form
        onSubmit={handleCreate}
        className="bg-white shadow rounded p-4 mb-6"
      >
        <h2 className="text-lg font-semibold mb-2">Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
          minLength={3}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        <select
          className="w-full border p-2 rounded mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={loading}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task._id}
                className="bg-white shadow p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm">
                    Status:{" "}
                    <span className="font-medium capitalize">
                      {task.status}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Created By: {task.createdBy?.name || "You"}
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* Update Status Buttons */}
                  {["pending", "in-progress", "completed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleUpdate(task._id, s)}
                      className={`px-2 py-1 text-sm rounded ${
                        task.status === s
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}

                  {/* Delete only if admin */}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
