import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const LawyerProfileManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    barNumber: "",
    yearsOfExperience: "",
    primaryCourtType: "",

    primaryPracticeArea: "",

    consultationFee: "",
    hourlyRate: "",
    preferredCaseType: "",
    education: "",
    biography: "",
    primaryLanguage: "",
    cases: "",
    won: "",
    lost: "",
    pending: "",
    // userId: userId,
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  // adjust based on your structure

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({ ...formData, [name]: selectedValues });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.barNumber.trim())
      newErrors.barNumber = "Bar number is required";
    if (!formData.yearsOfExperience.trim())
      newErrors.yearsOfExperience = "Experience is required";
    if (!formData.primaryCourtType)
      newErrors.primaryCourtType = "Primary court type is required";
    if (!formData.primaryPracticeArea)
      newErrors.primaryPracticeArea = "Primary practice area is required";
    if (!formData.consultationFee.trim())
      newErrors.consultationFee = "Consultation fee is required";
    if (!formData.hourlyRate.trim())
      newErrors.hourlyRate = "Hourly rate is required";
    if (!formData.preferredCaseType)
      newErrors.preferredCaseType = "Preferred case type is required";
    if (!formData.cases.trim()) newErrors.cases = "Total cases is required";
    if (!formData.won.trim()) newErrors.won = "Won cases is required";
    if (!formData.lost.trim()) newErrors.lost = "Lost cases is required";
    if (!formData.pending.trim())
      newErrors.pending = "Pending cases is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))?.id; // adjust based on how you're storing user

        const dataToSend = {
          ...formData,
          userId,
          cases: Number(formData.cases),
          won: Number(formData.won),
          lost: Number(formData.lost),
          pending: Number(formData.pending),
        };

        const response = await axios.post(
          "http://localhost:5000/api/lawyers/create",
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201 || response.status === 200) {
          toast.success("Profile created successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            barNumber: "",
            yearsOfExperience: "",
            primaryCourtType: "",
            primaryPracticeArea: "",
            consultationFee: "",
            hourlyRate: "",
            preferredCaseType: "",
            education: "",
            biography: "",
            primaryLanguage: "",
            cases: "",
            won: "",
            lost: "",
            pending: "",
          });
          setErrors({});
          setMessage("");
        }
      } catch (error) {
        console.error(
          "Error submitting profile:",
          error.response?.data || error.message
        );
        setMessage(
          "Error creating profile: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-700">
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Lawyer Profile</h2>
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information Section */}
            <div className="border-b border-gray-700 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-amber-500">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-800 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your office address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="border-b border-gray-700 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-amber-500">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Bar Number</label>
                  <input
                    type="text"
                    name="barNumber"
                    value={formData.barNumber}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your bar number"
                  />
                  {errors.barNumber && (
                    <p className="text-red-500 text-sm">{errors.barNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">
                    Years of Experience
                  </label>
                  <select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16-20">16-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                  {errors.yearsOfExperience && (
                    <p className="text-red-500 text-sm">
                      {errors.yearsOfExperience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">
                    Primary Court Type
                  </label>
                  <select
                    name="primaryCourtType"
                    value={formData.primaryCourtType}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Primary Court</option>
                    <option value="Supreme Court">Supreme Court</option>
                    <option value="High Court">High Court</option>
                    <option value="District Court">District Court</option>
                    <option value="Family Court">Family Court</option>
                    <option value="Criminal Court">Criminal Court</option>
                    <option value="Civil Court">Civil Court</option>
                    <option value="Tax Court">Tax Court</option>
                    <option value="Bankruptcy Court">Bankruptcy Court</option>
                  </select>
                  {errors.primaryCourtType && (
                    <p className="text-red-500 text-sm">
                      {errors.primaryCourtType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">
                    Primary Practice Area
                  </label>
                  <select
                    name="primaryPracticeArea"
                    value={formData.primaryPracticeArea}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Primary Practice Area</option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Family Law">Family Law</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Intellectual Property">
                      Intellectual Property
                    </option>
                    <option value="Immigration Law">Immigration Law</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Tax Law">Tax Law</option>
                    <option value="Labor Law">Labor Law</option>
                    <option value="Environmental Law">Environmental Law</option>
                    <option value="Personal Injury">Personal Injury</option>
                  </select>
                  {errors.primaryPracticeArea && (
                    <p className="text-red-500 text-sm">
                      {errors.primaryPracticeArea}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Fee Structure Section */}
            <div className="border-b border-gray-700 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-amber-500">
                Fee Structure
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">
                    Consultation Fee (Rs.)
                  </label>
                  <select
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Fee</option>
                    <option value="0">Free</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                  </select>
                  {errors.consultationFee && (
                    <p className="text-red-500 text-sm">
                      {errors.consultationFee}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Hourly Rate (Rs.)</label>
                  <select
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Rate</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                    <option value="300">300</option>
                    <option value="350">350</option>
                    <option value="400">400</option>
                  </select>
                  {errors.hourlyRate && (
                    <p className="text-red-500 text-sm">{errors.hourlyRate}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">
                    Preferred Case Type
                  </label>
                  <select
                    name="preferredCaseType"
                    value={formData.preferredCaseType}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Preferred Case Type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Document Review">Document Review</option>
                    <option value="Contract Drafting">Contract Drafting</option>
                    <option value="Court Representation">
                      Court Representation
                    </option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Mediation">Mediation</option>
                    <option value="Legal Research">Legal Research</option>
                    <option value="Criminal Defense">Criminal Defense</option>
                    <option value="Divorce Proceedings">
                      Divorce Proceedings
                    </option>
                    <option value="Estate Planning">Estate Planning</option>
                  </select>
                  {errors.preferredCaseType && (
                    <p className="text-red-500 text-sm">
                      {errors.preferredCaseType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-amber-500">
                Additional Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium">
                    Education & Credentials
                  </label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="List your degrees, certifications, and credentials"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-medium">
                    Professional Biography
                  </label>
                  <textarea
                    name="biography"
                    value={formData.biography}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a brief professional biography highlighting your expertise and notable cases"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium">
                      Primary Language
                    </label>
                    <select
                      name="primaryLanguage"
                      value={formData.primaryLanguage}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Primary Language</option>
                      <option value="English">English</option>
                      <option value="English">Urdu</option>
                      <option value="Hindi">Punjabi</option>
                      <option value="Hindi">Pashto</option>
                      <option value="Hindi">Balochi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="border-b border-gray-700 pb-4 mb-4">
              <h3 className="text-xl font-semibold mb-4 text-amber-500">
                Case Records
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Total Cases</label>
                  <input
                    type="text"
                    name="cases"
                    value={formData.cases}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-800 focus:ring-blue-500"
                    placeholder="Enter your total cases"
                  />
                  {errors.cases && (
                    <p className="text-red-500 text-sm">{errors.cases}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Win Cases</label>
                  <input
                    type="text"
                    name="won"
                    value={formData.won}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Number of winning cases"
                  />
                  {errors.won && (
                    <p className="text-red-500 text-sm">{errors.won}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Lost Cases</label>
                  <input
                    type="text"
                    name="lost"
                    value={formData.lost}
                    onChange={handleChange}
                    className="w-full p-3 border bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Lost cases"
                  />
                  {errors.lost && (
                    <p className="text-red-500 text-sm">{errors.lost}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Pending Cases</label>
                  <input
                    type="text"
                    name="pending"
                    value={formData.pending}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter pending cases"
                  />
                  {errors.pending && (
                    <p className="text-red-500 text-sm">{errors.pending}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfileManagement;
