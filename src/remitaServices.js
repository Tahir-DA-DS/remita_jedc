import axios from 'axios';
import CryptoJS from 'crypto-js';

const generateRRR = async (paymentDetails) => {
//   const merchantId = process.env.REACT_APP_REMITA_MERCHANT_ID;
//   const apiKey = process.env.REACT_APP_REMITA_API_KEY;
//   const serviceTypeId = process.env.REACT_APP_REMITA_SERVICE_TYPE_ID;
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
    description: `Payment for Skyrun ${paymentDetails.meter}, with JED`
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

export default generateRRR;
