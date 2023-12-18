import { Card } from '@mui/material';
import ProgressBar from './ProgressBar';

const InfoCard2Flip = ({ ratingList }) => {

  return (
    
    <Card elevation={3} sx={{ p: 2, height: 140,  pl: 5, }}>
        <ProgressBar value={ratingList[0]} color="primary" text="1 star" />
        <ProgressBar value={ratingList[1]} color="secondary" text="2 stars" />
        <ProgressBar value={ratingList[2]} color="primary" text="3 stars" />
        <ProgressBar value={ratingList[3]} color="secondary" text="4 stars" />
        <ProgressBar value={ratingList[4]} color="primary" text="5 stars" />
    </Card>
  );
};

export default InfoCard2Flip;
