import { Box, Card, Grid, styled, IconButton, TextField } from '@mui/material';
import { Small } from './Typography';
import { React, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FaceIcon  from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckIcon from '@mui/icons-material/Check';
import instance from '../../api';

import { useContext } from "react";
import UserContext from "app/contexts/UserContext";

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));
  
const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': { color: theme.palette.text.secondary },
    '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));
  
const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.palette.primary.main,
}));

const InfoCard = ({nameString, value, setValue}) => {
    const {name, setName} = useContext(UserContext);

    const [disabled, setDisabled] = useState(true);
    const id = JSON.parse(localStorage.getItem("currentUser"))['uid'];

    const handleClicked = async() => {
        if(disabled){
            setDisabled(false);
        }
        else{
            if(nameString === 'name')
                setName(value);
            setDisabled(true);
            await instance.post('/update',
                {
                    id,
                    [nameString]: value,
                }
            )
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    let icon = undefined;
    if(nameString === 'name')
        icon = <AccountCircleIcon className='icon' />;
    else if(nameString === 'gender'){
        if(value === 'male')
            icon = <FaceIcon className='icon'  />;
        else
            icon = <Face3Icon className='icon'  />;
    }
    else if(nameString === 'title')
        icon = <BadgeIcon className='icon'  />;
    else
        icon = <EmailIcon className='icon'  />;

    return (
        <Grid item xs={12} md={6}>
          <StyledCard elevation={6}>
            <ContentBox>
              {icon}
              <Box ml="12px">
                <Small>
                    {nameString == "name" ? "姓名" : nameString == "gender" ? "性別" : nameString == "title" ? "職稱" : "信箱"}
                </Small>
                <Heading><TextField id="standard" variant="standard" value={value} onChange={handleChange} disabled={disabled} /></Heading>
              </Box>
            </ContentBox>
            <IconButton onClick={handleClicked}>
              {disabled ? <BorderColorIcon /> : <CheckIcon />}
            </IconButton>
          </StyledCard>
        </Grid>
    );
}

export default InfoCard