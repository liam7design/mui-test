import React from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import NewsRecentComponent from '../components/NewsRecentComponent';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <DefaultLayout>
      <p>Main 화면 입니다.</p>
      <p>임차인, 임대인, 부동산중개인 각각 다른 구성의 메인화면이 보여집니다.</p>



      <div>
        <h1>최신 게시물</h1>
        <NewsRecentComponent /> {/* 최근 게시물 컴포넌트 추가 */}
        <Button variant="contained" component={Link} to="/NewsList">
          더 보기
        </Button>
      </div>

    </DefaultLayout>
  )
}

export default Main;