import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import LoginImage from "../assets/Login.jpg";
import axios from "axios";


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
   const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields!", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      toast.success("Registration Successful!", { position: "top-right", autoClose: 2000 });
      setFormData({ name: "", email: "", password: "", role: "client" });
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", { position: "top-right" });
    }
    
  };

  return (
    <div className="flex min-h-screen bg-gray-700">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="p-8 w-full max-w-md bg-gray-950 border border-amber-500 rounded-2xl shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-amber-400">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-amber-400 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-amber-400 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              
            />
            
            {/* Password Field with Eye Icon */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-amber-400 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10"
                
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-amber-400 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            
            >
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
            </select>
            <button
              type="submit"
              className="w-full bg-amber-500 text-gray-900 p-3 rounded-lg hover:bg-amber-600 transition font-bold"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-gray-400">
            Already have an account? 
            <Link to="/" className="text-amber-500 hover:underline"> Login here</Link>
          </p>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center p-6">
        <img 
          src={LoginImage}
          alt="Register" 
          className="w-full h-auto md:h-full object-fit rounded-lg"
        />
      </div>
    </div>
  );
};

export default RegistrationForm;
