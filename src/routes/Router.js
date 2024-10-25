import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from '../pages/Main';	
import AddressList from '../pages/AddressList';
import AddressReg from '../pages/AddressReg';
import SafetyCheckList from '../pages/SafetyCheckList';
import MarketPrice from '../pages/MarketPrice';
import MapSearch from '../pages/MapSearch';
import ChangeInfoList from '../pages/ChangeInfoList';
import NoticeList from '../pages/NoticeList';
import NoticeDetail from '../pages/NoticeDetail';
import YoutubeList from '../pages/YoutubeList';
import YoutubeDetail from '../pages/YoutubeDetail';
import NewsList from '../pages/NewsList';
import NewsDetail from '../pages/NewsDetail';
import SaleRequest from '../pages/SaleRequest';
import SaleList from '../pages/SaleList';
import SaleDetail from '../pages/SaleDetail';
import ScheduleList from '../pages/ScheduleList';
import CertificateCheck from '../pages/CertificateCheck';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/AddressList" element={<AddressList />} />
      <Route path="/AddressReg" element={<AddressReg />} />
      <Route path="/SafetyCheckList" element={<SafetyCheckList />} />
      <Route path="/MarketPrice" element={<MarketPrice />} />
      <Route path="/MapSearch" element={<MapSearch />} />
      <Route path="/ChangeInfoList" element={<ChangeInfoList />} />
      <Route path="/NoticeList" element={<NoticeList />} />
      <Route path="/NoticeDetail" element={<NoticeDetail />} />
      <Route path="/YoutubeList" element={<YoutubeList />} />
      <Route path="/YoutubeDetail" element={<YoutubeDetail />} />
      <Route path="/NewsList" element={<NewsList />} />
      <Route path="/NewsDetail/:id" element={<NewsDetail />} />
      <Route path="/SaleRequest" element={<SaleRequest />} />
      <Route path="/SaleList" element={<SaleList />} />
      <Route path="/SaleDetail" element={<SaleDetail />} />
      <Route path="/ScheduleList" element={<ScheduleList />} />
      <Route path="/CertificateCheck" element={<CertificateCheck />} />
    </Routes> 
  );
};

export default Router;