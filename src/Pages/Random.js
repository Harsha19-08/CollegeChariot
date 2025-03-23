import React from 'react';

const Random = () => {
  const studentData = {
    sNo: '123',
    routeNo: '456',
    name: 'John Doe',
    branch: 'Computer Science',
    year: '2023',
    rollNo: '2023CS001',
    receiptNo: '12345678',
    boardingPoint: 'City Center',
    cellNo: '1234567890'
  };

  const profileImageSrc = '/path/to/your/profile/image.jpg'; // Update this path to the correct image path

  return (
    <div style={{ backgroundColor: '#ADD8E6', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>MLR Institute of Technology</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Laxman Reddy Avenue, Dundigal HYD-43</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <img
          src={profileImageSrc}
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>S.No:</strong> {studentData.sNo}</p>
        <p><strong>Route No:</strong> {studentData.routeNo}</p>
        <p><strong>Name:</strong> {studentData.name}</p>
        <p><strong>Branch:</strong> {studentData.branch}</p>
        <p><strong>Year:</strong> {studentData.year}</p>
        <p><strong>Roll No:</strong> {studentData.rollNo}</p>
        <p><strong>Receipt No:</strong> {studentData.receiptNo}</p>
        <p><strong>Boarding Point:</strong> {studentData.boardingPoint}</p>
        <p><strong>Cell No:</strong> {studentData.cellNo}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <p><strong>Bus Incharge</strong></p>
        <p><strong>Principal</strong></p>
      </div>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>BUS PASS 2023-24</p>
    </div>
  );
};

export default Random;