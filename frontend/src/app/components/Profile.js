import { React, useState, useEffect, Fragment } from "react";
import { Grid, Card, styled, Button } from '@mui/material';
//import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import InfoCard from "../templates/InfoCard";
import InfoCard2 from "../templates/InfoCard2";
import DoughnutChart from "../templates/Doughnut";
import { H2 } from "../templates/Typography";
import NextRide from "../templates/NextRide";
import instance from "api";
import { useContext } from "react";
import UserContext from "app/contexts/UserContext";

// const fakeData = [{drv_name: 'Jim'}, {drv_name: 'Jim'}, {drv_name: 'Jim'}];
const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));
  
const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginRight: '.5rem',
    textTransform: 'capitalize',
}));
  
const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}));
  
const H4 = styled('h4')(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
}));
  
const Profile = () => {
    const {
      id, setId, 
      name, setName, 
      title, setTitle, 
      gender, setGender, 
      email, setEmail,
    }
    = useContext(UserContext);

    const [myName, setMyName] = useState("");
    const [rideHist, setRideHist] = useState([]);
    const [rated, setRated] = useState([]);
    const [earn, setEarn] = useState(0);
    const [earnNumber, setEarnNumber] = useState(0);
    const [cost, setCost] = useState(0);
    const [costNumber, setCostNumber] = useState(0);
    const [nextRide, setNextRide] = useState({});

    const getNextRide = (reservation) => {
      if(reservation.length === 0)
        return null;
      let upcoming = null;
      let minTime = 1440;
      for(let i = 0; i < reservation.length; i++){
        if(reservation[i].dep.hour * 60 + reservation[i].dep.minute < minTime){
          minTime = reservation[i].dep.hour * 60 + reservation[i].dep.minute;
          upcoming = reservation[i];
        }
      }
      return {'driver': upcoming.drv_name, 'date': upcoming.date, 'start': upcoming.dep, 'destination': upcoming.arr.stop}
    }

    const getData = async() => {
        const user = await instance.get('/query', {params: { id }});
        console.log(user);
        setGender(user.data.gender);
        setEmail(user.data.email);
        setName(user.data.name);
        setTitle(user.data.title);
        setEarn(user.data.revenue);
        setEarnNumber(user.data.rideshare_hist.length);
        setCost(user.data.expense);
        setCostNumber(user.data.reservation_hist.length);
        setRated(user.data.rating);
        setRideHist(user.data.reservation_hist);
        setNextRide(getNextRide(user.data.reservation));
    }

    useEffect(() => {
        // get the data from database
        getData();
    }, []); 
    useEffect(() => {
      setMyName(name);
    }, [name]);

    return (
        <Fragment>
          <ContentBox className="analytics">
            {/* <H2>Welcome back,{session?.displayName}</H2>
            <Button onClick={handleLogout}>登出</Button> */}
            <Grid container spacing={3}>
              <Grid item lg={9} md={9} sm={12} xs={12}>
                <Grid container spacing={2} sx={{ mb: '24px' }}>
                  <InfoCard nameString="name" value={myName} setValue={setMyName} />
                  <InfoCard nameString="email" value={email} setValue={setEmail} />
                  <InfoCard nameString="title" value={title} setValue={setTitle} />
                  <InfoCard nameString="gender" value={gender} setValue={setGender} />
                </Grid>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <InfoCard2 name="Rating" value={rated} amount={null} />
                  <InfoCard2 name="Times" value={[earnNumber, costNumber]} amount={null} />
                  <InfoCard2 name="Earn" value={earn} amount={earnNumber} />
                  <InfoCard2 name="Cost" value={cost} amount={costNumber} />
                </Grid>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Card sx={{ px: 3, py: 1.6, mb: 3 }}>
                  <Title>最常合作駕駛</Title>
                  <SubTitle>{rideHist.length} times</SubTitle>
                  {rideHist.length ? 
                    <DoughnutChart
                      data={rideHist}
                      height="260px"
                    /> : <H4>尚未有搭乘紀錄...</H4>}
                </Card>
                <NextRide nextInfo={nextRide} />
              </Grid>
            </Grid>
          </ContentBox>
        </Fragment>
    );
};

export default Profile;