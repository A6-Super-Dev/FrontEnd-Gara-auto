import React, { useState, useEffect, memo } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';

import './CarDetail.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { DarkAccordion } from '../../../../components/MuiStyling/MuiStyling';
import { ImageGallary } from '../../../../components/ImageGallary/ImageGallery';
import clientService from '../../../../services/clientService';
import { UndefinedObject } from '../../../../common/interfaces/Client';
import { useFetchImgs } from '../../../../common/hooks/useFetchImgs';

const accordionProps: Array<UndefinedObject> = [
  {
    title: '1. Giới thiệu',
    propName: 'introReview',
  },
  { title: '2. Nội thất', propName: 'interiorReview' },
  { title: '3. Ngoại thất', propName: 'exteriorReview' },
  { title: '4. Tiện nghi', propName: 'amenityReview' },
  { title: '5. An toàn', propName: 'safetyReview' },
];
const mainParams: UndefinedObject = {
  design: 'Thiết kế',
  engine: 'Động cơ',
  gear: 'Hộp số',
  capacity: 'Dung tích(cc)',
  seats: 'Chỗ ngồi',
  yearOfManufacture: 'Năm sản xuất',
};

const CarDetail: React.FC = () => {
  const [carInfo, setCarInfo] = useState<any>(undefined);
  const { imgObj, downloadImgsFromFirebase } = useFetchImgs();
  const params = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      const carInfo = await clientService.getCar(params.car as string);
      setCarInfo(carInfo.result);
    };
    fetchCar();
  }, [params.car]);
  useEffect(() => {
    const fetchAllImgs = async () => {
      if (carInfo !== undefined) {
        downloadImgsFromFirebase({
          imgs: carInfo.carAppearance.newImgs.split(`","`),
          introImgs: carInfo.carAppearance.newIntroImgs.split(`","`),
          exteriorReviewImgs: carInfo.carAppearance.newExteriorReviewImgs.split(`","`),
          interiorReviewImgs: carInfo.carAppearance.newInteriorReviewImgs.split(`","`),
        });
      }
    };
    fetchAllImgs();
  }, [carInfo, downloadImgsFromFirebase]);
  return (
    <Container maxWidth={false}>
      <Box sx={{ marginTop: '154px' }}>
        <Container maxWidth="lg">
          <Grid
            container
            sx={{ height: '500px', borderColor: '#C3CAD8', borderWidth: '1px', borderRadius: '5px', padding: '15px' }}
          >
            <Grid item sm={12} md={7}>
              <ImageGallary urls={imgObj.imgs} />
            </Grid>
            <Grid item sm={12} md={5}>
              <div className="car-main-params-wrapper">
                <div className="car-main-params">
                  <h1 className="car-title">
                    <strong>{carInfo?.name}</strong>
                  </h1>
                  <p className="car-price">{carInfo?.price}</p>
                  <div className="table-title">
                    <strong>Thông số chính</strong>
                  </div>
                  <table className="car-table-main-param">
                    <tbody>
                      {Object.keys(mainParams)?.map((carParam) => {
                        return (
                          <>
                            <tr key={carParam}>
                              <td className="table-first-el">
                                <strong>{mainParams[carParam]}</strong>
                              </td>
                              {carInfo && <td className="table-second-el">{carInfo?.[carParam]}</td>}
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg" sx={{ marginTop: '5rem' }}>
          <Grid container>
            <Grid item sm={12} md={8}>
              <div className="car-descriptions">
                {carInfo !== undefined && (
                  <>
                    {accordionProps?.map((element, idx) => {
                      return (
                        <DarkAccordion disableGutters={true} defaultExpanded key={idx}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon color="primary" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{element.title}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {carInfo?.[element.propName]?.split(`","`)?.map((el: string) => {
                              return (
                                <p
                                  key={el}
                                  className={`${el.includes('strong') && 'car-p-strong'}`}
                                  dangerouslySetInnerHTML={{ __html: el.replaceAll(`"]`, '').replaceAll(`["`, '') }}
                                ></p>
                              );
                            })}
                            {accordionProps[idx].propName === 'interiorReview' ||
                            accordionProps[idx].propName === 'exteriorReview' ? (
                              <div style={{ marginTop: '2rem' }}>
                                <ImageGallary
                                  urls={
                                    accordionProps[idx].propName === 'interiorReview'
                                      ? imgObj.interiorReviewImgs
                                      : imgObj.exteriorReviewImgs
                                  }
                                />
                              </div>
                            ) : (
                              <>
                                {accordionProps[idx].propName === 'introReview' && (
                                  <div className="introImg-wrapper">
                                    {imgObj.introImgs?.map((img) => {
                                      return <img className={`img-${imgObj.introImgs.length}`} key={img} src={img} />;
                                    })}
                                  </div>
                                )}
                              </>
                            )}
                          </AccordionDetails>
                        </DarkAccordion>
                      );
                    })}
                  </>
                )}
              </div>
            </Grid>
            <Grid item sm={12} md={4} sx={{ borderColor: '#C3CAD8', borderWidth: '1px', borderRadius: '5px' }}>
              <div className="car-staring">
                <div className="starring-text">
                  <p>Diem danh gia</p>
                  <p>1 sao</p>
                </div>
                <div className="starring-number">
                  <p>8.6</p> <p> / 10</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default memo(CarDetail);
