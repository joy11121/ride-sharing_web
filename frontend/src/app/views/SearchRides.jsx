import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import QueryTable from './QueryTable';
import Filter from './Filter';
import { useState } from 'react';

import dayjs from 'dayjs';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
  display: 'flex'
}));

const SearchRides = () => {
  const { palette } = useTheme();
  const [timeValue, setTimeValue] = useState(dayjs());
  const [myPos, setMyPos] = useState("");
  const [myDest, setMyDest] = useState("");

  return (
    <Fragment>
      <ContentBox >
        <Grid container spacing={2}>
          <Container>
            <Grid item xs={3.5}  >
              <Filter 
                value={timeValue}
                setValue={setTimeValue}
                setMyPos={setMyPos}
                setMyDest={setMyDest}
              />
            </Grid>
            <Grid  item xs={12} marginLeft={5}>
              <QueryTable 
                timeValue={timeValue}
                myPos={myPos}
                myDest={myDest}
              />
            </Grid>
          </Container>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default SearchRides;
