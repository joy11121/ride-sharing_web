import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { H6, Small } from 'app/components/Typography';

export default function BasicRating() {
  const [value, setValue] = React.useState(2);

  return (
    <>
      <H6>Controlled</H6>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </>
  );
}