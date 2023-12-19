import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import QueryTable from './QueryTable';
import Filter from './Filter';
import { useState } from 'react';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
  display: 'flex'
}));

const SearchRides = () => {
  const { palette } = useTheme();
  const [rides, setRides] = useState([]);
  const search = async() =>{
    const {data} = await instance.get('/search', {params: {
      year:timeValue.$y, month:timeValue.$M + 1, day:timeValue.$D,
      hour:timeValue.$H, minute:timeValue.$m, departure:myPos, arrival:myDest,
      count: 1,
    }});
    if(data && data.length){
      for(let i = 0; i < data.length; i++){
        const dep = data[i].schedule.find((s) => myPos === s.stop);
        const arr = data[i].schedule.find((s) => myDest === s.stop);
        // console.log(dep, arr)
        data[i].dep_hour = dep.hour;
        data[i].dep_minute = dep.minute;
        data[i].arr_hour = arr.hour;
        data[i].arr_minute = arr.minute;
      }
    }
    setRides(data);
  };
  return (
    <Fragment>
      <ContentBox >
        <Grid container spacing={2}>
          <Container>
            <Grid item xs={4}  >
              <Filter
                rides={rides}
                setRides={setRides}
                search={search} 
              />
            </Grid>
            <Grid  item xs={12} marginLeft={5}>
              <QueryTable 
                search={search}
              />
            </Grid>
          </Container>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default SearchRides;
