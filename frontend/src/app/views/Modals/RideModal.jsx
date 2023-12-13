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

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarsIcon from '@mui/icons-material/Stars';

import instance from 'api';
import LeafletMap from '../LeafletMap';

// import data from 'app/data';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function RideModal({open, setOpen, ride, dep, arr, id}) {

  const handleClose = () => {
      setOpen(false);
  };

  const handleJoin = async () => {
      setOpen(false);
      const { data } = await instance.post('/reserve', 
        {no: ride.no, pax_id: id, dep, arr}
      );
  }

  // no
  // drv_id
  // dep_hour
  // dep_minute
  // arr_hour
  // arr_minute
  // fare:
  // rating:

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
          Hi, Jimmy ! 準備加入新行程？
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
              <LeafletMap />
            </Grid>
            <Grid item>   
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="司機名稱"
                    secondary={ride.drv_name} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="上車時間"
                    secondary={ride.dep_hour + ":" + ride.dep_minute} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="抵達時間"
                    secondary={ride.arr_hour + ":" + ride.arr_minute}  
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AttachMoneyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="價格"
                    secondary={"$" + ride.fare}  
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <StarsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="評價"
                    secondary={ride.rating}  
                  />
                </ListItem>
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