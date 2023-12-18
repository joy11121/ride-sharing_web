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
import ListSubheader from '@mui/material/ListSubheader';

import ImageIcon from '@mui/icons-material/Image';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarsIcon from '@mui/icons-material/Stars';
import FolderIcon from '@mui/icons-material/Folder';

import instance from 'api';
import QueryMap from '../Maps/QueryMap';
import { useEffect } from 'react';

import positionList from '../Maps/PositionList';

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
        {
          drv_id: ride.drv_id,
          pax_id: id,
          count: 1,
          dep,
          arr,
          no: ride.no,
        }
      );
      console.log("reserve response", data);
  }

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }


  const [lats, setLats] = useState([
    [24.779046663607577, 120.99319338810972, '台積電7廠'],
    [24.797820970001588, 120.9965950914603, '清華大學'],
    [24.827501310697876, 120.91150582121116, '廢物媽媽育兒農場'],
  ]);

  useEffect(() => {
    if(ride && ride.schedule){
      const newLats = [];
      for(let i = 0; i < ride.schedule.length; i++){
        const curr = positionList.find((s) => s[2] === ride.schedule[i].stop);
        if(curr)
          newLats.push(curr);
      }
      setLats(newLats);
    }
  }, [ride]);

  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth
        maxWidth='xl'
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
              <QueryMap 
                lats={lats}
                dep={dep}
                arr={arr}
              />
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
                      secondary={checkTime(ride.dep_hour) + ":" + checkTime(ride.dep_minute)} 
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
                      secondary={"$" + ride.unit_fare}  
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
                      secondary={ride.drv_rating}  
                    />
                  </ListItem>
              </List>
            </Grid>
            {ride && ride.schedule && 
            <Grid item>   
              <List
                subheader={
                  ride.schedule.length ? 
                  <ListSubheader component="div" id="nested-list-subheader">
                    預計行程
                  </ListSubheader>
                  : ""
                }
              >
                {ride.schedule.map((item, idx) =>
                  <ListItem>
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
            </Grid>}
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