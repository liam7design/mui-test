import React from 'react';
import { Box, Button } from '@mui/material';
import DefaultLayout from '../layouts/DefaultLayout';
import RecentPostsComponent from '../components/RecentPostsComponent';
import NoticeData from '../data/NoticeData.json';
import YoutubeData from '../data/YoutubeData.json';
import NewsData from '../data/NewsData.json';
import SaleData from '../data/SaleData.json';
import ScheduleData from '../data/ScheduleData.json';

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ContentPasteGoRoundedIcon from '@mui/icons-material/ContentPasteGoRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';




const Main = () => {
  return (
    <DefaultLayout>
      <p>Main 화면 입니다.</p>
      <p>임차인, 임대인, 부동산중개인 각각 다른 구성의 메인화면이 보여집니다.</p>


      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" startIcon={<InventoryRoundedIcon />} size="large" sx={{ width: 'calc(50% - 0.25rem)' }}>전세안전체크</Button>
          <Button variant="outlined" startIcon={<MapRoundedIcon />} size="large" sx={{ width: 'calc(50% - 0.25rem)' }}>주변시세</Button>
        </Box>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" startIcon={<ContentPasteGoRoundedIcon />} size="large" sx={{ width: 'calc(50% - 0.25rem)' }}>매물 등록요청</Button>
          <Button variant="outlined" startIcon={<MapRoundedIcon />} size="large" sx={{ width: 'calc(50% - 0.25rem)' }}>주변시세</Button>
        </Box>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" startIcon={<HistoryEduIcon />} size="large" sx={{ width: 'calc(50% - 0.25rem)' }}>전세계약 작성</Button>
          <Button variant="outlined" startIcon={<MapRoundedIcon />} size="large" sx={{ width: 'calc(50% - 0.25rem)' }}>주변시세</Button>
        </Box>
      </Box>
  


      <Box sx={{ mt: 5 }}>
        <RecentPostsComponent
          title="공지사항"
          link="/NoticeList"
          detailLink="/NoticeDetail"
          data={NoticeData}
          type="default"
        />
      </Box>





  
      <Box sx={{ mt: 5 }}>
        <RecentPostsComponent
          title="유튜브"
          link="/YoutubeList"
          detailLink="/YoutubeDetail"
          data={YoutubeData}
          type="youtube"
        />
      </Box>
  
      <Box sx={{ mt: 5 }}>
        <RecentPostsComponent
          title="뉴스"
          link="/NewsList"
          detailLink="/NewsDetail"
          data={NewsData}
          type="default"
        />
      </Box>
  
      <Box sx={{ mt: 5 }}>
        <RecentPostsComponent
          title="매물요청 현황"
          link="/SaleList"
          detailLink="/SaleDetail"
          data={SaleData}
          type="default"
        />
      </Box>
  
      <Box sx={{ mt: 5 }}>
        <RecentPostsComponent
          title="일정"
          link="/ScheduleList"
          detailLink="/ScheduleDetail"
          data={ScheduleData}
          type="schedule"
        />
      </Box>
  
       

    </DefaultLayout>
  )
}

export default Main;