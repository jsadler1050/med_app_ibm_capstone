// Reviews.js
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import GiveReviews from './GiveReviews/ReviewForm';
import './Reviews.css';

const Reviews = () => {
  // Sample data array
  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Doe', age: 40 }
  ];

  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getDoctorsDetails = () => {
      fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
          const dataWithId = data.map((item, index) => ({ ...item, id: index + 1 }));
          setDoctors(dataWithId);
        })
        .catch(err => console.log(err));
    };
  
    // Call the function to fetch doctors' details
    getDoctorsDetails();
  }, []); 
  console.log("doctors: ", doctors);
  
  // Check if appointment data exists in localStorage
  useEffect(() => {
    const storedReviews = {};
    doctors.forEach(doctor => {
      const storedReview = JSON.parse(localStorage.getItem(`ratingsData_${doctor.id}`));
      console.log("useEffect");
      if (storedReview) {
        storedReviews[doctor.id] = storedReview;
      }
    });
    setReviews(storedReviews);
  },[doctors]); // Empty dependency array to run the effect only once on component mount
    console.log("stored reviews: ", reviews);


  const handleFormSubmit = (formData) => {
    localStorage.setItem(`ratingsData_${selectedDoctor.id}`, JSON.stringify(formData));
    setShowModal(false);
    window.location.reload();
  };

  const handleFeedbackClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  return (
    <div className="reviews-container">
      <table className="report-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              {!reviews[doctor.id] ? (
                <>
                  <td>
                    <button onClick={() => handleFeedbackClick(doctor)}>Click Here</button>
                  </td>
                  <td></td>
                </>
              ) : (
                <>
                  <td>
                    <button className="disabled-button" disabled>Click Here</button>
                  </td>
                  <td>{reviews[doctor.id].review}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Popup
        trigger={null}
        modal
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        {(close) => <GiveReviews doctor={selectedDoctor} onSubmit={handleFormSubmit} closeModal={close} />}
      </Popup>
    </div>
  );
};

export default Reviews;