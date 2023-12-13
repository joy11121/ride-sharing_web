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
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListSubheader from '@mui/material/ListSubheader';


import ImageIcon from '@mui/icons-material/Image';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import BasicFormControl from './BasicFormControl';

import instance from 'api';
import LeafletMap from '../Maps/PostMap';
import { useEffect } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const id = '0002';


export default function DriverModal({open, setOpen}) {

    const [inputDict, setInputDict] = useState({drv_id: id});
    const [schedule, setSchedule] = useState([]);
    const [canSend, setCanSend] = useState(false);

    // For Leaflet draw lines
    const [lats, setLats] = useState([]);

    const handleClose = () => {
        setOpen(false);
        setSchedule([]);
        setInputDict({drv_id: id});
        setLats([]);
    };

    const handleAddRide = () => {
        setOpen(false);
        setInputDict(prev => {
          prev.schedule = schedule; 
          return prev;
        });
        setCanSend(true);
    }

    useEffect(() => {
      const host = async() =>{
        const {data} = await instance.post('/host', inputDict);
        return data;
      }
      if(canSend === true){
        console.log(inputDict);
        host();
        setCanSend(false);
        handleClose();
      }
    }, [canSend]);

    // const {
    //     price,
    //     drv_id,
    //     schedule,   // stop, hour, minute
    // } = req.body;
    function checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

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
          點選行程中間點，並輸入駕駛資訊：
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
              <LeafletMap
                schedule={schedule}
                setSchedule={setSchedule}
                lats={lats}
                setLats={setLats}
              />
            </Grid>
            <Grid item>   
              <List>
                  <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                      <AttachMoneyIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <BasicFormControl 
                      inputDict={inputDict}
                      setInputDict={setInputDict}
                      type='price'
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                      <ReduceCapacityIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <BasicFormControl 
                      inputDict={inputDict}
                      setInputDict={setInputDict}
                      type='capacity'
                    />
                  </ListItem>
              </List>
            </Grid>   
              
            <Grid item>   
              <List
                subheader={
                  schedule.length ? 
                  <ListSubheader component="div" id="nested-list-subheader">
                    預計行程
                  </ListSubheader>
                  : ""
                }
              >
                {schedule.map((item, idx) =>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={"我的行程" + idx + ':' + item.stop}
                      secondary={checkTime(item.hour) + ':' + checkTime(item.minute)} 
                    />
                  </ListItem>
                )} 
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