import React, { useState } from 'react';

function GiveReviews({ doctor, onSubmit })  {
  //const [showForm, setShowForm] = useState(true);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0 // Assuming you have a rating field in your form
  });

 // const handleButtonClick = () => {
 //   setShowForm(true);
 // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(JSON.stringify(formData));
      setShowWarning(false);
      onSubmit(formData); // Invoke onSubmit with formData directly
    } else {
      setShowWarning(true);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({
        ...formData,
        rating: rating
    });
};
  
  const renderStar = (rating) => {
    const starClasses = `star ${formData.rating >= rating ? 'filled' : ''} ${formData.rating === rating ? 'clicked' : ''}`;

    return (
        <span
            key={rating}
            className={starClasses}
            onClick={() => handleRatingChange(rating)}
        >
            ⭐️
        </span>
    );
};

  return (
    <div>
      <h2>Form with Message</h2>
        <form onSubmit={handleFormSubmit}>
          <h2>Give Your Feedback</h2>
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
                <div className="star-rating">
                {[1, 2, 3, 4, 5].map((rating) => renderStar(rating))}
                <br />
                </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      {submittedMessage && (
        <div>
          <h3>Submitted Message:</h3>
          <p>{submittedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;