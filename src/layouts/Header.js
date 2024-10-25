import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, MenuList, MenuItem, ListItemText, Grid } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Header = ({ title, showBackButton = false, showCloseButton = false, enableDrawer = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

   // Drawer 상태 변경 함수
   const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // 뒤로가기 버튼 클릭 시 이전 페이지로 이동
  const handleBack = () => {
    navigate(-1);
  };

  // 메뉴 데이터
  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: '등록된 주소 보기', path: '/AddressList' },
    { name: '주소등록', path: '/AddressReg' },
    { name: '전세안전체크', path: '/SafetyCheckList' },
    { name: '주변 시세보기', path: '/MarketPrice' },
    { name: '지도 검색', path: '/MapSearch' },
    { name: '주요 변동정보', path: '/ChangeInfoList' },
    { name: '공지사항', path: '/NoticeList' },
    { name: '유튜브', path: '/YoutubeList' },
    { name: '뉴스', path: '/NewsList' },
    { name: '매물등록 요청', path: '/SaleRequest' },
    { name: '매물요청 현황', path: '/SaleList' },
    { name: '일정', path: '/ScheduleList' },
    { name: '공인중개사 공제증서 확인', path: '/CertificateCheck' },
  ];

  const Gnb = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 250 }}
    >
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem button component={Link} to={item.path}>
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </MenuList>
    </div>
  );

  return (
    <>
      {/* AppBar 설정 */}
      <AppBar>
        <Toolbar>

          {/* DefaultLayout Header */}
          {!showBackButton && !showCloseButton && enableDrawer && (
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={3} sx={{ textAlign: 'left' }}>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                  <MenuRoundedIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h2" sx={{ flexGrow: 1, fontSize: '1.25rem' }}>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'right' }}>
                <IconButton color="inherit" aria-label="login">
                  <PersonRoundedIcon />
                </IconButton>
                <IconButton edge="end" color="inherit" aria-label="send">
                  <SendRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}

          {/* SubpageLayout Header */}
          {showBackButton && (
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs sx={{ textAlign: 'left' }}>
                <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}>
                  <ArrowBackRoundedIcon />
                </IconButton>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h2" sx={{ flexGrow: 1, fontSize: '1.25rem' }}>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs sx={{ textAlign: 'right' }}></Grid>
            </Grid>
          )}

          {/* FullpageLayout Header */}
          {showCloseButton && (
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs sx={{ textAlign: 'left' }}></Grid>
              <Grid item xs={9}>
                <Typography variant="h2" sx={{ flexGrow: 1, fontSize: '1.25rem' }}>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs sx={{ textAlign: 'right' }}>
                <IconButton edge="end" color="inherit" aria-label="close" onClick={handleBack}>
                  <CloseRoundedIcon />
                </IconButton>
              </Grid>
            </Grid> 
          )}

        </Toolbar>
      </AppBar>

      {/* Drawer 설정 */}
      {enableDrawer && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {Gnb()}
        </Drawer>
      )}
      <Toolbar />
    </>
  );
};

export default Header;