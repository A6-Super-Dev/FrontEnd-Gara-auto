import {
  Autocomplete,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Chip,
  Box,
  CardActions,
} from '@mui/material';
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import './BrandItem.scss';
import {
  ColorSchema,
  ContainerGrey,
  MuiBrandButton,
  SecondContainerWhite,
  SubmitButtonStyle,
  TransparentBrandButton,
  TransparentButton,
} from '../../../components/MuiStyling/MuiStyling';
import clientService from '../../../services/clientService';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import { replaceDirtyImgUrls } from '../../../common/helper/image';

const allBrand = [
  { label: 'Bentley' },
  { label: 'BMW' },
  { label: 'Mercedes' },
  { label: 'Porsche' },
  { label: 'Rolls Royce' },
  { label: 'Bugatti' },
  { label: 'Lamborghini' },
  { label: 'Tesla' },
  { label: 'Ferrari' },
  { label: 'Vinfast' },
];

const allBodyType = [
  { label: 'Convertible' },
  { label: 'SUV' },
  { label: 'Sedan' },
  { label: 'Coupe' },
  { label: 'Hatchback' },
];
const allPrice = [
  { label: 'Under 1,000,000,000VNĐ' },
  { label: 'From 1,000,000,000VNĐ to 3,000,000,000VNĐ' },
  { label: 'From 3,000,000,000VNĐ to 5,000,000,000VNĐ' },
  { label: 'From 5,000,000,000VNĐ to 10,000,000,000VNĐ' },
  { label: 'From 10,000,000,000VNĐ to 20,000,000,000VNĐ' },
  { label: 'Over 20,000,000,000VNĐ' },
];
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const allSeat = [{ label: '2' }, { label: '4' }, { label: '5' }, { label: '7' }];

interface BrandItemAttributes {
  id: string;
  name: string;
  descriptions: string;
  shortDescriptions: string;
  brandImg: string;
  descriptionImgs: string;
}

interface CarImgAttributes {
  introImgs: string;
  imgs: string;
}

interface CarAttributes {
  id: string;
  name: string;
  price: string;
  seat: string;
  carAppearance: CarImgAttributes;
}

