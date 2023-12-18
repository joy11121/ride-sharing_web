import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  Box,
  styled,
  useTheme,
  Typography
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import { topBarHeight } from 'app/utils/constant';

import { Span } from '../../Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import MyRides from 'app/views/MyRides';

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useContext } from 'react';
import UserContext from 'app/contexts/UserContext';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const history = useNavigate();
  const {name, setName} = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth).then((m) => {
        console.log(auth);
        history('/');
    })
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex" alignItems="center">
          {/* <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton> */}
          <CarRentalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/searchRides">
            TSMCOOL
            </Link>
          </Typography>

          <IconBox>
            {/* <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton> */}

            {/* <MyRides type='query'/>
            <MyRides type='post'/> */}

          </IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />
          <MyRides type='query'/>
          <MyRides type='post'/>

          {/* <NotificationProvider>
            <NotificationBar />
          </NotificationProvider> */}

          

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{name.length > 0 ? name : "User"}</strong>
                  </Span>
                </Hidden>
                <Avatar sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/searchRides">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            {/* <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem> */}

            <StyledItem>
              <Link to="/login" onClick={handleLogout}>
                <Icon> power_settings_new </Icon>
                <Span> Logout </Span>
              </Link>
            </StyledItem>

          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
