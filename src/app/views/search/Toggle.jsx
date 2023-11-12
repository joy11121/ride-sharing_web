import { styled, useTheme } from '@mui/material';
import { ChatHead, Chatbox } from '../../components';
import { useState } from 'react';
import DriverModal from './DriverModal';
import { Fab, Icon } from '@mui/material';

const ToggleTheme = styled('div')(() => ({
  position: 'fixed',
  right: '30px',
  bottom: '50px',
  zIndex: 99,
  transition: 'all 0.15s ease',
  '&.open': {
    right: '10px'
  }
}));

const Toggle = () => {
  const { palette } = useTheme();
  const textColor = palette.primary.contrastText;

  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const handleDirverModalOpen = () => {
    setDriverModalOpen(true);
  }
  return (
    <>
      <DriverModal 
        open={driverModalOpen}
        setOpen={setDriverModalOpen}
      />
      <ToggleTheme>
        <Fab color="primary" aria-label="expand" onClick={handleDirverModalOpen}>
          <Icon sx={{ color: textColor }}>add</Icon>
        </Fab>
        <br/>
        <ChatHead>
          <Chatbox />
        </ChatHead>
      </ToggleTheme>
    </>
    
  )
};

export default Toggle;
