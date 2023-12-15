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
    const [mostCommonRide, setMostCommonRide] = useState({name: "", cnt: 0});
    const [secondCommonRide, setSecondCommonRide] = useState({name: "", cnt: 0});
    const [othersRide, setOthersRide] = useState({name: "others", cnt: 0});
    const [mostCommonDrive, setMostCommonDrive] = useState({name: "", cnt: 0});
    const [secondCommonDrive, setSecondCommonDrive] = useState({name: "", cnt: 0});
    const [othersDrive, setOthersDrive] = useState({name: "others", cnt: 0});
    const [rated, setRated] = useState([]);
    const [ratep, setRatep] = useState([]);
    const [earn, setEarn] = useState(0);
    const [earnNumber, setEarnNumber] = useState(0);
    const [cost, setCost] = useState(0);
    const [costNumber, setCostNumber] = useState(0);
    const [nextRide, setNextRide] = useState({});
    const [isFlip3, setIsFlip3] = useState(false);


    const [session, setSession] = useState(JSON.parse(localStorage.getItem("currentUser")) || undefined);

    // const getData = async() => {
    //     const user = await instance.get('/query', {params: { id }});
    //     setUser(user);   
    // }

    const getData = async() => {
        const user = await instance.get('/query', {params: { id }});
        console.log(user);
        setGender(user.data.gender);
        setEmail(user.data.email);
        setName(user.data.name);
        setTitle(user.data.title);
        setEarn(user.data.earn);
        setEarnNumber(user.data.host_hist.length);
        setCost(user.data.cost);
        setCostNumber(user.data.rsv_hist.length);
    }
    useEffect(() => {
      setId(JSON.parse(localStorage.getItem("currentUser"))['uid']);
    }, []);
    useEffect(() => {
        // get the data from database
        getData();
        setRated([1, 2, 3, 4, 5]);
        setRatep([0, 0, 1, 2, 3]);
        setMostCommonRide({name: 'Jim Huang', cnt: 100});
        setSecondCommonRide({name: 'Kevin Guo', cnt: 60});
        setOthersRide({name: 'Others', cnt: 21});
        setMostCommonDrive({name: 'UU', cnt: 5});
        setSecondCommonDrive({name: 'Brian Chen', cnt: 2});
        setOthersDrive({name: 'Others', cnt: 1});
        setNextRide({driver: 'UU', time: '2023/11/11 9:00', location: 'Hsinchu Zoo'});
    }, [id]); 
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
                  <InfoCard2 name="Rating as Driver" value={rated} amount={null} />
                  <InfoCard2 name="Rating as Passenger" value={ratep} amount={null} />
                  <InfoCard2 name="Earn" value={earn} amount={earnNumber} />
                  <InfoCard2 name="Cost" value={cost} amount={costNumber} />
                </Grid>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <div style={{ cursor: 'pointer' }} onClick={() => setIsFlip3(prev => !prev)}>
                {isFlip3 ? 
                    <Card sx={{ px: 3, py: 1.6, mb: 3 }}>
                    <Title>Total Drive</Title>
                    <SubTitle>{mostCommonDrive.cnt + secondCommonDrive.cnt + othersDrive.cnt} times</SubTitle>
                    <DoughnutChart
                        data={[mostCommonDrive, secondCommonDrive, othersDrive]}
                        height="280px"
                        color={['#84cc62', '#5793d9', '#e63a20']}
                    />
                    </Card> :
                    <Card sx={{ px: 3, py: 1.6, mb: 3 }}>
                    <Title>Total Ride</Title>
                    <SubTitle>{mostCommonRide.cnt + secondCommonRide.cnt + othersRide.cnt} times</SubTitle>
                    <DoughnutChart
                        data={[mostCommonRide, secondCommonRide, othersRide]}
                        height="280px"
                        color={['#84cc62', '#5793d9', '#e63a20']}
                    />
                    </Card>}
                </div>
                <NextRide nextInfo={nextRide} />
              </Grid>
            </Grid>
          </ContentBox>
        </Fragment>
    );
};

export default Profile;