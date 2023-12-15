import { Fragment, useState } from 'react';
import { Badge, Button, Drawer, IconButton, ThemeProvider, Box, styled } from '@mui/material';
import { Clear, KeyboardArrowDown, KeyboardArrowUp, Opacity } from '@mui/icons-material';
import { H6, Small } from 'app/components/Typography';
import useSettings from 'app/hooks/useSettings';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { topBarHeight } from 'app/utils/constant';
import { useContext } from 'react';
import QueryContext from 'app/contexts/QueryContext';
import PostContext from 'app/contexts/UserContext';
import ChatHead from './Chatbox/ChatHead';
import Chatbox from './Chatbox/Chatbox';
import CommuteIcon from '@mui/icons-material/Commute';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HailIcon from '@mui/icons-material/Hail';
import Tooltip from '@mui/material/Tooltip';
import BasicRating from './rateItem';

import instance from 'api';
import UserContext from 'app/contexts/UserContext';


// styled components
const Record = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: 800,
});

const CartBox = styled(Box)({
  padding: '4px',
  paddingLeft: '16px',
  display: 'flex',
  alignItems: 'center',
  boxShadow: themeShadows[6],
  height: topBarHeight,
  '& h5': {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: '16px',
    fontWeight: '700',
  }
});

const ProductBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '18px 18px',
  transition: 'background 300ms ease',
  '&:hover': { background: 'rgba(0,0,0,0.05)' }
});

const IMG = styled('img')({ width: 48 });

const ProductDetails = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  '& h6': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    width: 100,
    marginBottom: '4px'
  }
});


function MyRides({ container, type }) {
  const { settings } = useSettings();
  const [panelOpen, setPanelOpen] = useState(false);
  const cardList = [];

  const [rides, setRides] = useState([]);
  const {id} = useContext(UserContext);

  const handleDrawerToggle = async () => {
    // Todo: get history
    const queryRsv = async() =>{
      const {data: {reservation}} = await instance.get('/query', {params: {
        id,
      }});
      console.log(id, reservation);
      if(reservation)
        setRides(reservation);
    }
    const queryHost = async() =>{
      const {data: {rideshare}} = await instance.get('/query', {params: {
        id,
      }});
      console.log(id, rideshare);
      if(rideshare)
        setRides([rideshare]);
    }
    if(type === 'query')
      await queryRsv();
    else
      await queryHost();
    console.log(rides);
    setPanelOpen(!panelOpen);
  };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  return (
    <Fragment>
      {type === 'query' ?
        
        <Tooltip title="當前加入的行程" placement="bottom">
          <IconButton onClick={handleDrawerToggle}>
            <Badge color="secondary" badgeContent={cardList.length}>
              <HailIcon sx={{ color: 'text.primary' }} />
            </Badge>
          </IconButton>
        </Tooltip>
        : 
        <Tooltip title="當前擔任司機的行程" placement="bottom">
          <IconButton onClick={handleDrawerToggle}>
            <Badge color="secondary" badgeContent={cardList.length}>
              <AirportShuttleIcon sx={{ color: 'text.primary' }} />
            </Badge>
          </IconButton>
        </Tooltip>
      }

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Drawer
          anchor="right"
          open={panelOpen}
          variant="temporary"
          container={container}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <Record>
            {type === 'query' ?
              <CartBox>
                <CommuteIcon color="primary" />
                <h5>我預約的行程</h5>
              </CartBox>
            : 
              <CartBox>
                <CommuteIcon color="primary" />
                <h5>我刊登的行程</h5>
              </CartBox>
            }

            <Box flexGrow={1} overflow="auto">
              {rides.length ?
                type === 'post' ? 
                rides.map((item, i) => (
                  <ProductBox key={i}>
                    {/* <Box mr={1}>
                      <IMG src={item.imgUrl} alt={"行程日期"} />
                    </Box>
                    <ProductDetails>
                      <H6>
                        {item.date?.year + '/' + item.date?.month + '/' + item.date?.day}
                      </H6>
                    </ProductDetails> */}
                    <ProductDetails>
                      <H6>行程日期</H6>
                      <Small color="text.secondary">
                      {item.date?.year + '/' + item.date?.month + '/' + item.date?.day}
                      </Small>
                    </ProductDetails>
                    <ProductDetails>
                      <H6>開始時間</H6>
                      <Small color="text.secondary">
                        {checkTime(item.schedule[0].hour) + ':' + checkTime(item.schedule[0].minute)}
                      </Small>
                    </ProductDetails>
                    <ProductDetails>
                      <H6>結束時間</H6>
                      <Small color="text.secondary">
                      {checkTime(item.schedule[item.schedule.length - 1].hour)
                      + ':' + checkTime(item.schedule[item.schedule.length - 1].minute)}
                      </Small>
                    </ProductDetails>
                    <ProductDetails>
                      <H6>起點</H6>
                      <Small color="text.secondary">
                        {item.schedule[0].stop}
                      </Small>
                    </ProductDetails>
                    <ProductDetails>
                      <H6>終點</H6>
                      <Small color="text.secondary">
                      {item.schedule[item.schedule.length - 1].stop}
                      </Small>
                    </ProductDetails>
                    {item.status == 'Incomplete'?
                    <ProductDetails>
                      <H6>Status</H6>
                      <Small color="text.secondary">
                        {item.status}
                      </Small>
                    </ProductDetails>
                    : 
                    <ProductDetails>
                      <BasicRating/>
                    </ProductDetails>}
                  </ProductBox>))
                :  
                  rides.map((item, i) => (
                    <ProductBox key={i}>
                      <Box mr={1}>
                        <IMG src={item.imgUrl} alt={"司機/車牌"} />
                      </Box>
                      <ProductDetails>
                        <H6>
                          {item.drv_name + "/" + item.veh_no}
                        </H6>
                      </ProductDetails>
                      <ProductDetails>
                        <H6>日期</H6>
                        <Small color="text.secondary">
                          {item.date.year + '/' + item.date.month + '/' + item.date.day}
                        </Small>
                      </ProductDetails>
                      <ProductDetails>
                        <H6>上車時間/地點</H6>
                        <Small color="text.secondary">
                          {checkTime(item.dep.hour) + ':' + checkTime(item.dep.minute) 
                          + ',' + item.dep.stop}
                        </Small>
                      </ProductDetails>
                      <ProductDetails>
                        <H6>下車時間/地點</H6>
                        <Small color="text.secondary">
                        {checkTime(item.arr.hour) + ':' + checkTime(item.arr.minute) 
                          + ',' + item.arr.stop}
                        </Small>
                      </ProductDetails>
                      {item.status == 'Incomplete'?
                        <ProductDetails>
                          <H6>Status</H6>
                          <Small color="text.secondary">
                            {item.status}
                          </Small>
                        </ProductDetails>
                        : 
                        <ProductDetails>
                          <BasicRating/>
                        </ProductDetails>}
                    </ProductBox>))
                :
                <ProductDetails>
                  <div style={{opacity:0.6}}>
                    {"尚無行程😅😅😅"}
                  </div>
                </ProductDetails>
                }
            </Box>

            {/* <Button
              color="primary"
              variant="contained"
              onClick={handleCheckoutClick}
              sx={{ width: '100%', borderRadius: 0 }}
            >
              Checkout (${totalCost.toFixed(2)})
            </Button> */}
          </Record>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyRides;
