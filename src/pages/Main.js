import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, ButtonGroup, Button, Typography, styled } from '@mui/material';
import DefaultLayout from '../layouts/DefaultLayout';
import RecentPosts from '../components/board/RecentPosts';
import Banner from '../components/Banner';
import RealEstateInfo from '../components/RealEstateInfo';
import NoticeData from '../data/NoticeData.json';
import YoutubeData from '../data/YoutubeData.json';
import NewsData from '../data/NewsData.json';
import SaleData from '../data/SaleData.json';
import ScheduleData from '../data/ScheduleData.json';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';

// Button 스타일 정의, active 클래스에 따른 스타일 지정
const UserChoiceButton = styled(Button)(({ theme }) => ({
  color: (theme.vars || theme).palette.text.secondary,
  borderColor: '#d0d0d0',
  backgroundColor: '#f8f8f8',
  '&.active': {
    color: 'white',
    borderColor: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.text.primary,
  }
}));

const MainButton = styled(Button)({
  width: '100%',
  flexDirection: 'column', 
  alignItems: 'center', 
  justifyContent: 'center', 
  padding: '0.5rem 0',
  fontWeight: '500',
  '& > svg': {
    margin: 0, 
    marginBottom: '0.25rem', 
    fontSize: '1.875rem'
  }
});

const Main = () => {

  // 로컬 스토리지에서 저장된 activeButton 상태를 불러옴
  const [activeButton, setActiveButton] = useState(localStorage.getItem('activeButton') || 'userType1');

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (role) => {
    setActiveButton(role);
    localStorage.setItem('activeButton', role); // 선택한 버튼을 로컬 스토리지에 저장
  };

  useEffect(() => {
    const savedActiveButton = localStorage.getItem('activeButton');
    if (savedActiveButton) {
      setActiveButton(savedActiveButton); // 컴포넌트가 처음 마운트될 때 로컬 스토리지의 값으로 설정
    }
  }, []);

  return (
    <DefaultLayout>

      <Box mb={5}>
        <ButtonGroup variant="outlined" fullWidth>
          <UserChoiceButton
            onClick={() => handleButtonClick('userType1')}
            className={activeButton === 'userType1' ? 'active' : ''}
          >임차인</UserChoiceButton>
          <UserChoiceButton
            onClick={() => handleButtonClick('userType2')}
            className={activeButton === 'userType2' ? 'active' : ''}
          >임대인</UserChoiceButton>
          <UserChoiceButton
            onClick={() => handleButtonClick('userType3')}
            className={activeButton === 'userType3' ? 'active' : ''}
          >부동산중개인</UserChoiceButton>
        </ButtonGroup>
      </Box>

      {activeButton === 'userType1' && (
        <>
          <Box mb={5}>
            <Typography variant="h6">임차인 전용 콘텐츠</Typography>
            <Typography variant="body1">임차인을 위한 정보가 여기에 표시됩니다.</Typography>
          </Box>
        </>
      )}
      {activeButton === 'userType2' && (
        <>
          <Box mb={5}>
            <RealEstateInfo />
          </Box>
        </>
      )}
      {activeButton === 'userType3' && (
        <>
          <Box mb={5}>
            <RecentPosts
              title="매물요청 현황"
              link="/SaleList"
              detailLink="/SaleDetail"
              data={SaleData}
              type="sale"
            />
          </Box>
        </>
      )}

      <Box mb={2.5}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <MainButton variant="outlined"><GradingOutlinedIcon />전세계약작성</MainButton>
          <MainButton variant="outlined" component={Link} to='/MarketPrice'><MapOutlinedIcon />주변시세</MainButton>
          {activeButton === 'userType1' && (
            <MainButton variant="outlined" component={Link} to='/SafetyCheckList'><LibraryAddCheckOutlinedIcon />전세안전체크</MainButton>
          )}
          {activeButton === 'userType2' && (
            <MainButton variant="outlined" component={Link} to='/SaleRequest'><MapsHomeWorkOutlinedIcon />매물등록요청</MainButton>
          )}
        </Box>
      </Box>

      <Box mb={5}>
        <Banner />
      </Box>

      {(activeButton === 'userType1' || activeButton === 'userType2') && (
        <>
          <Box mb={5}>
            <RecentPosts
              title="공지사항"
              link="/NoticeList"
              detailLink="/NoticeDetail"
              data={NoticeData}
              type="default"
            />
          </Box>
          <Box mb={5}>
            <RecentPosts
              title="유튜브"
              link="/YoutubeList"
              detailLink="/YoutubeDetail"
              data={YoutubeData}
              type="youtube"
            />
          </Box>
          <Box mb={5}>
            <RecentPosts
              title="뉴스"
              link="/NewsList"
              detailLink="/NewsDetail"
              data={NewsData}
              type="default"
              showSource
            />
          </Box>
        </>
      )}
      {activeButton === 'userType3' && (
        <>
          <Box mb={5}>
            <RecentPosts
              title="일정"
              link="/ScheduleList"
              detailLink="/ScheduleDetail"
              data={ScheduleData}
              type="schedule"
            />
          </Box>
        </>
      )}

    </DefaultLayout>
  )
}

export default Main;