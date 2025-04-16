import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../Store/Features/TaskSlice";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.user);
  const employeeList = useSelector((state) => state.user.userList || []);

  const onSubmit = (data) => {
    const newTask = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      assignedTo: data.assignedTo,
      status: "Pending",
      createdBy: currentUser?._id,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));
    reset();
    navigate("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container p-4 my-4 border rounded shadow-sm bg-light"
    >
      <h2 className="mb-4">📝 Create New Task</h2>

      {/* Title */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          {...register("title", { required: true })}
          type="text"
          className="form-control"
          placeholder="Enter task title"
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="form-control"
          placeholder="Enter task description"
        />
      </div>

      {/* Priority */}
      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select
          {...register("priority")}
          defaultValue="Low"
          className="form-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Assigned To */}
      <div className="mb-3">
        <label className="form-label">Assign To (Multi Select)</label>
        <select
          {...register("assignedTo")}
          multiple
          className="form-select"
          size="5"
        >
          {employeeList.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;