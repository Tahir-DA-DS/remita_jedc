import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkTransactionStatus, updatePaymentStatus } from '../remitaServices';
import loadRemitaScript from '../utils/loadremita'; // Adjust the path as needed

function GenInvoice() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [remitaLoaded, setRemitaLoaded] = useState(false);

  useEffect(() => {
    if (!state || !state.rrr || !state.amount || !state.description) {
      navigate('/');
    } else {
      loadRemitaScript()
        .then(() => setRemitaLoaded(true))
        .catch(error => console.error('Error loading Remita script:', error));
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  const { rrr, amount, description } = state;

  const handleCheckStatus = async () => {
    try {
      const status = await checkTransactionStatus(rrr);
      alert(`Transaction status: ${status.message}`);
      if (status.message === 'Successful') {
        await updatePaymentStatus(rrr, 'Successful');
      }
    } catch (error) {
      console.error('Error checking transaction status:', error);
      alert('Error checking transaction status');
    }
  };

  const makePayment = () => {
    if (!remitaLoaded) {
      alert('Remita script not loaded. Please try again later.');
      return;
    }

    var paymentEngine = window.RmPaymentEngine.init({
      key: "QzAwMDAyNzEyNTl8MTEwNjE4NjF8OWZjOWYwNmMyZDk3MDRhYWM3YThiOThlNTNjZTE3ZjYxOTY5NDdmZWE1YzU3NDc0ZjE2ZDZjNTg1YWYxNWY3NWM4ZjMzNzZhNjNhZWZlOWQwNmJhNTFkMjIxYTRiMjYzZDkzNGQ3NTUxNDIxYWNlOGY4ZWEyODY3ZjlhNGUwYTY=",
      processRrr: true,
      transactionId: `TRANS_${new Date().getTime()}`, // Generate a new transactionId for each transaction
      channel: "CARD,USSD", // Enable card and USSD channels
      extendedData: {
        customFields: [
          {
            name: "rrr",
            value: rrr // RRR to be processed
          }
        ]
      },
      onSuccess: function (response) {
        console.log('callback Successful Response', response);
      },
      onError: function (response) {
        console.log('callback Error Response', response);
      },
      onClose: function () {
        console.log("closed");
      }
    });
    paymentEngine.showPaymentWidget();
  };

  return (
    <div className="payment-success-container">
      <h1 className="payment-success-title">RRR DETAILS</h1>
      <p className="payment-success-info"><strong>Remita Retrieval Reference (RRR):</strong> {rrr}</p>
      <p className="payment-success-info"><strong>Description:</strong> {description}</p>
      <p className="payment-success-info"><strong>Amount:</strong> {amount}</p>
      <p className="payment-success-message">Thank you!! kindly visit any bank branch to make your payment.</p>
      <button className="payment-success-button" onClick={makePayment}>Initiate Payment</button>
      <button className="payment-success-button" onClick={handleCheckStatus}>Check Transaction Status</button>
      <button className="payment-success-button" onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default GenInvoice;
