import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const BoardDetail = ({ data, type, showYoutube = false, showSource = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const boardItem = data.find((item) => item.id === parseInt(id));

  if (!boardItem) {
    return <Box>해당 게시물을 찾을 수 없습니다.</Box>;
  }

  // type에 따라 switch 문으로 레이아웃 구분
  switch (type) {
    case "sale":
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
          <Box sx={{ 
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
          }}>

            
            <Box>{boardItem.content}</Box>


          </Box>
          <Button onClick={() => navigate(-1)} variant="outlined" fullWidth>닫기</Button>
        </>
      );
    default:
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
          <Box sx={{ 
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
          }}>
            {showYoutube && (
              <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                <iframe
                  title={boardItem.title}
                  src={`https://www.youtube.com/embed/${boardItem.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                ></iframe>
              </Box>
            )}
            <Box>{boardItem.content}</Box>
            {showSource && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 3,
                color: 'grey.600',
                fontSize: '0.875rem',
              }}>[ 출처 : {boardItem.source} ]</Box>
            )}
          </Box>
          <Button onClick={() => navigate(-1)} variant="outlined" fullWidth>닫기</Button>
        </>
      );
  }
};

export default BoardDetail;