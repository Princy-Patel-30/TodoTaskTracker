// Card.jsx
import React, { useState } from 'react'

const Card = ({ task }) => {
  const [status, setStatus] = useState(task.status || 'Pending')

  const toggleStatus = () => {
    setStatus(prev => (prev === 'Pending' ? 'Completed' : 'Pending'))
    dispatch(st)
  }

  return (
    <div className="card shadow-lg rounded-4 border-0 mt-3">
      <div className="card-body p-4">
        <h4 className="card-title text-primary fw-bold mb-3">{task.title}</h4>

        <p className="card-text text-secondary mb-4">
          <strong>Description:</strong> {task.description}
        </p>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3">
              <strong>Deadline:</strong> {task.deadline}
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3">
              <strong>Priority:</strong> {task.priority}
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3">
              <strong>Assigned By:</strong> {task.assignedBy}
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
            <div>
              <strong>Status:</strong>{' '}
              <span
                className={`badge ${
                  status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'
                }`}
              >
                {status}
              </span>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={toggleStatus}
            >
              Mark as {status === 'Pending' ? 'Completed' : 'Pending'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
