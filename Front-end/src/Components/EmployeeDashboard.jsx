// EmployeeDashboard.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Card from './Card'
import { fetchTodos } from '../Store/Features/TaskSlice'

const EmployeeDashboard = () => {
  const dispatch = useDispatch()
  const { tasks, status, error } = useSelector(state => state.tasks)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (status === 'loading') return <p>Loading tasks...</p>
  if (status === 'failed') return <p>Error: {error}</p>

  return (
    <div className="container my-4">
      <h1 className="mb-4">Employee Dashboard</h1>
      <div className="row">
        {tasks.map(task => (
          <div className="col-md-6" key={task.id}>
            <Card task={task} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeeDashboard
