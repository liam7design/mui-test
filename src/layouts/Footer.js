import React from 'react';
import { Typography, styled } from '@mui/material';

const Copyright = styled(Typography)(({ theme }) => ({
  
  color: '#d0d0d0',
  borderTop: '0.063rem solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: (theme.vars || theme).palette.text.primary,
}));


const Footer = () => {
  return (
    <>
      <Copyright variant="body2" p={1}>@ 2024 SWISIGN Corp. All rights reserved.</Copyright>
    </>
  )
};

export default Footer;