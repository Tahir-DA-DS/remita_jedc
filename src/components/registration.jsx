import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function RegistrationForm() {
  const [formData, setFormData] = useState({
    mapId: '',
    name: '',
    email: '',
    phone: '',
    meter: '',
    landlord: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.phone.length >= 2) {
      const newMapId = `SKY-${formData.phone.substring(2)}`;
      setFormData(prevState => ({
        ...prevState,
        mapId: newMapId
      }));
    }
  }, [formData.phone]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone' && value && !/^\d*$/.test(value)) {
      setErrors(prev => ({ ...prev, phone: "Phone number must contain only digits" }));
      return;
    } else if (name === 'phone' && value.length > 11) {
      setErrors(prev => ({ ...prev, phone: "Phone number must not exceed 11 digits" }));
      return;
    }
    setErrors(prev => ({ ...prev, [name]: '' })); // Reset specific field error
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const productPrices = {
      "Single-phase meter": "88123.30",
      "Three-phase meter": "154623.81"
    };
    if (!formData.meter) {
      setErrors(prev => ({ ...prev, meter: "Please select a meter type" }));
      return;
    }
    console.log('Form Data Submitted:', formData);
    alert('Form submitted successfully!');

    navigate('/details', {
      state: {
        name: formData.name,
        email:formData.email,
        phone: formData.phone,
        landlord: formData.landlord,
        mapId: formData.mapId,
        meter: formData.meter,
        productPrices: productPrices
      }
    });
  };

  return (
    <div className="formContainer">

      <div className="title">Meter Acquisition Form</div>
      <form onSubmit={handleSubmit}>
        <label className="label">Map ID
          <input className="inputField" type="text" name="mapId" value={formData.mapId} onChange={handleChange} readOnly required />
        </label>
        <label className="label">Enter Your Fullname
          <input className="inputField" type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label className="label">Enter Your Email Address
          <input className="inputField" type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label className="label">Enter Your Phone Number
          <input className="inputField" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <div className="errorText">{errors.phone}</div>}
        </label>
        <label className="label">Select Meter Type
          <select className="selectField" name="meter" value={formData.meter} onChange={handleChange} required>
            <option value="">Select Meter Type</option>
            <option value="Single-phase meter">Single-phase meter</option>
            <option value="Three-phase meter">Three-phase meter</option>
          </select>
          {errors.meter && <div className="errorText">{errors.meter}</div>}
        </label>
        <label className="label">Enter Your Landlord's Name
          <input className="inputField" type="text" name="landlord" value={formData.landlord} onChange={handleChange} required />
        </label>
        <button className="submitButton" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
