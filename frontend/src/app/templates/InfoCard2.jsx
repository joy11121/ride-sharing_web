import { Card, Fab, Grid, styled } from '@mui/material';
import InfoCard2Flip from './InfoCard2Flip';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SavingsIcon from '@mui/icons-material/Savings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));

const InfoCard2 = ({ name, value, amount }) => {
  
  const avg = (list) => {
    let ans = 0;
    let total = 0;
    for(let i = 0; i < list.length; i++){
        ans += (i + 1) * list[i];
        total += list[i];
    }
    return (ans / total).toFixed(2);
  }
  const total = (list) => {
      let total = 0;
      for(let i = 0; i < list.length; i++){
          total += list[i];
      }
      return total;
  }
  let icon = undefined;
  let textColor = undefined;
  const valueList = value;
  const [isFlip, setIsFlip] = useState(false);

  if(name.substring(0, 6) === 'Rating'){
    textColor = '#08ad6c';
    icon = (
      <FabIcon size="medium" sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
        <LeaderboardIcon sx={{ color: textColor }} />
      </FabIcon>
    );
    amount = total(value);
    value = avg(value)
  }
  else if (name === 'Earn'){
    textColor = '#edc72d';
    icon = (
      <FabIcon size="medium" sx={{ background: 'rgba(237, 231, 45, 0.15)' }}>
        <SavingsIcon sx={{ color: textColor }} />
      </FabIcon>
    );
  }
  else{
    textColor = '#f73e1e';
    icon = (
      <FabIcon size="medium" sx={{ background: 'rgba(240, 57, 29, 0.15)' }}>
        <SavingsIcon sx={{ color: textColor }} />
      </FabIcon>
    );
  }

  const item = (
    <Card elevation={3} sx={{ p: 2, height: 140 }}>
      <ContentBox>
        {icon}
        <H3 textcolor={textColor}>{name}</H3>
      </ContentBox>
      <ContentBox sx={{ pt: 4 }}>
        <H1>{value}</H1>
        <IconBox sx={{ background: '#b8b6b2' }}>
          <ExpandLessIcon className="icon" />
        </IconBox>
        <Span textcolor={textColor}>{amount}</Span>
      </ContentBox>
    </Card>
  );
  if(name.substring(0, 6) === 'Rating'){
    return (
      <Grid item xs={12} md={6} sx={{ cursor: 'pointer' }} onClick={() => setIsFlip(prev => !prev)}>
        {!isFlip ? item : <InfoCard2Flip ratingList={valueList} />}
      </Grid>
    );
  }
  return (
    <Grid item xs={12} md={6}>
      {item}
    </Grid>
  );

};

export default InfoCard2;
