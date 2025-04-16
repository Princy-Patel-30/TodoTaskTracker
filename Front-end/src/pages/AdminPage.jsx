import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminPage() {
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks); // assuming task slice has tasks array

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👨‍💼 Admin Dashboard</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/create-task")}
        >
          ➕ Create Task
        </button>
      </div>

      {/* Optional: List of existing tasks */}
      <div>
        <h4>📋 Assigned Tasks</h4>
        <div className="list-group">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{task.title}</strong> <br />
                    <small className="text-muted">
                      {task.priority} Priority
                    </small>
                  </div>
                  <span
                    className={`badge bg-${
                      task.status === "Completed"
                        ? "success"
                        : task.status === "In Progress"
                        ? "warning"
                        : "secondary"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">No tasks assigned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;