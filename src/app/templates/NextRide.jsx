import { Card, styled } from '@mui/material';
import { H3, H4, H5, H6, Small } from './Typography';

const CardRoot = styled(Card)(({ theme }) => ({
  padding: '16px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  position: 'relative',
  padding: '10px !important',
  background: '#f5e69a !important',
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  paddingTop: '20px',
  paddingBottom: '20px',
  color: theme.palette.text.secondary,
}));

const NextRide = ({nextInfo}) => {
  console.log(nextInfo);
  return (
    <CardRoot>
      <StyledCard elevation={0}>
        <H4>下一趟行程</H4>
        {nextInfo ?
          <Paragraph>
              駕駛姓名: {nextInfo?.driver} <br />
              日期: {nextInfo?.date?.year} / {nextInfo?.date?.month} / {nextInfo?.date?.day} <br />
              時間: {nextInfo?.start?.hour} : {nextInfo?.start?.minute < 10 ? '0' + String(nextInfo?.start?.minute) : nextInfo?.start?.minute} <br />
              上車地點: {nextInfo?.start?.stop} <br />
              目的地: {nextInfo?.destination}
          </Paragraph> :
          <Paragraph>
            <H5>目前尚無預約...</H5>
          </Paragraph>
        }
        
      </StyledCard>
    </CardRoot>
  );
};

export default NextRide;
