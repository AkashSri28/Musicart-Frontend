import React, { useState } from 'react';
import '../styles/FeedbackButton.css';


const FeedbackButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        feedbackType: '',
        feedback: ''
    });

    const [errors, setErrors] = useState({
        feedbackType: '',
        feedback: ''
      });

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });

        setErrors({ 
            ...errors, 
            [name]: '' 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasErrors = false;

        Object.keys(formData).forEach((key) => {
            if (formData[key].trim() === '') {
              setErrors((prevErrors) => ({ ...prevErrors, [key]: '*Required field' }));
              hasErrors = true;
            }
        });

        if (!hasErrors) {
            // Submit the form if no errors
            console.log('Form submitted:', formData);
            // Reset form data and close the popup
            setFormData({ feedbackType: '', feedback: '' });
            setIsOpen(false);
        }
    };

  return (
    <div className="feedback-button-container">
        {isOpen && (
            <div className="popup">
                <form onSubmit={handleSubmit}>
                <label>Type of feedback</label>
                <select name="feedbackType" id="feedbackType" value={formData.feedbackType} onChange={handleChange} >
                    <option value="">Choose the type</option>
                    <option value="Bug">Bug</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Query">Query</option>
                </select>
                {errors.feedbackType && <p className="error-message">{errors.feedbackType}</p>}

                <label>Feedback</label>
                <textarea name="feedback" value={formData.feedback} onChange={handleChange} rows="4" />
                {errors.feedback && <p className="error-message">{errors.feedback}</p>}

                <button type="submit">Submit</button>
                </form>
            </div>
            )}
      <img
        src="feedback.png"
        alt="Feedback Image"
        className="feedback-button"
        onClick={togglePopup}
      />
    </div>
  );
};

export default FeedbackButton