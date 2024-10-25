import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, ButtonGroup, Button, MenuItem, Select, FormControl, OutlinedInput, InputAdornment, List, ListItem } from '@mui/material';
import NewsData from '../../data/NewsData.json';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const NewsListComponent = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedDateRange, setSelectedDateRange] = useState(null); // 기간 선택 state 추가

  // 날짜 범위 계산 함수
  const getDateRange = (months) => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setMonth(currentDate.getMonth() - months);
    return pastDate;
  };

  useEffect(() => {
    const filtered = NewsData
      .filter((item) => {
        const itemDate = new Date(item.date);
        // 검색어 필터링
        const matchesSearch = item.title.includes(searchTerm);
         // 기간 필터링 (전체 버튼 선택 시 모든 기간 표시)
         const withinDateRange = selectedDateRange
         ? selectedDateRange === 'all'
           ? true
           : itemDate >= getDateRange(selectedDateRange)
         : true;
       return matchesSearch && withinDateRange;
      })
      .sort((a, b) => {
        if (sortOption === 'latest') {
          return new Date(b.date) - new Date(a.date); // 최신순
        } else if (sortOption === 'oldest') {
          return new Date(a.date) - new Date(b.date); // 오래된순
        }
        return 0; // 기본적으로 정렬하지 않음
      });

    setFilteredData(filtered.slice(0, visibleCount));
  }, [searchTerm, sortOption, visibleCount, selectedDateRange]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <>
      <FormControl fullWidth>
        <OutlinedInput
          size="small"
          id="search"
          placeholder="제목 및 내용으로 검색하세요"
          sx={{ flexGrow: 1 }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 검색어 상태 업데이트
          inputProps={{
            'aria-label': '검색',
          }}
        />
      </FormControl>

      <Box sx={{ display: { xs: 'block', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{  mt: 1, width: { xs: '100%', sm: '100%' } }}>
          <ButtonGroup variant="outlined" aria-label="기간 범위 선택" fullWidth sx={{ maxWidth: { xs: '100%', sm: '17.5rem' } }}>
            <Button onClick={() => setSelectedDateRange('all')}>전체</Button>
            <Button onClick={() => setSelectedDateRange(1)}>1개월</Button>
            <Button onClick={() => setSelectedDateRange(3)}>3개월</Button>
            <Button onClick={() => setSelectedDateRange(6)}>6개월</Button>
          </ButtonGroup>
        </Box>
        <Box sx={{  mt: 1, ml: 'auto' }}>
          <FormControl sx={{ width: '100%', minWidth: '6.25rem' }}>
            <Select
              size="small"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              renderValue={(value) => {
                if (value === 'latest') return '최신순';
                if (value === 'oldest') return '오래된순';
              }} 
              sx={{ fontSize: '0.875rem'}}
            >
              <MenuItem value="latest" sx={{ fontSize: '0.875rem'}}>최신순</MenuItem>
              <MenuItem value="oldest" sx={{ fontSize: '0.875rem'}}>오래된순</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ mt: 4, mb: 4}}>
        <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
          {filteredData.map((item) => (
            <ListItem key={item.id} sx={{ display: { xs: 'block', sm: 'flex' }, p: 1, pt: 2, pb: 2, borderBottom: 1, borderColor: 'grey.200'}}>
              <Typography component={Link} to={`/NewsDetail/${item.id}`} sx={{
                display: 'block',
                width: '100%',
                pr: { xs: 0, sm: 4 },
                color: 'text.primary',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontWeight: 'medium',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}>{item.title}</Typography>
              <Typography sx={{
                ml: 'auto',
                mt: { xs: 0.5, sm: 0 },
                color: 'grey.600',
                fontSize: '0.875rem',
              }}>{item.date}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Button onClick={loadMore} variant="outlined" fullWidth>10개 더보기</Button>

    </>
  );
};

export default NewsListComponent;