export const BrandItem: React.FC = () => {
  const { brandName } = useParams<string>();
  const [brandItemAPI, setBrandItemAPI] = React.useState<BrandItemAttributes>({
    id: '',
    name: '',
    descriptions: '',
    shortDescriptions: '',
    brandImg: '',
    descriptionImgs: '',
  });
  const [carInfoAPI, setCarInfoAPI] = React.useState<Array<CarAttributes>>([]);

  const { imgObj, downloadImgsFromFirebase } = useFetchImgs();
  const originalImgs = useMemo(() => {
    return replaceDirtyImgUrls(brandItemAPI.descriptionImgs.split(`","`)).map((url: string) => {
      return '..' + url;
    });
  }, [brandItemAPI.descriptionImgs]);

  const brandImgUrls = useMemo(() => {
    return brandItemAPI.descriptionImgs.split(`","`);
  }, [brandItemAPI.descriptionImgs]);

  React.useEffect(() => {
    window.scrollTo(0, 0); //scroll to top when convert form brand page to brand item page
    const fetchImgs = async () => {
      await downloadImgsFromFirebase({ brandImgs: brandImgUrls });
    };
    fetchImgs();
  }, [downloadImgsFromFirebase, brandImgUrls]);

  React.useEffect(() => {
    const getBrandApi = async (brand: string) => {
      try {
        const response = await clientService.getBrand(brand);
        setBrandItemAPI(response.brandInfo);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    const getCarByBrandNameApi = async (brand: string) => {
      try {
        const response = await clientService.getCarByBrandName(brand);
        setCarInfoAPI(response.cars);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    getBrandApi(brandName as string);
    getCarByBrandNameApi(brandName as string);
  }, [brandName]);

  const handleBrandName = () => {
    if (brandName === 'bmw') return 'BMW';
    if (brandName === 'rolls-royce') return 'Rolls Royce';
    return capitalizeFirstLetter(brandName as string);
  };

  const shortcutDescription = (des: string) => {
    if (des?.length >= 400) return des?.slice(0, 400) + '...';
    return des + '...';
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleBrandDescription = (description: string) => {
    let newDes: any = description?.slice(1, -1);
    newDes = newDes.split('\\n').map((el: any) => {
      return el;
    });
    const temp = newDes.splice(0, newDes.length / 2);
    return [...temp, ...newDes].join();
  };

  const modifiedDescription = useMemo(() => {
    let temp = handleBrandDescription(brandItemAPI?.descriptions as string)
      .replaceAll(',', '')
      .replaceAll(`\\`, '');
    originalImgs.forEach((originalImg, idx) => {
      if (imgObj?.brandImgs?.length > 0) {
        temp = temp
          .replaceAll(originalImg, imgObj?.brandImgs[idx])
          .replaceAll(originalImg.split('..')[1], imgObj?.brandImgs[idx]);
      }
    });
    return temp;
  }, [brandItemAPI.descriptions, imgObj.brandImgs, originalImgs]);

  const getImgFromAPI = (img: string) => {
    const handleImg1 = img.split(',');
    const handleImg2 = handleImg1.map((item) =>
      item.replaceAll('"', '').replaceAll('"', '').replace('[', '').replace(']', ''),
    );
    return handleImg2[1];
  };

  return (
    <Container maxWidth={false} className="brand_item-container mt-12">
      <Box sx={{ minHeight: '100vh' }} className="brand_item-background">
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
          <TransparentButton href="#all-car" variant="outlined">
            Discover
          </TransparentButton>
        </Box>
      </Box>

      <SecondContainerWhite maxWidth={false} id="all-car">
        <div className="brand_item-introduction">
          <div className="all-brand-body_type py-4">
            <Autocomplete
              disablePortal
              sx={{ width: '15rem', marginLeft: '1rem' }}
              options={allBrand}
              renderInput={(params) => <TextField {...params} label="Brand" />}
            />
            <Autocomplete
              disablePortal
              sx={{ width: '15rem', marginLeft: '1rem' }}
              options={allBodyType}
              renderInput={(params) => <TextField {...params} label="Bodytype" />}
            />
          </div>
          <div className="brand-short-description p-4">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <img src={brandItemAPI?.brandImg} alt="" />
              </Grid>
              <Grid item xs={12} md={8}>
                <div
                  className="mb-4 text-justify leading-6"
                  dangerouslySetInnerHTML={{ __html: shortcutDescription(modifiedDescription) }}
                ></div>
                <TransparentBrandButton className="see-more" href="#brand-detail" variant="outlined">
                  See more
                </TransparentBrandButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </SecondContainerWhite>

      <ContainerGrey maxWidth={false}>
        <div className="brand_item-main">
          <Typography
            variant="h3"
            sx={{ textAlign: 'left', color: ColorSchema.Black, marginBottom: '2rem' }}
            fontFamily="ui-serif"
          >
            {handleBrandName()}
          </Typography>

          <Grid container>
            <Autocomplete
              disablePortal
              sx={{ paddingRight: '2rem', maxWidth: '17rem', marginBottom: '1rem' }}
              options={allPrice}
              renderInput={(params) => <TextField {...params} label="Price" />}
            />
            <Autocomplete
              disablePortal
              sx={{ paddingRight: '2rem', maxWidth: '17rem', marginBottom: '2rem' }}
              options={allSeat}
              renderInput={(params) => <TextField {...params} label="Seat" />}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Order by</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="asc" control={<Radio />} label="ASC" />
                <Stack direction="row" spacing={1}>
                  <Chip label="Car name" variant="outlined" />
                  <Chip label="Price" variant="outlined" onDelete={handleDelete} />
                </Stack>
                <FormControlLabel value="desc" control={<Radio />} label="DESC" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid container>
            {carInfoAPI.map((item, index) => {
              console.log(item.name.toLocaleLowerCase());

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={12 / 5} sx={{ padding: '0.5rem' }} key={index}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        className="h-36 object-fill"
                        component="img"
                        image={
                          item.carAppearance.introImgs.length > 5
                            ? getImgFromAPI(item.carAppearance.introImgs)
                            : getImgFromAPI(item.carAppearance.imgs)
                        }
                        alt="green iguana"
                      />
                      <CardContent sx={{ paddingInline: '1.5rem', minHeight: '9rem' }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography fontSize="0.875rem" color="text.secondary">
                          {`From: ${item.price}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <MuiBrandButton variant="contained" type="button" style={SubmitButtonStyle}>
                        <Link to={`/car-detail/${item.name.toLocaleLowerCase()}`} className="text-center">
                          Discover more
                        </Link>
                      </MuiBrandButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </ContainerGrey>

      <SecondContainerWhite>
        <div className="brand_item-detail  mt-12" id="brand-detail">
          <div className="brand-detail-description p-4">
            <div
              className="render-detail mb-4 leading-7"
              dangerouslySetInnerHTML={{ __html: modifiedDescription }}
            ></div>
          </div>
        </div>
      </SecondContainerWhite>
    </Container>
  );
};
