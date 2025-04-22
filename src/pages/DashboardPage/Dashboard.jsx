import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import { FiRefreshCcw, FiUserPlus } from "react-icons/fi";
import "./dashboard.css";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    pages: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userService.listUsers({ page, limit, search });
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div id="main-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <input
            type="text"
            className="search-input"
            placeholder="Search users"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="dashboard-actions">
            <button
              className="refresh-btn"
              onClick={fetchUsers}
              disabled={isLoading}
            >
              <FiRefreshCcw className={`btn-icon ${isLoading ? "spin" : ""}`} />
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>

            <button className="add-btn">
              <FiUserPlus className="btn-icon" />
              Add New
            </button>
          </div>
        </div>

        <p className="table-info">
          Showing {users.length} of {pagination.total} users
        </p>

        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.lastLogin).toLocaleString()}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="action-btns">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  <p>No users found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="page-btn"
            disabled={pagination.page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${page === i + 1 ? "active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={pagination.page === pagination.pages}
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination.pages))
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
