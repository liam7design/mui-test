import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import NewsData from '../../data/NewsData.json';

const NewsDetailComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const boardItem = NewsData.find((item) => item.id === parseInt(id));

  if (!boardItem) {
    return <div>해당 게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Typography component="h3" sx={{ 
        fontSize: '1.75rem',
        fontWeight: 'medium',
        lineHeight: 1.3,
      }}>{boardItem.title}</Typography>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 3,
        color: 'grey.600',
        fontSize: '0.875rem',
      }}>
        <Box component="p" sx={{ m: 0 }}>등록일: {boardItem.date}</Box>
        <Box component="p" sx={{ m: 0 }}>조회수: {boardItem.views}</Box>
      </Box>
      <Box component="p" sx={{ 
        mt: 4, 
        mb: 4, 
        pt: 4, 
        pb: 4, 
        borderTop: 1, 
        borderBottom: 1, 
        borderColor: 'grey.200',
        color: 'grey.900',
        fontSize: '1.125rem',
        fontWeight: 'regular',
        lineHeight: 1.5,
      }}>{boardItem.content}</Box>

      <Button onClick={() => navigate(-1)}  variant="outlined" fullWidth>닫기</Button>

    </>
  );
};

export default NewsDetailComponent;