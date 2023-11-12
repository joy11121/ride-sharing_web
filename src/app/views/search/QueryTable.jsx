import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { Paragraph } from 'app/components/Typography';

import { useEffect } from "react";
import RideModal from "./RideModal";

const drivers = [
  {
    name: "john doe",
    start: "18 january, 2019",
    price: 1000,
    status: "close",
    destination: "ABC Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 0,
  },
  {
    name: "kessy bryan",
    start: "10 january, 2019",
    price: 9000,
    status: "open",
    destination: "My Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 10,
  },
  {
    name: "kessy bryan",
    start: "10 january, 2019",
    price: 9000,
    status: "open",
    destination: "My Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 0,
  },
  {
    name: "james cassegne",
    start: "8 january, 2019",
    price: 5000,
    status: "close",
    destination: "Collboy Tech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 0,
  },
  {
    name: "lucy brown",
    start: "1 january, 2019",
    price: 89000,
    status: "open",
    destination: "ABC Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 44,
  },
  {
    name: "lucy brown",
    start: "1 january, 2019",
    price: 89000,
    status: "open",
    destination: "ABC Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 0,
  },
  {
    name: "lucy brown",
    start: "1 january, 2019",
    price: 89000,
    status: "open",
    destination: "ABC Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 0,
  },
  {
    name: "lucy brown",
    start: "1 january, 2019",
    price: 89000,
    status: "open",
    destination: "ABC Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 0,
  },
  {
    name: "lucy brown",
    start: "1 january, 2019",
    price: 89000,
    status: "open",
    destination: "ABC Fintech LTD.",
    imgUrl: '/assets/images/products/headphone-2.jpg',
    available: 0,
  },
];

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const QueryTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDriver, setModalDriver] = useState({});

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (index) => {
    setModalOpen(true);
    setModalDriver(drivers[index]);
  }



  return (
      <>
      <RideModal 
        open={modalOpen}
        setOpen={setModalOpen}
        driver={modalDriver}
      />
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={2.5}>
                  Name
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Start
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Destination
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Price
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  {/* <TableCell align="left">{subscriber.name}</TableCell> */}
                  <TableCell colSpan={2.5} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                    <Box display="flex" alignItems="center">
                      <Avatar src={subscriber.imgUrl} />
                      <Paragraph sx={{ m: 0, ml: 4 }}>{subscriber.name}</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={1}>{subscriber.start}</TableCell>
                  <TableCell colSpan={1}>{subscriber.destination}</TableCell>
                  <TableCell sx={{ px: 0 }} align="left">
                    {subscriber.available ? (
                      subscriber.available < 20 ? (
                        <Small bgcolor={bgSecondary}>{subscriber.available} available</Small>
                      ) : (
                        <Small bgcolor={bgPrimary}>in stock</Small>
                      )
                    ) : (
                      <Small bgcolor={bgError}>out of stock</Small>
                    )}
                  </TableCell>
                  <TableCell colSpan={1}>${subscriber.price}</TableCell>
                  <TableCell colSpan={1}>
                    <Button 
                      variant="contained"
                      color="success" 
                      endIcon={<SendIcon />}
                      onClick={() => handleOpenModal(index)}
                    >
                      Join
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={drivers.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
      </>
  );
};

export default QueryTable;
