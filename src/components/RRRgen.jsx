import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function GenInvoice() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.rrr || !state.amount || !state.description) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { rrr, amount, description} = state;

  return (
    <div className="payment-success-container">
      <h1 className="payment-success-title">RRR DETAILS</h1>
      <p className="payment-success-info"><strong>Remita Retrieval Reference (RRR):</strong> {rrr}</p>
      <p className="payment-success-info"><strong>Description:</strong> {description}</p>
      <p className="payment-success-info"><strong>Amount:</strong> {amount}</p>
      <p className="payment-success-message">Thank you!! kindly visit any bank branch to make your payment.</p>
      <button className="payment-success-button" onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default GenInvoice;

