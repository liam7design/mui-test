import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsData from '../data/NewsData.json';

const NewsRecentComponent = () => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const sortedData = NewsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setLatestPosts(sortedData.slice(0, 3)); // 최신 게시물 3개 가져오기
  }, []);

  return (
    <ul>
      {latestPosts.map((item) => (
        <li key={item.id}>
          <Link to={`/NewsDetail/${item.id}`}>{item.title}</Link>
          <span> - {item.date}</span>
        </li>
      ))}
    </ul>
  );
};

export default NewsRecentComponent;