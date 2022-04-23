import React, { useState } from 'react';
import { Formik as FormValidation } from 'formik';

import './PasswordRecover.scss';
import { AuthForm, ImageSide } from '../../../../components/AuthForm/AuthForm';
import Auth from '../../../../common/interfaces/Auth';
import { CustomTextField, MuiButton, SubmitButtonStyle } from '../../../../components/MuiStyling/MuiStyling';
interface PasswordRecoverInitValue {
  email: string;
}

export const PasswordRecover: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <AuthForm imageSide={ImageSide.LEFT}>
      <div className="password_recover-container">
        <h1 className="password_recover-heading">Password Recover</h1>

        <h3 className="password_recover-heading_h3">Send to Gara Auto Email Address</h3>

        <h5 className="password_recover-heading_h5">Please enter your email address which you want to recover</h5>

        <FormValidation
          initialValues={{ email: '' }}
          validationSchema={Auth.clientPasswordRecoverSchema}
          onSubmit={(values: PasswordRecoverInitValue, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, touched, errors, values, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="password_recover-form">
              <CustomTextField
                id="outlined-email"
                label="Email"
                type="text"
                variant="outlined"
                value={values.email}
                name="email"
                style={{ marginTop: '2rem', marginBottom: '0.5rem' }}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="arronramsey@hotmail.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <MuiButton variant="contained" type="submit" disabled={loading} style={SubmitButtonStyle}>
                {!loading ? 'Start' : 'Loading...'}
              </MuiButton>
            </form>
          )}
        </FormValidation>
      </div>
    </AuthForm>
  );
};
