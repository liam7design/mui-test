import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, ButtonGroup, Button, MenuItem, Select, FormControl, OutlinedInput, InputAdornment, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import YoutubeData from '../../data/YoutubeData.json';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


const YoutubeListComponent = () => {
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
    const filtered = YoutubeData
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

      <Box sx={{ mt: 4, mb: 4, pt: 4, pb: 4, borderTop: 1, borderBottom: 1, borderColor: 'grey.200'}}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {filteredData.map((item) => (
            <Card key={item.id} sx={{ width: {  xs: '100%', sm: 'calc(50% - 0.5rem)' }, borderRadius: 2, boxShadow: 'none' }}>
              <CardActionArea sx={{ border: 1, borderColor: 'grey.300' }}>
                <CardMedia component={Link} to={`/YoutubeDetail/${item.id}`} sx={{ display: 'block' }}>
                  <Box component="img" src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} alt={item.title} sx={{ width: '100%' }} />
                </CardMedia>
                <CardContent sx={{ pt: 1.5, pb: 2.5 }}>
                  <Typography component={Link} to={`/YoutubeDetail/${item.id}`} sx={{
                    display: 'block',
                    width: '100%',
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontSize: '1.125rem',
                    fontWeight: 'medium',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 0.5, fontSize: '0.875rem', color: 'grey.600' }}>{item.date}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      <Button onClick={loadMore} variant="outlined" fullWidth>10개 더보기</Button>

    </>
  );
};

export default YoutubeListComponent;