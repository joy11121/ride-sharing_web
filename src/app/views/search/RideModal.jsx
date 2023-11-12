import { useState, Fragment } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';


import QueryContext from "app/contexts/QueryContext";
import { useContext } from "react";
import img from './room-6.jpg'
import RideMetadata from './rideMetadata';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function RideModal({open, setOpen, driver}) {


    const { cardList, setCardList } = useContext(QueryContext);

    const handleClose = () => {
        setOpen(false);
    };

    const handleJoin = () => {
        setOpen(false);
        setCardList(prev => [...prev, driver]);
    }


  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth
        maxWidth='md'
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Driver: {driver.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        >
            <Grid item>
                <img src={img}/>
            </Grid>
            <Grid item>   
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                >
                {RideMetadata.map((item) => (
                  <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={item.toUpperCase()} 
                      secondary={driver[item]} 
                    />
                  </ListItem>
                ))}
                
                <Divider variant="inset" component="li" />

            </List>
            </Grid>
        </Grid>
        
        <DialogActions>
          <Button autoFocus onClick={handleJoin}>
            Join
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}