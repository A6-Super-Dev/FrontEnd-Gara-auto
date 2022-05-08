import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, CardActionArea, Pagination, PaginationItem, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import clientService from '../../../services/clientService';
import './Blogs.scss';
import { removeTagsFromString } from '../../../common/helper/string';
import { replaceDirtyImgUrls } from '../../../common/helper/image';
import { useFetchImgs } from '../../../common/hooks/useFetchImgs';

export const Blogs = () => {
  const [blogs, setBlogs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { getImgFromFirebase } = useFetchImgs();

  const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(() => true);
      const response = await clientService.getBlogs(currentPage);
      const res = response.data.result;
      const reformattingBlogs = await Promise.all(
        res.map(async (blog: any) => {
          const regExp = /[a-zA-Z]/g;
          const blogImgs: string = replaceDirtyImgUrls(blog?.descriptionImgs)?.[0];
          if (blogImgs) {
            blog.descriptionImgs = await getImgFromFirebase(blogImgs);
          }
          blog.descriptions = removeTagsFromString(blog.descriptions.slice(0, 1000))
            .split(`","`)
            .filter((str) => {
              return regExp.test(str);
            })
            .join()
            .replaceAll(`\\`, '')
            .replaceAll(`.,`, '. ')
            .replaceAll('&nbsp;', '');
          const firstTwo = blog.descriptions.slice(0, 2);
          if (firstTwo === `["`) {
            blog.descriptions = blog.descriptions.slice(2);
          }
          return blog;
        }),
      );
      setBlogs(() => reformattingBlogs);
      setLoading(() => false);
    };
    fetchBlogs();
  }, [currentPage, getImgFromFirebase]);

  useEffect(() => {
    if (loading !== true) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading]);

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '154px', marginBottom: '100px' }}>
        <Box className="blog-news">Tin tức</Box>
        <Box className="blogs-container">
          {blogs.map((blog: any, idx: number) => {
            return (
              <Box key={idx} sx={{ marginBottom: '1rem' }}>
                <Card className="item-container">
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardContent sx={{ height: '100%' }}>
                      <Grid container sx={{ height: '100%' }}>
                        <Grid item sm={4} xs={12} sx={{ height: '100%' }}>
                          <img src={blog.descriptionImgs} />
                        </Grid>
                        <Grid item sm={8} xs={12} sx={{ height: '100%' }}>
                          <Box className="blog-content-container">
                            <Box className="blog-content-title">{blog.title}</Box>
                            <Box className="descriptions-container">{blog.descriptions}</Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            );
          })}
        </Box>
        <Box className="blogs-pagination-contaier">
          <Pagination
            count={10}
            shape="rounded"
            onChange={changePage}
            renderItem={(item: any) => {
              if (item.selected && loading) {
                return <CircularProgress key={item.page} sx={{}} size={20}></CircularProgress>;
              }
              return <PaginationItem key={item.page} {...item} />;
            }}
          ></Pagination>
        </Box>
      </Container>
    </>
  );
};
