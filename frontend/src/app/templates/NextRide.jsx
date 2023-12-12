import { Card, styled } from '@mui/material';
import { H3, H4, H5, H6, Small } from './Typography';

const CardRoot = styled(Card)(({ theme }) => ({
  padding: '18px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '16px !important',
  background: '#f5e69a !important',
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  paddingTop: '26px',
  paddingBottom: '26px',
  color: theme.palette.text.secondary,
}));

const NextRide = ({nextInfo}) => {
  return (
    <CardRoot>
      <StyledCard elevation={0}>
        <H4>Next Ride</H4>
        <Paragraph>
          Driver: {nextInfo?.driver} <br />
          Time: {nextInfo?.time} <br />
          Location: {nextInfo?.location}
        </Paragraph>
      </StyledCard>
    </CardRoot>
  );
};

export default NextRide;
