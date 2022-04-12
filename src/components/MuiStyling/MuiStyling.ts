import { TextField, Button } from '@mui/material';
import { withStyles, styled } from '@mui/styles';

export const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#909090 !important',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#909090 !important',
    },
    '& input:valid + fieldset': {
      borderColor: '#909090 !important',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: '#ff8886 !important',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important',
      borderColor: '#909090 !important',
    },
  },
})(TextField);

export const SubmitButtonStyle: React.CSSProperties = {
  marginTop: '0.6rem',
  textTransform: 'capitalize',
  paddingBlock: '8px',
  fontSize: '18px',
  fontWeight: '500',
  letterSpacing: '2px',
};

export const MuiButton = styled(Button)({
  background: '#008c7a',
  border: 0,
  borderRadius: 40,
  color: 'white',
  fontSize: '18px !important',
  height: '56px',
  letterSpacing: '1px !important',
});
