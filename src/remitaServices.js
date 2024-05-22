import axios from 'axios';
import CryptoJS from 'crypto-js';

const generateRRR = async (paymentDetails) => {
  // const merchantId = process.env.REACT_APP_REMITA_MERCHANT_ID;
  // const apiKey = process.env.REACT_APP_REMITA_API_KEY;
  // const serviceTypeId = process.env.REACT_APP_REMITA_SERVICE_TYPE_ID;
var merchantId = "2547916";
var apiKey ="1946";
var serviceTypeId ="4430731"

  const orderId = `JED_${new Date().getTime()}`;

  const requestBody = {
    serviceTypeId: serviceTypeId,
    amount: paymentDetails.amount,
    payerName: paymentDetails.name,
    payerEmail: paymentDetails.email,
    payerPhone: paymentDetails.phone,
    orderId: orderId,
    description: paymentDetails.description
  };

  const apiHash = CryptoJS.SHA512(merchantId + serviceTypeId + orderId + requestBody.amount + apiKey).toString(CryptoJS.enc.Hex);
  const authorizationHeader = `remitaConsumerKey=${merchantId},remitaConsumerToken=${apiHash}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorizationHeader
    }
  };

  console.log('Request Body:', requestBody);

  try {
    const response = await axios.post('https://demo.remita.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit', requestBody, config);
    console.log('API response:', response.data);
    const responseString = JSON.stringify(response.data);
    const responseText = JSON.parse(responseString)
    const jsonData = responseText.slice(responseText.indexOf('(') + 1, responseText.lastIndexOf(')'));
    const responseObject = JSON.parse(jsonData)
    return responseObject
  } catch (error) {
    console.error('Error generating RRR:', error);
    throw error;
  }
};

const savePaymentDetails = async (paymentDetails) => {
  try {
    const response = await axios.post('http://localhost:8080/api/payments', paymentDetails);
    console.log('Payment details saved:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving payment details:', error);
    throw error;
  }
};

const checkTransactionStatus = async (rrr) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/check-transaction-status/${rrr}`);
    console.log('Transaction status:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error checking transaction status:', error);
    throw error;
  }
};

const updatePaymentStatus = async (rrr, paymentStatus) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/payments/${rrr}`, { paymentStatus });
    console.log('Payment status updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

export { generateRRR, savePaymentDetails, checkTransactionStatus, updatePaymentStatus};
