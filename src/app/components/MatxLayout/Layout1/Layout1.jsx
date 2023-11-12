import { useEffect, useRef, memo } from 'react';
import { ThemeProvider, useMediaQuery, Box, styled, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import useSettings from 'app/hooks/useSettings';
import Footer from '../../Footer';
import Layout1Topbar from './Layout1Topbar';
import { MatxSuspense } from 'app/components';
import Toggle from 'app/views/search/Toggle';

const Layout1Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default
}));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  overflowY: 'auto',
  overflowX: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const LayoutContainer = styled(Box)(({ width, open }) => ({
  height: '100vh',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
  verticalAlign: 'top',
  marginLeft: width,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  marginRight: open ? 50 : 0
}));

const Layout1 = () => {
  const { settings, updateSettings } = useSettings();
  const { layout1Settings, chatbox } = settings;
  const topbarTheme = settings.themes[layout1Settings.topbar.theme];

  const theme = useTheme();
  const layoutClasses = `theme-${theme.palette.type}`;

  return (
    <Layout1Root className={layoutClasses}>
      <LayoutContainer>
        <ThemeProvider theme={topbarTheme}>
          <Layout1Topbar fixed={true} className="elevation-z8" />
        </ThemeProvider>
        <ContentBox>
          <Box flexGrow={1} position="relative">
            <MatxSuspense>
              <Outlet />
            </MatxSuspense>
          </Box>
        </ContentBox>
        <Footer />
      </LayoutContainer>
      <Toggle />
    </Layout1Root>
  );
};

export default memo(Layout1);
