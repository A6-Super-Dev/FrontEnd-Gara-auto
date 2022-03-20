import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import env from '../../../../common/config/interface/env';
import { useLocalStorage } from '../../../../common/hooks/LocalStorage';

export const SignUp = () => {
  const captchaRef = useRef<any>();
  const [localValue, setLocalValue] = useLocalStorage('test', '');
  const onSubmitWithReCAPTCHA = async (e: any) => {
    e.preventDefault();
    const token = await captchaRef.current?.executeAsync();
    console.log('token: ', token);
    // apply to form data
  };

  return (
    <div>
      <form action="submit" onSubmit={(e) => onSubmitWithReCAPTCHA(e)}>
        <button type="submit">Click me</button>
        <input type="text" aria-label="input" value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
        <ReCAPTCHA ref={captchaRef} sitekey={env.captchaSiteKey} size="invisible" badge="bottomleft" theme="light" />
      </form>
    </div>
  );
};
