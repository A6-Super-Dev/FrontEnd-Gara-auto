import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const SignUp = () => {
  const captchaRef = useRef<any>();

  const onSubmitWithReCAPTCHA = async (e: any) => {
    e.preventDefault();
    const token = await captchaRef.current?.executeAsync();
    // apply to form data
  };

  return (
    <div>
      <form action="submit" onSubmit={(e) => onSubmitWithReCAPTCHA(e)}>
        <button type="submit">Click me</button>
        <ReCAPTCHA
          ref={captchaRef}
          sitekey="6Lf6oXEeAAAAADGrUvbcZJaIvw21bx1qoyyHFHgY"
          size="invisible"
          badge="bottomleft"
          theme="light"
        />
      </form>
    </div>
  );
};
