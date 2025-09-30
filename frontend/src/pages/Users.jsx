import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users"); // backend should restrict to admin
      setUsers(res.data.data.users || res.data.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") fetchUsers();
  }, [user]);

  // Delete user (admin only)
  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
    }
  };

  // Update user role
  const handleRoleChange = async (id, newRole) => {
    try {
      await API.put(`/users/${id}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err.response?.data || err.message);
    }
  };

  if (user?.role !== "admin") {
    return <p className="p-6 text-red-500">Access denied. Admin only.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul className="space-y-3">
          {users.length > 0 ? (
            users.map((u) => (
              <li
                key={u._id}
                className="bg-white shadow p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{u.name}</h3>
                  <p className="text-sm">{u.email}</p>
                  <p className="text-xs text-gray-500">
                    Role: <span className="capitalize">{u.role}</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* Change Role */}
                  {["user", "admin"].map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleChange(u._id, r)}
                      className={`px-2 py-1 text-sm rounded ${
                        u.role === r
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {r}
                    </button>
                  ))}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No users found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Users;
