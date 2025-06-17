import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setServerError("");

  //   if (validateForm()) {
  //     try {
  //       const res = await axios.post("http://localhost:5000/api/client-profile/create-client", formData, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       toast.success("Profile Submitted Successfully!")

  //       setFormData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         address: "",
  //       });
  //     } catch (err) {
  //       console.error("Error submitting profile:", err);
  //       setServerError(err?.response?.data?.message || "Something went wrong.");
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
  
    if (validateForm()) {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
        const userId = user?.id;
     
  
        const res = await axios.post(
          "http://localhost:5000/api/client-profile/create-client",
          {
            ...formData,
            userId, // Add user ID to the body
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        toast.success("Profile Submitted Successfully!");
  
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      } catch (err) {
        console.error("Error submitting profile:", err);
        setServerError(err?.response?.data?.message || "Something went wrong.");
      }
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-700">
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-white mb-6">Client Profile</h2>
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
          {serverError && (
            <div className="text-red-500 font-medium mb-4">{serverError}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone", "address"].map((field) => (
              <div key={field}>
                <label className="block font-medium capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter your ${field}`}
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
