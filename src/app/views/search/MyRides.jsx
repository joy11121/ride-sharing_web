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

// styled components
const MiniCart = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: 600,
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
  padding: '8px 8px',
  transition: 'background 300ms ease',
  '&:hover': { background: 'rgba(0,0,0,0.01)' }
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
    width: 120,
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

  const handleCheckoutClick = () => setPanelOpen(false);

  const handleAddQty = (id) => {
    setCardList((state) =>
      state.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const handleRemoveQty = (id) => {
    setCardList((state) =>
      state.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
    );
  };

  const totalCost = cardList.reduce((prev, curr) => prev + curr.qty * curr.price, 0);

  return (
    <Fragment>
      {type === 'query' ?
        <IconButton onClick={handleDrawerToggle}>
          <Badge color="secondary" badgeContent={cardList.length}>
            <CommuteIcon sx={{ color: 'text.primary' }} />
          </Badge>
        </IconButton>
        : 
        <IconButton onClick={handleDrawerToggle}>
          <Badge color="secondary" badgeContent={cardList.length}>
            <GroupAddIcon sx={{ color: 'text.primary' }} />
          </Badge>
        </IconButton>
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
          <MiniCart>
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
                  <Box mr="4px" display="flex" flexDirection="column">
                    <IconButton size="small" onClick={() => handleAddQty(product.id)}>
                      <KeyboardArrowUp />
                    </IconButton>

                    <IconButton
                      onClick={() => handleRemoveQty(product.id)}
                      disabled={!(product.qty - 1)}
                      size="small"
                    >
                      <KeyboardArrowDown />
                    </IconButton>
                  </Box>

                  <Box mr={1}>
                    <IMG src={product.imgUrl} alt={product.name} />
                  </Box>

                  <ProductDetails>
                    <H6>{product.name}</H6>
                  </ProductDetails>
                  <ProductDetails>
                    <H6>Start</H6>
                    <Small color="text.secondary">
                      {product.start}
                    </Small>
                  </ProductDetails>
                  <ProductDetails>
                    <H6>Destination</H6>
                    <Small color="text.secondary">
                      {product.destination}
                    </Small>
                  </ProductDetails>
                  <ProductDetails>
                    <H6>Status</H6>
                    <Small color="text.secondary">
                      {product.status}
                    </Small>
                  </ProductDetails>
                  <ChatHead>
                    <Chatbox />
                  </ChatHead>
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
          </MiniCart>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyRides;
