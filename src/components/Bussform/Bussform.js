import React, { useState } from 'react';

const Bussform = ({ isRenewal }) => {
  const [formData, setFormData] = useState({
    photo: null,
    serialNumber: '',
    name: '',
    branch: '',
    year: '',
    rollNumber: '',
    bloodGroup: '',
    fatherName: '',
    presentAddress: '',
    permanentAddress: '',
    phoneNumber: '',
    email: '',
    routeNumber: '',
    boardingPoint: '',
    passDuration: '',
    receiptNumber: '',
    previousPassNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    const response = await fetch('/api/submitBusPassForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      // Redirect to payment gateway with necessary parameters
      window.location.href = `/payment?amount=${result.amount}&orderId=${result.orderId}`;
    } else {
      // Handle error
      alert('Form submission failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Photo:</label>
        <input type="file" name="photo" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Serial Number:</label>
        <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} readOnly />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Branch:</label>
        <select name="branch" value={formData.branch} onChange={handleChange} required>
          <option value="">Select Branch</option>
          <option value="branch1">Branch 1</option>
          <option value="branch2">Branch 2</option>
          {/* Add more branches as needed */}
        </select>
      </div>
      <div>
        <label>Year:</label>
        <select name="year" value={formData.year} onChange={handleChange} required>
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>
      <div>
        <label>Roll Number:</label>
        <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
      </div>
      {!isRenewal && (
        <>
          <div>
            <label>Blood Group:</label>
            <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
          </div>
          <div>
            <label>Father's Name:</label>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          </div>
          <div>
            <label>Present Address:</label>
            <input type="text" name="presentAddress" value={formData.presentAddress} onChange={handleChange} required />
          </div>
          <div>
            <label>Permanent Address:</label>
            <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
          </div>
        </>
      )}
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      {isRenewal && (
        <div>
          <label>Previous Pass Number:</label>
          <input type="text" name="previousPassNumber" value={formData.previousPassNumber} onChange={handleChange} required />
        </div>
      )}
      <div>
        <label>Route Number:</label>
        <input type="text" name="routeNumber" value={formData.routeNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Boarding Point:</label>
        <input type="text" name="boardingPoint" value={formData.boardingPoint} onChange={handleChange} required />
      </div>
      <div>
        <label>Pass Duration:</label>
        <select name="passDuration" value={formData.passDuration} onChange={handleChange} required>
          <option value="">Select Duration</option>
          <option value="halfSemester">Half Semester</option>
          <option value="oneSemester">One Semester</option>
          <option value="twoSemesters">Two Semesters (One Year)</option>
        </select>
      </div>
      <div>
        <label>Receipt Number:</label>
        <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Bussform;
