import { useForm } from 'react-hook-form';
import React from "react";
// import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
   const onSubmit = async () => {

  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-m rounded-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters required' },
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              {...register('role', { required: 'Role is required' })}
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="TeamLead">Team Lead</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
          </div>

          <button type="submit" className="btn btn-dark w-100">Register</button>
          <p className="mt-3 text-center">
            already have an account? <Link to="/login">Login</Link>
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
