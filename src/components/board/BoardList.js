import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, Button, Card, CardMedia, CardContent, CardActionArea, Chip } from '@mui/material';
import BoardSearch from './BoardSearch';
import PeriodSelect from './PeriodSelect';
import BoardSort from './BoardSort';


const BoardList = ({ data, detailLink, type, showSource = false }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const getDateTime = (item) => {
    return new Date(`${item.date} ${item.time || '00:00:00'}`);
  };

  const getDateRange = (months) => {
    const currentDate = new Date();
    const pastDate = new Date();
    pastDate.setMonth(currentDate.getMonth() - months);
    return pastDate;
  };

  useEffect(() => {
    const filtered = data
      .filter((item) => {
        const itemDate = new Date(item.date);
        const matchesSearch = 
          (item.title && item.title.includes(searchTerm)) || 
          (item.address && item.address.includes(searchTerm));
        const withinDateRange = selectedDateRange
          ? selectedDateRange === 'all'
            ? true
            : itemDate >= getDateRange(selectedDateRange)
          : true;
        return matchesSearch && withinDateRange;
      })
      .sort((a, b) => {
        const dateTimeA = getDateTime(a);
        const dateTimeB = getDateTime(b);

        if (sortOption === 'latest') {
          // return new Date(b.date) - new Date(a.date);
          return dateTimeB - dateTimeA; 
        } else if (sortOption === 'oldest') {
          // return new Date(a.date) - new Date(b.date);
          return dateTimeA - dateTimeB;
        }
        return 0;
      });

    setFilteredData(filtered.slice(0, visibleCount));
  }, [searchTerm, sortOption, visibleCount, selectedDateRange, data]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // type에 따라 switch 문으로 레이아웃 구분
  switch (type) {
    case "youtube":
      return (
        <>
          <BoardSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Box sx={{ display: { xs: 'block', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ mt: 1, width: { xs: '100%', sm: '100%' } }}>
              <PeriodSelect setSelectedDateRange={setSelectedDateRange} />
            </Box>
            <Box sx={{ mt: 1, ml: 'auto' }}>
              <BoardSort sortOption={sortOption} setSortOption={setSortOption} />
            </Box>
          </Box>
          <Box sx={{ mt: 5, mb: 5, borderTop: 1, borderBottom: 1, borderColor: 'grey.200'}}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {filteredData.map((item) => (
                <Card key={item.id} variant="outlined" sx={{ width: { xs: '100%', sm: 'calc(50% - 0.625rem)' }, borderRadius: 2, borderColor: 'grey.200' }}>
                  <CardActionArea>
                    <CardMedia component={Link} to={`${detailLink}/${item.id}`} sx={{ display: 'block' }}>
                      <Box component="img" src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`} alt={item.title} sx={{ width: '100%' }} />
                    </CardMedia>
                    <CardContent sx={{ pt: 1.5, pb: 2.5 }}>
                      <Typography component={Link} to={`${detailLink}/${item.id}`} sx={{
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
    case "schedule":
      return (
        <>
          <Box sx={{ display: { xs: 'block', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ ml: 'auto' }}>
              <BoardSort sortOption={sortOption} setSortOption={setSortOption} />
            </Box>
          </Box>
          <Box sx={{ mt: 4, mb: 4 }}>
            <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
              {filteredData.map((item) => (
                <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center', p: 0, pt: 1.5, pb: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                  <Box sx={{ pr: 4 }}>
                    <Typography sx={{ fontSize: '1.063rem', fontWeight: 'medium',}}>{item.date}&nbsp;&nbsp;{item.time}</Typography>
                    <Typography sx={{ mt: 0.5, fontSize: '0.938rem', color: 'grey.600' }}>{item.address}</Typography>
                  </Box>
                  <Chip variant="outlined" color="primary" label={item.content} sx={{ ml: 'auto', fontSize: '0.875rem' }} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Button onClick={loadMore} variant="outlined" fullWidth>10개 더보기</Button>
        </>
      );
    case "sale":
      return (
        <>
          <BoardSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Box sx={{ display: { xs: 'block', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ mt: 1, width: { xs: '100%', sm: '100%' } }}>
              <PeriodSelect setSelectedDateRange={setSelectedDateRange} />
            </Box>
            <Box sx={{ mt: 1, ml: 'auto' }}>
              <BoardSort sortOption={sortOption} setSortOption={setSortOption} />
            </Box>
          </Box>
          <Box sx={{ mt: 4, mb: 4 }}>
            <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
              {filteredData.map((item) => (
                <ListItem key={item.id} sx={{ display: 'flex', p: 0, pt: 1.5, pb: 1.5, borderBottom: 1, borderColor: 'grey.200' }}>
                <Box sx={{ display: { xs: 'block', sm: 'flex' }, alignItems: 'center', width: '100%', overflow: 'hidden' }}>
                  <Typography component={Link} to={`${detailLink}/${item.id}`} sx={{
                    display: 'block',
                    pr: { xs: 0, sm: 4 },
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: 'medium',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}><Box component="span" sx={{ mr: 1, fontWeight: 'medium' }}>[{item.type}]</Box> {item.address}</Typography>
                  <Typography sx={{
                    display: 'flex',
                    ml: 'auto', 
                    mt: { xs: 0.5, sm: 0 },
                    color: 'grey.600',
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap'
                  }}>{item.date}</Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}> <Chip color="primary" label={item.state} sx={{ ml: { xs: 2, sm: 4 }, fontSize: '0.875rem' }} /> 
                </Box>
              </ListItem>
              ))}
            </List>
          </Box>
          <Button onClick={loadMore} variant="outlined" fullWidth>10개 더보기</Button>
        </>
      );
    default:
      return (
        <>
          <BoardSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Box sx={{ display: { xs: 'block', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ mt: 1, width: { xs: '100%', sm: '100%' } }}>
              <PeriodSelect setSelectedDateRange={setSelectedDateRange} />
            </Box>
            <Box sx={{ mt: 1, ml: 'auto' }}>
              <BoardSort sortOption={sortOption} setSortOption={setSortOption} />
            </Box>
          </Box>
          <Box sx={{ mt: 4, mb: 4 }}>
            <List sx={{ p: 0, borderTop: 1, borderColor: 'grey.200' }}>
              {filteredData.map((item) => (
                <ListItem key={item.id} sx={{ display: { xs: 'block', sm: 'flex' }, p: 1, pt: 2, pb: 2, borderBottom: 1, borderColor: 'grey.200' }}>
                  <Typography component={Link} to={`${detailLink}/${item.id}`} sx={{
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
                  <Box sx={{ display: 'flex', ml: 'auto', mt: { xs: 0.5, sm: 0 }}} >
                    {showSource && (
                      <Typography sx={{
                        pr: { xs: 2, sm: 4 },
                        color: 'grey.600',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap'
                      }}>{item.source}</Typography>
                    )}
                    <Typography sx={{
                      color: 'grey.600',
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap'
                    }}>{item.date}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
          <Button onClick={loadMore} variant="outlined" fullWidth>10개 더보기</Button>
        </>
      );
  }

};

export default BoardList;