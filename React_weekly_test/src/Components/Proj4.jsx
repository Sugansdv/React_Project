import React, { useEffect, useState } from "react";
import "../App.css";

export default function Proj4() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=5")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const id = Date.now();
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: "", email: "" });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete this user?");
    if (confirm) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setShowModal(false);
    setEditUser(null);
  };

  return (
    <div className="container mt-4 user-manager">
      <h2 className="mb-4 text-center">Project 4: User Management System</h2>

      <form onSubmit={handleAddUser} className="mb-4">
        <div className="row g-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-5">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">Add User</button>
          </div>
        </div>
      </form>

      {/* User List */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && editUser && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  value={editUser.name}
                  onChange={handleEditChange}
                />
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={editUser.email}
                  onChange={handleEditChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleEditSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
