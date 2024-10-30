import React from 'react';
import FullpageLayout from '../layouts/FullpageLayout';
import BoardDetail from '../components/board/BoardDetail';
import SaleData from '../data/SaleData.json';

const SaleDetail = () => {
  return (
    <FullpageLayout>
      <BoardDetail
        data={SaleData}
        type="sale"
      />
    </FullpageLayout>
  )
}

export default SaleDetail;