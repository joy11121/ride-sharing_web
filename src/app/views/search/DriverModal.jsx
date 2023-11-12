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


import PostContext from 'app/contexts/PostContext';
import { useContext } from "react";
import img from './room-6.jpg'
import BasicFormControl from './BasicFormControl';
import RideMetadata from './rideMetadata';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DriverModal({open, setOpen}) {

    const { cardList, setCardList } = useContext(PostContext);
    const [inputDict, setInputDict] = useState({});

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddRide = () => {
        setOpen(false);
        setCardList(prev => [inputDict, ...prev]);
        console.log(cardList)
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
          Enter Driver's information:
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
                  <>
                    <ListItem>
                      <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                      </ListItemAvatar>
                      <BasicFormControl 
                        inputDict={inputDict}
                        setInputDict={setInputDict}
                        type={item}
                      />
                    </ListItem>
                  </>
                ))}
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