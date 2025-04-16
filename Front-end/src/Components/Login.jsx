import { useForm } from 'react-hook-form';
// import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async () => {
  
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="w-100"
        style={{ maxWidth: '400px' }}
      >
        <h2 className="mb-4 text-center">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card p-4 shadow-sm rounded-4"
        >
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
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Login
          </button>
          <p className="mt-3 text-center">
            Do not have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
