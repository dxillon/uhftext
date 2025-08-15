// src/hooks/useNewsletter.ts
import { useState } from 'react';


// useNewsletter.ts
export const useNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Updated handleSubmit in useNewsletter.ts
const handleSubscribe  = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // 1. Use URLSearchParams instead of FormData (works better with Google Forms)
    const params = new URLSearchParams();
    params.append('entry.1950585060', email); // Your field ID
    
    // 2. Add additional required fields (Google Forms needs these)
    params.append('fvv', '1'); // Form validation version
    params.append('partialResponse', '[]'); 
    params.append('pageHistory', '0');
    params.append('fbzx', '-8165869038479999000'); // Random ID

    // 3. Use text/plain content type
    await fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdRVlY66CZQBOh_fxEd2mcu55OTSSbFsuh4dGg5H5QGndZ74g/formResponse',
      {
        method: 'POST',
        body: params,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    setIsSubscribed(true);
    setEmail('');
  } catch (error) {
    console.error('Submission error:', error);
  } finally {
    setIsLoading(false);
  }
};

  return { email, setEmail, isLoading, isSubscribed, handleSubscribe  };
};