import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, appointmentDate, timeSlot });
      setName('');
      setAppointmentDate('');
      setPhoneNumber('');
      setTimeSlot('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
            <label htmlFor="appointmentDate"> Date of Appointment:</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
        />
        </div>
        <div className="form-group">
            <label htmlFor="timeSlot">Book Time Slot:</label>
            <select
              id="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            >
            <option value="">Select a timeslot</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="14:00">14:00</option>
            <option value="17:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            </select>
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    );
  };

export default AppointmentForm