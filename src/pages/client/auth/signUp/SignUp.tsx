import { Formik as FormValidation } from 'formik';
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import './SignUp.scss';
import Auth from '../../../../common/interfaces/Auth';
import { AuthForm, ImageSide } from '../../../../components/AuthForm/AuthForm';
import env from '../../../../common/config/interface/env';
import { useLocalStorage } from '../../../../common/hooks/LocalStorage';

interface SignUpObject {
  email: string;
  password: string;
}

interface SignUpFormInitValue {
  email: string;
  password: string;
  reTypePassword: string;
}

export const SignUp = () => {
  const captchaRef = useRef<any>();
  const [localValue, setLocalValue] = useLocalStorage('test', '');
  console.log('localValue', localValue);
  const onSubmitWithReCAPTCHA = async (e: any) => {
    e.preventDefault();
    const token = await captchaRef.current?.executeAsync();
    console.log('token: ', token);
    setLocalValue(token);
    // apply to form data
  };

  return (
    <AuthForm imageSide={ImageSide.LEFT}>
      <div className="sign_up-container">
        <h1 className="sign_up-heading">Sign Up</h1>

        <FormValidation
          initialValues={{ firstName: '', lastName: '', email: '', password: '', reTypePassword: '' }}
          validationSchema={Auth.clientSignUpSchema}
          onSubmit={(values: SignUpFormInitValue, { setSubmitting }) => {
            setSubmitting(false);
          }}
        ></FormValidation>
        <div>
          <form action="submit" onSubmit={(e) => onSubmitWithReCAPTCHA(e)}>
            <button type="submit">Click me to get Captcha code :</button>
            <input type="text" aria-label="input" value={localValue} onChange={(e) => setLocalValue(e.target.value)} />
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={env.captchaSiteKey}
              size="invisible"
              badge="bottomleft"
              theme="light"
            />
          </form>
        </div>
      </div>
    </AuthForm>
  );
};
