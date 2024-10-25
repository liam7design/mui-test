import React from 'react';
import SubpageLayout from '../layouts/SubpageLayout';
import NewsListComponent from '../components/NewsListComponent';

const NewsList = () => {
  return (
    <SubpageLayout>
      <NewsListComponent />
    </SubpageLayout>
  )
}

export default NewsList;