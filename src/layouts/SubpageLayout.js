import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import getTitle from '../utils/getTitle';

const SubpageLayout = ({ children }) => {
  const location = useLocation();
  
  return (
    <>
      {/* 뒤로가기 버튼과 제목 표시 */}
      <Header title={getTitle(location.pathname)} showBackButton />
      <main>
        <Container sx={{ 
          pt: { xs: 4, sm: 6 }, 
          pb: { xs: 4, sm: 6 },
          textAlign: 'left',
        }}>{children}</Container>
      </main>
    </>
  );
};

export default SubpageLayout;