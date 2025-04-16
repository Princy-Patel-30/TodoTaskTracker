import React, { useState } from 'react'

const Card = () => {
  const [status, setStatus] = useState('Pending')

  const toggleStatus = () => {
    setStatus(prev => (prev === 'Pending' ? 'Completed' : 'Pending'))
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-lg rounded-4 border-0">
        <div className="card-body p-4">
          <h4 className="card-title text-primary fw-bold mb-3"> title</h4>

          <p className="card-text text-secondary mb-4">
            <strong>Description:</strong>description
          </p>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3">
                <strong> Deadline:</strong> date
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3">
                <strong> Priority:</strong> 
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3">
                <strong> Assigned By:</strong> Princy Patel
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
              <div>
                <strong>Status:</strong>{' '}
                <span className={`badge ${status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
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
    </div>
  )
}

export default Card
