import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { H6, Small } from 'app/components/Typography';
import { Button } from '@mui/material';

export default function BasicRating({sendRating, pax_id, no, disabled}) {
  const [value, setValue] = React.useState(2);
  
  return (
    <>
      {/* <H6>請給司機評分呦</H6> */}
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        disabled={disabled}
      />
      <Button variant="outlined" color="success" disabled={disabled}
        sx={{marginLeft: '10px', width: '70%', height: '30px'}}
        onClick={()=>sendRating({pax_id, no, score: value})}
      >
        送出評價
      </Button>
    </>
  );
}