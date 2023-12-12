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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';


import img from './room-6.jpg'
import BasicFormControl from './BasicFormControl';

import instance from 'api';

const RideMetadata1 = [
  'name',
  'start',
  'destination',
  'startTime',
  'endTime',
  
]
const RideMetadata2 = [
  'passby',
  'price',
  'capacity',
]


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const id = '0001';

export default function DriverModal({open, setOpen}) {

    const [inputDict, setInputDict] = useState({drv_id: id, schedule:[
      {stop: 'A', hour: 10, minute: 10},
      {stop: 'B', hour: 10, minute: 20},
      {stop: 'C', hour: 10, minute: 30},
      {stop: 'D', hour: 10, minute: 50},
      {stop: 'A', hour: 11, minute: 10},
      {stop: 'B', hour: 11, minute: 20},
      {stop: 'C', hour: 11, minute: 30},
      {stop: 'D', hour: 11, minute: 50},
    ]});

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddRide = () => {
        const host = async() =>{
          const {data} = await instance.post('/host', inputDict);
          return data;
        }
        setOpen(false);
        host();
        setInputDict({drv_id: id, 
          schedule:[
            {stop: 'A', hour: 10, minute: 10},
            {stop: 'B', hour: 10, minute: 20},
            {stop: 'C', hour: 10, minute: 30},
            {stop: 'D', hour: 10, minute: 50},
            {stop: 'A', hour: 11, minute: 10},
            {stop: 'B', hour: 11, minute: 20},
            {stop: 'C', hour: 11, minute: 30},
            {stop: 'D', hour: 11, minute: 50},
          ]
        });
    }

    // const {
    //     price,
    //     drv_id,
    //     schedule,   // stop, hour, minute
    // } = req.body;

  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth
        maxWidth='lg'
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          輸入駕駛資訊
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
              <List>
                  <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <BasicFormControl 
                      inputDict={inputDict}
                      setInputDict={setInputDict}
                      type='price'
                    />
                  </ListItem>
              </List>
            </Grid>
        </Grid>
        
        <DialogActions>
          <Button autoFocus onClick={handleAddRide}>
            Add Ride
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
}