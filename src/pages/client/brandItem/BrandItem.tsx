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
} from '@mui/material';
import React, { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './BrandItem.scss';
import {
  ColorSchema,
  ContainerGrey,
  SecondContainerWhite,
  TransparentBrandButton,
} from '../../../components/MuiStyling/MuiStyling';
import { CAR_OF_BRAND } from '../../../common/constants/fakeData';
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
  const { imgObj, downloadImgsFromFirebase } = useFetchImgs();
  const originalImgs = useMemo(() => {
    return replaceDirtyImgUrls(brandItemAPI.descriptionImgs.split(`","`)).map((url: string) => {
      return '..' + url;
    });
  }, [brandItemAPI.descriptionImgs]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    const getBrandApi = async (brand: string) => {
      try {
        const response = await clientService.getBrand(brand);
        setBrandItemAPI(response.brandInfo);
      } catch (error: any) {
        console.log(error.response);
      }
    };
    getBrandApi(brandName as string);
  }, [brandName]);

  const brandImgUrls = useMemo(() => {
    return brandItemAPI.descriptionImgs.split(`","`);
  }, [brandItemAPI.descriptionImgs]);

  React.useEffect(() => {
    const fetchImgs = async () => {
      await downloadImgsFromFirebase({ brandImgs: brandImgUrls });
    };
    fetchImgs();
  }, [downloadImgsFromFirebase, brandImgUrls]);

  const handleBrandName = () => {
    if (brandName === 'bmw') return 'BMW';
    if (brandName === 'rolls-royce') return 'Rolls Royce';
    return capitalizeFirstLetter(brandName as string);
  };

  const shortcutDescription = (des: string) => {
    const newDes = handleBrandDescription(des);
    // if (newDes?.length >= 400) return newDes?.slice(0, 400) + '...';
    return newDes + '...';
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
      .replaceAll('>,', '>')
      .replaceAll(`\\`, '');
    originalImgs.forEach((originalImg, idx) => {
      if (imgObj?.brandImgs?.length > 0) {
        temp = temp
          .replaceAll(originalImg, imgObj?.brandImgs[idx])
          .replaceAll(originalImg.split('..')[1], imgObj?.brandImgs[idx]);
      }
    });
    temp = temp.slice(1, -1);
    if (temp[temp.length - 1] === `"`) {
      temp = temp.slice(0, -1);
    }
    return temp;
  }, [brandItemAPI.descriptions, imgObj.brandImgs, originalImgs]);

  return (
    <Container maxWidth={false} className="brand_item-container mt-12">
      <SecondContainerWhite>
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
            {/* {SHORT_DESCRIPTION.map((item, index) => (
              <Grid container key={index} spacing={4}>
                <Grid item xs={4}>
                  <img src={brandItemAPI?.brandImg} alt="" />
                </Grid>
                <Grid item xs={8}> */}
            {/* <div
                    className="mb-4 text-justify leading-6"
                    dangerouslySetInnerHTML={{ __html: shortcutDescription(brandItemAPI?.descriptions as string) }}
                  ></div> */}
            {/* <TransparentBrandButton className="see-more" href="#brand-detail" variant="outlined">
                    See more
                  </TransparentBrandButton>
                </Grid>
              </Grid>
            ))} */}
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
            <Grid sm={12} lg={3}>
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
                  <FormControlLabel value="female" control={<Radio />} label="ASC" />
                  <Stack direction="row" spacing={1}>
                    <Chip label="Brand name" variant="outlined" />
                    <Chip label="Price" variant="outlined" onDelete={handleDelete} />
                  </Stack>
                  <FormControlLabel value="male" control={<Radio />} label="DESC" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid container xs={12} lg={9}>
              {CAR_OF_BRAND.map((item, index) => (
                <Grid xs={12} md={6} xl={4} sx={{ padding: '0.5rem' }} key={index}>
                  <Card>
                    <CardActionArea>
                      <CardMedia className="h-36 object-fill" component="img" image={item.img} alt="green iguana" />
                      <CardContent sx={{ paddingInline: '1.5rem', minHeight: '9rem' }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography fontSize="0.875rem" color="text.secondary">
                          {`From: ${item.price}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      </ContainerGrey>

      <SecondContainerWhite>
        <div className="brand_item-detail  mt-12" id="brand-detail">
          <div className="brand-detail-description p-4">
            <div
              className="render-detail mb-4 text-justify leading-7"
              dangerouslySetInnerHTML={{ __html: modifiedDescription }}
            ></div>
          </div>
        </div>
      </SecondContainerWhite>
    </Container>
  );
};
