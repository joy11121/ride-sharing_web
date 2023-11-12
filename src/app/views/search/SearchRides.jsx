import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import QueryTable from './QueryTable';
import Filter from './Filter';

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

  return (
    <Fragment>
      <ContentBox >
        <Grid container spacing={2}>
          <Container>
            <Grid item xs={4}>
              <Filter />
            </Grid>
            <Grid  item xs={12} marginLeft={5}>
              <QueryTable />
            </Grid>
          </Container>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default SearchRides;
