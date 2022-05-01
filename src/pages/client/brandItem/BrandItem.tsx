import { Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import './BrandItem.scss';
import { ColorSchema, ContainerGrey } from '../../../components/MuiStyling/MuiStyling';

export const BrandItem: React.FC = () => {
  const { brandName } = useParams<string>();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleBrandName = () => {
    if (brandName === 'bmw') return 'BMW';
    if (brandName === 'rolls-royce') return 'Rolls Royce';
    return capitalizeFirstLetter(brandName as string);
  };

  return (
    <Container maxWidth={false} className="brand_item-container">
      <ContainerGrey maxWidth={false}>
        <Typography
          variant="h3"
          sx={{ textAlign: 'left', color: ColorSchema.LightGreen, marginBottom: '2rem', marginTop: '3rem' }}
          fontFamily="ui-serif"
        >
          {handleBrandName()}
        </Typography>
      </ContainerGrey>
    </Container>
  );
};
