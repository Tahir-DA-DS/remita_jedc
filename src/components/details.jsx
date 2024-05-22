import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateRRR, savePaymentDetails } from '../remitaServices';

function DetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const handlePaymentInitiation = async () => {
    const paymentDetails = {
      name: state.name,
      email: state.email,
      phone: state.phone,
      amount: state.productPrices[state.meter],
      description: "Payment for Jos Electric Distribution Company"
    };

    try {
      const rrrData = await generateRRR(paymentDetails);
      console.log("API Response:", rrrData); // Log the entire response
      if (rrrData && rrrData.RRR) {
        paymentDetails.rrr = rrrData.RRR;
        await savePaymentDetails(paymentDetails);
        navigate("/gen-invoice", { state: { 
          rrr: rrrData.RRR, 
          amount: formatCurrency(state.productPrices[state.meter]), 
          description: paymentDetails.description 
        } });
      } else {
        console.error("RRR property is missing or incorrect.");
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);
    }
  };

  return (
    <div className="details-container">
      <h1 className="details-title">Summary</h1>
      <p className="details-info">
        <strong>Disco:</strong> JED
      </p>
      <p className="details-info">
        <strong>Name:</strong> {state.name}
      </p>
      <p className="details-info">
        <strong>Phone:</strong> {state.phone}
      </p>
      <p className="details-info">
        <strong>Landlord's Name:</strong> {state.landlord}
      </p>
      <p className="details-info">
        <strong>Map ID:</strong> {state.mapId}
      </p>
      <p className="details-info">
        <strong>Meter Type:</strong> {state.meter}
      </p>
      <p className="details-info">
        <strong>Meter Price:</strong> {formatCurrency(state.productPrices[state.meter])}
      </p>
      <p className="details-info">
        <strong>Vendor:</strong> Skyrun Electric Power Technology
      </p>
      <div className="button-group">
        <button className="button" onClick={handlePaymentInitiation}>
          Generate Remita Reference
        </button>
      </div>
    </div>
  );
}

export default DetailsPage;
