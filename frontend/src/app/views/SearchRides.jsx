import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import QueryTable from './QueryTable';
import Filter from './Filter';
import { useState } from 'react';
import instance from 'api';
import UserContext from 'app/contexts/UserContext';
import { useContext, useEffect } from 'react';

import positionList from './Maps/PositionList';

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
  const {id, setId, timeValue, myPos, myDest, setMyPos, setMyDest,
    setName, needTableUpdate, setNeedTableUpdate} = useContext(UserContext);
  const [rides, setRides] = useState([]);

  const search = async() =>{
    // console.log(myPos, myDest);
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

  const [locations1, setLocations1] = useState([]);
  const [locations2, setLocations2] = useState([]);

  const resetTypes = () => {
      setLocations1(prev => {
          const newList = positionList.map((item) => ({name: item[2], checked: false}));
          newList[0].checked = true;
          return newList;
      });
      setLocations2(prev => {
          const newList = positionList.map((item) => ({name: item[2], checked: false}));
          newList[newList.length - 1].checked = true;
          return newList;
      });
  }

  const getData = async() => {
    const user = await instance.get('/query', {params: { id }});
    setName(user.data.name);
  }
  
  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("currentUser"))['uid']);
    getData();
    search(); 
    setNeedTableUpdate(false);
    
    console.log(rides);

  }, [timeValue, myPos, myDest, needTableUpdate]);

  useEffect(() => {
    resetTypes();
  }, []);


  return (
    <Fragment>
      <ContentBox >
        <Grid container spacing={2}>
          <Container>
            <Grid item xs={4}  >
              <Filter
                search={search} 
                locations1={locations1}
                locations2={locations2}
                setLocations1={setLocations1}
                setLocations2={setLocations2}
              />
            </Grid>
            <Grid  item xs={12} marginLeft={5}>
              <QueryTable 
                rides={rides}
                setRides={setRides}
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
