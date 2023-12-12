import { Fragment, useState } from 'react';
import { Badge, Button, Drawer, IconButton, ThemeProvider, Box, styled } from '@mui/material';
import { Clear, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { H6, Small } from 'app/components/Typography';
import useSettings from 'app/hooks/useSettings';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { topBarHeight } from 'app/utils/constant';
import { useContext } from 'react';
import QueryContext from 'app/contexts/QueryContext';
import PostContext from 'app/contexts/PostContext';
import ChatHead from './Chatbox/ChatHead';
import Chatbox from './Chatbox/Chatbox';
import CommuteIcon from '@mui/icons-material/Commute';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HailIcon from '@mui/icons-material/Hail';
import Tooltip from '@mui/material/Tooltip';
import BasicRating from './rateItem';


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
    fontWeight: '500'
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
  const {cardList, setCardList} = useContext(
    type === 'query' ? QueryContext : PostContext
  );

  const handleDrawerToggle = () => setPanelOpen(!panelOpen);


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
                <h5>Commute</h5>
              </CartBox>
            : 
              <CartBox>
                <CommuteIcon color="primary" />
                <h5>Commute</h5>
              </CartBox>
            }

            <Box flexGrow={1} overflow="auto">
              {cardList.map((product, i) => (
                <ProductBox key={i}>
                  <Box mr={1}>
                    <IMG src={product.imgUrl} alt={product.name} />
                  </Box>
                  <ProductDetails>
                    <H6>{product.name}</H6>
                  </ProductDetails>
                  {type === 'query' && 
                    <>
                      <ProductDetails>
                        <H6>抵達時間</H6>
                        <Small color="text.secondary">
                          {product.time}
                        </Small>
                      </ProductDetails>
                      <ProductDetails>
                        <H6>接送點</H6>
                        <Small color="text.secondary">
                          {product.pickupPoint}
                        </Small>
                      </ProductDetails>
                      {product.status == 'Incomplete'?
                      <ProductDetails>
                        <H6>Status</H6>
                        <Small color="text.secondary">
                          {product.status}
                        </Small>
                      </ProductDetails>
                      : 
                      <ProductDetails>
                        <BasicRating/>
                      </ProductDetails>}
                    </>
                  }
                  {type === 'post' && 
                    <>
                      <ProductDetails>
                        <H6>起點</H6>
                        <Small color="text.secondary">
                          {product.start}
                        </Small>
                      </ProductDetails>
                      <ProductDetails>
                        <H6>終點</H6>
                        <Small color="text.secondary">
                          {product.destination}
                        </Small>
                      </ProductDetails>
                      <ProductDetails>
                        <H6>預計時間段</H6>
                        <Small color="text.secondary">
                          {product.startTime + "-" + product.endTime}
                        </Small>
                      </ProductDetails>
                    </>
                  }
                  
                  {/* <ChatHead>
                    <Chatbox />
                  </ChatHead> */}
                </ProductBox>
              ))}
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