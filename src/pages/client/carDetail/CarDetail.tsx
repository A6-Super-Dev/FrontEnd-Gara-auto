import React, { useState, useEffect, memo, useRef } from 'react';
import { Box, Container, Grid, Typography, TextField, Avatar, IconButton } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import './CarDetail.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { UndefinedObject } from '../../../common/interfaces/Client';
import { DarkAccordion } from '../../../components/MuiStyling/MuiStyling';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';
import clientService from '../../../services/clientService';
import { ImageGallary } from '../../../components/ImageGallary/ImageGallery';
import { useAppSelector } from '../../../common/hooks/ReduxHook';
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
  const { downloadImgsFromFirebase } = useFetchImgs();
  const [comment, setComment] = useState<any>(undefined);
  const [carComments, setCarComments] = useState<any>([]);
  const [commentReactions, setCommentReactions] = useState<any>([]);
  const [sendingComment, setSendingComment] = useState(false);
  const commentRef = useRef<any>(null);
  const params: any = useParams();
  const userInfo: any = useAppSelector((globalState) => globalState.login.userInfo);

  //comment
  const onCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const keyDown = async (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    } else if (e.key === 'Enter') {
      setSendingComment(true);
      const result = await clientService.postComment({
        carId: carInfo.id,
        comment,
        parent: '',
        userId: userInfo.id,
      });

      setComment(() => '');
      commentRef.current.blur();
      commentRef.current.innerHTML = '';
      setSendingComment(false);
    }
  };

  //comment

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCar = async () => {
      const { comments, carInfo, commentReactions } = await clientService.getCar(
        params.car as string,
        +params?.id as any,
      );
      setCarInfo(carInfo);
      setCarComments(comments);
      setCommentReactions(commentReactions);
    };
    fetchCar();
  }, [params.car, params.id]);

  useEffect(() => {
    const resetComment = () => {
      const obj1: any = {};
      const obj2: any = {};
      const obj3: any = {};

      if (commentReactions.length > 0) {
        commentReactions.forEach((element: any) => {
          if (!obj1[element.commentId] && element.like === 1) {
            obj1[element.commentId] = 1;
          } else if (element.like === 1) {
            obj1[element.commentId]++;
          }
        });
      }
      if (commentReactions.length > 0) {
        commentReactions.forEach((element: any) => {
          if (!obj2[element.commentId] && element.like === 0) {
            obj2[element.commentId] = 1;
          } else if (element.like === 0) {
            obj2[element.commentId]++;
          }
        });
      }

      const currUserReactions = commentReactions.filter((comment: any) => {
        return comment.userId === userInfo.id;
      });

      currUserReactions.forEach((reaction: any) => {
        if (reaction.like === 1) {
          obj3[reaction.commentId] = 'like';
        } else if (reaction.dislike === 1) {
          obj3[reaction.commentId] = 'dislike';
        } else {
          obj3[reaction.commentId] = 'none';
        }
      });
      setCarComments((comments: any) => {
        let tempComments = comments;
        tempComments = tempComments.map((comment: any) => {
          return {
            ...comment,
            like: obj1[comment.id] || 0,
            dislike: obj2[comment.id] || 0,
            status: obj3[comment.id],
          };
        });
        return tempComments;
      });
    };
    resetComment();
  }, [commentReactions, userInfo.id]);

  console.log('commentReactions', commentReactions);
  console.log('carComments', carComments);

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
        {/* <Container maxWidth="lg" className="car-container">
          <Grid
            container
            sx={{ height: '100%', borderColor: '#C3CAD8', borderWidth: '1px', borderRadius: '5px', padding: '15px' }}
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
                      {Object.keys(mainParams)?.map((carParam, idx) => {
                        return (
                          <>
                            <tr key={idx}>
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
                        <DarkAccordion
                          disableGutters={true}
                          defaultExpanded={[0].includes(idx) ? true : false}
                          key={idx}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon color="primary" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{element.title}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {carInfo?.[element.propName]?.split(`","`)?.map((el: string, idx: number) => {
                              return (
                                <p
                                  key={idx}
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
                                  <Grid container spacing={1}>
                                    {imgObj.introImgs?.map((img, idx) => {
                                      let gridSize = undefined;
                                      if (imgObj.introImgs) {
                                        gridSize = 12 / imgObj?.introImgs?.length;
                                      }
                                      return (
                                        <Grid key={idx} item sm={12} md={gridSize}>
                                          <img className={`img-intro-item`} src={img} alt="" />
                                        </Grid>
                                      );
                                    })}
                                  </Grid>
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
            <Grid item sm={12} md={4}>
              <div className="starring-container">
                <div className="car-staring">
                  <div className="starring-text">
                    <p>ĐIỂM ĐÁNH GIÁ</p>
                    <Rating name="half-rating" value={4.6} precision={0.5} readOnly />
                  </div>
                  <div className="starring-number">
                    <p className="text-lg text-red-500">4.6</p>
                    <p> / 10</p>
                  </div>
                </div>
              </div>
              <div className="related-cars-container">
                <div className="related-cars-text-wrapper">
                  <span className="related-cars-text">Xe liên quan</span>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container> */}
        <Container maxWidth="md" className="car-comments">
          <TextField
            label="Bình luận"
            multiline
            rows={4}
            fullWidth
            InputLabelProps={{ style: { fontSize: 18 } }}
            onChange={onCommentChange}
            onKeyDown={keyDown}
            className="writing-comment-area"
            value={comment}
            inputRef={commentRef}
            disabled={sendingComment}
          />
          <Box className="comments-area">
            {carComments.map((comment: any, idx: number) => {
              return (
                <>
                  <Box className={`comment-wrapper ${idx % 2 && 'slight-gray-bg'}`}>
                    <Box className="user-avatar">
                      <Avatar src={comment.userInfo.info.avatar} alt="" sx={{ width: 56, height: 56 }} />
                    </Box>
                    <Box className="user-comment">
                      <Box className="user-name">
                        {comment?.userInfo?.info?.firstName} {comment?.userInfo?.info?.lastName}
                      </Box>
                      <Box className="comment">{comment?.comment}</Box>
                      <Box className="like-dislike-area">
                        <Box className="like-area">
                          {userInfo.id === comment.userId && comment.status === 'like' ? (
                            <>
                              <IconButton>
                                <ThumbUpIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton>
                                <ThumbUpOutlinedIcon />
                              </IconButton>
                            </>
                          )}
                          &nbsp; {comment.like}
                        </Box>
                        <Box className="dislike-area">
                          {userInfo.id === comment.userId && comment.status === 'dislike' ? (
                            <>
                              <IconButton>
                                <ThumbDownIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton>
                                <ThumbDownOutlinedIcon />
                              </IconButton>
                            </>
                          )}
                          &nbsp; {comment.dislike}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default memo(CarDetail);
