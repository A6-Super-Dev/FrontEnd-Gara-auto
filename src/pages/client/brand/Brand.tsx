import { Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { OUR_RECOMMENDATIONS } from '../../../common/constants/fakeData';
import { routerPath } from '../../../common/constants/routerPath';
import {
  ColorSchema,
  ContainerGrey,
  MuiBrandButton,
  SubmitButtonStyle,
  TransparentButton,
} from '../../../components/MuiStyling/MuiStyling';
import './Brand.scss';

export const Brand: React.FC = () => {
  const navigate = useNavigate();

  const handleClickBrandButton = (brandName: string) => {
    const numberOfString = brandName.split(' ');
    if (numberOfString.length === 1) {
      navigate(`${routerPath.common.BRAND}/${brandName}`);
    }

    const handleBrandName = numberOfString.reduce(
      (previousValue, currentValue) => previousValue + currentValue + '-',
      '',
    );
    const newBrandName = handleBrandName.slice(0, handleBrandName.length - 1); //xoá phần tử cuối của string
    return navigate(`${routerPath.common.BRAND}/${newBrandName}`);
  };

  return (
    <Container maxWidth={false} className="brand-container">
      <Box sx={{ minHeight: '100vh' }} className="brand-background">
        <Box
          sx={{
            paddingTop: '28vh',
            paddingLeft: '4vw',
          }}
        >
          <Typography variant="h2" color={'#ffffff'} mb={3} fontFamily="ui-serif">
            The new S-Brand
          </Typography>
          <Typography sx={{ opacity: '0.8' }} variant="h6" color={'#ffffff'} mb={10}>
            Cares for what matters.
          </Typography>
          <TransparentButton href="#all-brand" variant="outlined">
            Discover
          </TransparentButton>
        </Box>
      </Box>

      <ContainerGrey maxWidth={false} id="all-brand">
        <Typography
          variant="h3"
          sx={{ textAlign: 'left', color: ColorSchema.LightGreen, marginBottom: '2rem', marginTop: '1rem' }}
          fontFamily="ui-serif"
        >
          Our brands
        </Typography>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {OUR_RECOMMENDATIONS.map((item, index) => (
            <Grid xs={12} sm={6} md={4} lg={3} xl={12 / 5} sx={{ padding: '0.5rem' }} key={index}>
              <Card className="pb-8">
                <CardActionArea>
                  <CardMedia className="h-36 object-fill" component="img" image={item.img} alt="green iguana" />
                  <CardContent sx={{ paddingInline: '1.5rem', minHeight: '10rem' }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography fontSize="0.875rem" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <MuiBrandButton
                    onClick={() => handleClickBrandButton(item.name.toLocaleLowerCase())}
                    variant="contained"
                    type="button"
                    style={SubmitButtonStyle}
                  >
                    Discover more
                  </MuiBrandButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ContainerGrey>
    </Container>
  );
};
