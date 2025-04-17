import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        const token = response.data.token; // Assuming the token is returned in the response
        const decodedToken = jwtDecode(token); // Decode the token to get user info
        const role = decodedToken.role; // Extract the role from the token

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin'); // Redirect to admin dashboard
        } else {
          navigate('/'); // Redirect to employee dashboard
        }
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.message || 'Something went wrong. Try again.');
    }
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
