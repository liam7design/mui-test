import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, List, ListItem, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const RecentPostsComponent = ({ title, link, detailLink, data, type }) => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setLatestPosts(sortedData.slice(0, 3)); // 최신 게시물 3개 가져오기
  }, [data]);
  
  // type에 따라 switch 문으로 레이아웃 구분
  switch (type) {

    case "youtube":
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography component="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</Typography>
            <Button variant="text" endIcon={<AddRoundedIcon />} component={Link} to={link}>더보기</Button>
          </Box>
          <Box sx={{ 
            ml: { xs: -2, sm: -3 },
            mr: { xs: -2, sm: -3 },
          }}>
            <Swiper
              spaceBetween={20}
              slidesPerView={1.6}
              freeMode={true} 
              style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
            >
              {latestPosts.map((item) => (
                <SwiperSlide key={item.id}>
                  <Card sx={{ width: '100%', borderRadius: 1, boxShadow: 'none' }}>
                    <CardActionArea sx={{ border: 1, borderColor: 'grey.300' }}>
                      <CardMedia component={Link} to={`/YoutubeDetail/${item.id}`} sx={{ display: 'block' }}>
                        <Box component="img" src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} alt={item.title} sx={{ width: '100%' }} />
                      </CardMedia>
                      <CardContent sx={{ pt: 1, pb: 2 }}>
                        <Typography component={Link} to={`/YoutubeDetail/${item.id}`} sx={{
                          display: 'block',
                          width: '100%',
                          color: 'text.primary',
                          textDecoration: 'none',
                          fontSize: '1rem',
                          fontWeight: 'medium',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}>{item.title}</Typography>
                        <Typography sx={{ mt: 0.5, fontSize: '0.875rem', color: 'grey.600' }}>{item.date}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </>
      );

    case "schedule":
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography component="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</Typography>
            <Button variant="text" endIcon={<AddRoundedIcon />} component={Link} to={link}>더보기</Button>
          </Box>
          <List sx={{ p: 0 }}>
            {latestPosts.map((item) => (
              <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center', p: 0, pt: 1.5, pb: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'medium' }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: 'grey.600' }}>{item.date}</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', color: 'primary.main' }}>{item.time}</Typography>
              </ListItem>
            ))}
          </List>
        </>
      );

    default:
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography component="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</Typography>
            <Button variant="text" endIcon={<AddRoundedIcon />} component={Link} to={link}>더보기</Button>
          </Box>
          <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
            {latestPosts.map((item) => (
              <ListItem key={item.id} sx={{ display: { xs: 'block', sm: 'flex' }, p: 0, pt: 1.5, pb: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                <Typography component={Link} to={`${detailLink}/${item.id}`} sx={{
                  display: 'block',
                  width: '100%',
                  pr: { xs: 0, sm: 4 },
                  color: 'text.primary',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 'medium',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>{item.title}</Typography>
                <Box sx={{
                  ml: 'auto',
                  mt: { xs: 1, sm: 0 },
                  color: 'grey.600',
                  fontSize: '0.875rem',
                }}>{item.date}</Box>
              </ListItem>
            ))}
          </List>
        </>
      );

  }

};

export default RecentPostsComponent;