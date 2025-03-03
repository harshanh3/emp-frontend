import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../contexts/AuthContextAPI';

const Auth = ({ insideRegister }) => {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext);
  const Navigate = useNavigate();

  const [inputData, setInputData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({}); // State for validation errors

  // Validation function
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (insideRegister) {
      if (!inputData.username.trim()) {
        errors.username = "Username is required.";
        isValid = false;
      } else if (inputData.username.length < 3) {
        errors.username = "Username must be at least 3 characters.";
        isValid = false;
      }
    }

    if (!inputData.email.trim()) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputData.email)) {
      errors.email = "Invalid email format.";
      isValid = false;
    }

    if (!inputData.password.trim()) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (inputData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await registerAPI(inputData);
        if (result.status === 200) {
          alert("Welcome! Please log in to explore.");
          Navigate('/');
          setInputData({ username: "", email: "", password: "" });
        } else {
          if (result.response.status === 406) {
            alert(result.response.data);
            setInputData({ username: "", email: "", password: "" });
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await loginAPI(inputData);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsAuthorised(true);
          setInputData({ username: "", email: "", password: "" });
          Navigate('/dashboard');
        } else {
          if (result.response.status === 404) {
            alert(result.response.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-11/12 md:w-3/4 lg:w-2/3">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid md:grid-cols-2 items-center gap-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-brands fa-docker text-blue-500"></i> Employee Records
              </h1>
              <h5 className="text-gray-600 mt-2">
                Sign {insideRegister ? "Up" : "In"} to your Account
              </h5>

              <form className="mt-4">
                {/* Username field for Register */}
                {insideRegister && (
                  <div className="mb-3">
                    <label className="block text-gray-700">Username</label>
                    <input
                      type="text"
                      placeholder="Username"
                      value={inputData.username}
                      onChange={e => setInputData({ ...inputData, username: e.target.value })}
                      className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                  </div>
                )}

                {/* Email */}
                <div className="mb-3">
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={inputData.email}
                    onChange={e => setInputData({ ...inputData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={inputData.password}
                    onChange={e => setInputData({ ...inputData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {insideRegister ? (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                      Register
                    </button>
                    <p className="mt-2 text-sm text-gray-600">
                      Existing User? <Link to="/" className="text-blue-500">Login</Link>
                    </p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={handleLogin}
                      type="button"
                      className="w-full flex justify-center items-center gap-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                      Login
                    </button>
                    <p className="mt-2 text-sm text-gray-600">
                      New User? <Link to="/register" className="text-blue-500">Register</Link>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
