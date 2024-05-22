const loadRemitaScript = () => {
    return new Promise((resolve, reject) => {
      if (window.RmPaymentEngine) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = 'https://remitademo.net/payment/v1/remita-pay-inline.bundle.js';
      script.onload = () => {
        if (window.RmPaymentEngine) {
          resolve();
        } else {
          reject(new Error('Remita script not loaded'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Remita script'));
      document.body.appendChild(script);
    });
  };
  
  export default loadRemitaScript;