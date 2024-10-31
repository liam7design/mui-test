import React, { useState, useEffect } from 'react';
import { Box, Card, Chip, Typography, Stack, styled, Divider } from '@mui/material';
import { blue, green, orange } from '@mui/material/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import Chart from '../components/Chart';
import realEstateData from '../data/realEstateData.json';

const UnitInfo = styled(Typography)({
  textAlign: 'right',
  color: '#757575',
  fontSize: '0.75rem',
  whiteSpace: 'nowrap',
});

const UnitDate = styled(Typography)({
  color: '#757575',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
});

// 단일 가격 정보 카드 컴포넌트 정의
const PriceCard = ({ label, size, highest, lowest, highestDate, lowestDate }) => {
  // label 값에 따라 Chip 색상 결정
  const getBackgroundColor = (label) => {
    switch (label) {
      case '매매':
        return blue[500];
      case '전세':
        return green[500];
      case '월세':
        return orange[500];
      default:
        return 'primary';
    }
  };
  return (
    <Card variant='outlined' sx={{ mt: 1 }}>
      <Box sx={{ pl: 1, pr: 3, pt: 1, pb: 1 }}>
        <Stack direction="row" sx={{ alignContent: 'center', alignItems: 'center' }}>
          <Stack sx={{ minWidth: '8rem', alignItems: 'center' }}>
            <Chip label={label} sx={{ width: '4rem', fontSize: '0.875rem', color: 'white', backgroundColor: getBackgroundColor(label), fontWeight: '600' }} />
            <Typography variant="h6" component="p" mt={0.5}>{size}</Typography>
          </Stack>
          <Stack sx={{ flexGrow: 1, ml: 2 }}>
            <PriceDetail label="최고" price={highest} date={highestDate} />
            <Divider sx={{ borderStyle: 'dotted', borderColor: 'grey.300' }} />
            <PriceDetail label="최저" price={lowest} date={lowestDate} />
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

// 최고 및 최저 가격 정보 컴포넌트 정의
const PriceDetail = ({ label, price, date }) => (
  <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', pt: 1, pb: 1 }}>
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <Typography variant="body2" component="span">{label}</Typography>
      <Typography variant="body1" component="span" sx={{ fontWeight: '600' }}>{price}</Typography>
    </Stack>
    <UnitDate>{date}</UnitDate>
  </Stack>
);

const RealEstateInfo = () => {
  const [paddingValue, setPaddingValue] = useState('1rem');

  useEffect(() => {
    // 화면 크기에 따라 패딩 값 업데이트하는 함수 정의
    const updatePadding = () => {
      setPaddingValue(window.innerWidth >= 600 ? '1.5rem' : '1rem');
    };
    // 초기 로드 및 윈도우 리사이즈 시 패딩 업데이트
    updatePadding();
    window.addEventListener('resize', updatePadding);

    return () => window.removeEventListener('resize', updatePadding);
    
  }, []);

  return (
    <Box sx={{ ml: { xs: -2, sm: -3 }, mr: { xs: -2, sm: -3 } }}>
      <Swiper 
        spaceBetween={24} 
        slidesPerView={1}
        style={{ paddingLeft: paddingValue, paddingRight: paddingValue }}
      >
        {realEstateData.map((property, index) => (
          <SwiperSlide key={index}>
            <Stack direction="row" sx={{ alignContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip size="small" color="primary" label={property.propertyType} sx={{ pl: 1, pr: 1 }} />
              <Typography variant="body1" component="p">
                {property.address}
              </Typography>
            </Stack>
            <Chart />
            <UnitInfo>단위 : 만원</UnitInfo>
            {property.priceDetails.map((detail, idx) => (
              <PriceCard
                key={idx}
                label={detail.label}
                size={detail.size}
                highest={detail.highest}
                lowest={detail.lowest}
                highestDate={detail.highestDate}
                lowestDate={detail.lowestDate}
              />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default RealEstateInfo;