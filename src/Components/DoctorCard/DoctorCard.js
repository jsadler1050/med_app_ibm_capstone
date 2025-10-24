import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';
import './DoctorCard.css';
import 'reactjs-popup/dist/index.css';


const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

      // Check if appointment data exists in localStorage
    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem(name));
            if (storedAppointments) {
            setAppointments(storedAppointments);
            }
        console.log("doctor Card Appts: ", appointments)
        }, [name]);


  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    localStorage.setItem(name, JSON.stringify(updatedAppointments));
    // remove item from localStorage
    if (updatedAppointments.length === 0) {
        localStorage.removeItem(name);
        localStorage.removeItem("doctorData");
    }
    console.log("cancel clicked");
    window.location.reload();
};

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
        id: uuidv4(),
        ...appointmentData
    };
    const doctorData = {
        name: name,
        speciality: speciality,
    };
    localStorage.setItem('doctorData', JSON.stringify(doctorData));
    
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem(name, JSON.stringify(updatedAppointments));
    setShowModal(false);
    window.location.reload();

};

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        {/* Commented section starts here */}
        {/*        
        <div>  
          <button className='book-appointment-btn'>                    
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button> 
        </div>
        */}
        {/* Commented section ends here */}
        <div className="doctor-card-options-container">
          <Popup
            style={{ backgroundColor: '#FFFFFF' }}
            trigger={
              <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
                {appointments.length > 0 ? (
                  <div>Cancel Appointment</div>
                ) : (
                  <div>Book Appointment</div>
                )}
                <div>No Booking Fee</div>
              </button>
            }
            modal
            open={showModal}
            onClose={() => setShowModal(false)}
          >
            {(close) => (
              <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
                <div>
                  <div className="doctor-card-profile-image-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                  </div>
                  <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                  </div>
                </div>

                {appointments.length > 0 ? (
                  <>
                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                    {appointments.map((appointment) => (
                      <div className="bookedInfo" key={appointment.id}>
                        <p>Name: {appointment.name}</p>
                        <p>Phone Number: {appointment.phoneNumber}</p>
                        <p>Date of Appointment: {appointment.appointmentDate}</p>
                        <p>Time Slot: {appointment.timeSlot}</p>
                        <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                      </div>
                    ))}
                  </>
                ) : (
                  <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
                )}
              </div>
            )}
          </Popup> 
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;