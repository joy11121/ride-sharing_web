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
  Rating,
  Grid,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { Paragraph } from 'app/components/Typography';

import { useEffect } from "react";
import RideModal from "./Modals/RideModal";

import instance from "api";

const drivers = [
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Complete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
  },
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Incomplete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
  },
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Incomplete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
  },
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Incomplete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
  },
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Ccomplete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
  },
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Complete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
  },
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Incomplete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
  },
  {
    name: "吉米",
    startTime: "13:00, 18 january, 2019",
    arrivaltime: "13:00, 18 january, 2019",
    price: 1000,
    rate: 5,
    start: "中山",
    pickupPoint: "台大",
    destination: "TSMC",
    personCount: 1,
    capacity: 4,
    status: "Incomplete",
    imgUrl: '/assets/images/products/headphone-2.jpg',
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

  // Switch between tables
  const [tableMode, setTableMode] = useState("search");

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


  useEffect(() => {
    const search = async() =>{
      const res = await instance.get('/search', {
        year: 2023, month: 12, day: 11, hour:10, minute:10, departure:'A', arrival:'A'
      });
      console.log(res);
    };
    search();
    
  }, []);

  return (
      <>
      <RideModal 
        open={modalOpen}
        setOpen={setModalOpen}
        driver={modalDriver}
      />
      <Box width="100%" overflow="auto">
        {tableMode !== "driver" && 
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3 }} colSpan={1.5}>
                    駕駛
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1.5}>
                    抵達時間
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                    上車地點
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                    已搭乘人數/容量
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                    駕駛評價
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                    價格
                </TableCell>
                {tableMode=="search" && 
                <TableCell sx={{ px: 0 }} colSpan={1}>
                    加入行程
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber, index) => (
                  <TableRow key={index}>
                    {/* <TableCell align="left">{subscriber.name}</TableCell> */}
                    <TableCell colSpan={1.5} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Box display="flex" alignItems="center">
                        <Avatar src={subscriber.imgUrl} />
                        <Paragraph sx={{ m: 0, ml: 4 }}>{subscriber.name}</Paragraph>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={1.5}>{subscriber.arrivaltime}</TableCell>
                    <TableCell colSpan={1}>{subscriber.pickupPoint}</TableCell>
                    <TableCell sx={{ px: 0 }} align="left">
                      {subscriber.personCount / subscriber.capacity < 0.5 ? (
                          <Small bgcolor={bgPrimary}>{subscriber.personCount}/{subscriber.capacity}</Small>
                        ) : (
                          <Small bgcolor={bgError}>{subscriber.personCount}/{subscriber.capacity}</Small>
                        )}
                    </TableCell>
                    <TableCell colSpan={1}>
                      <Rating name="read-only" value={subscriber.rate} readOnly />
                    </TableCell>
                    <TableCell colSpan={1}>${subscriber.price}</TableCell>
                    {tableMode=="search" && 
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
                    }
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
        }
        {tableMode === "driver" && 
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 0 }} colSpan={1.5}>
                    起點
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1.5}>
                    開始時間
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1.5}>
                    完成時間
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                    已搭乘人數/容量
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={1}>
                    價格
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={1.5} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                      <Box display="flex" alignItems="center">
                        <Avatar src={subscriber.imgUrl} />
                        <Paragraph sx={{ m: 0, ml: 4 }}>{subscriber.start}</Paragraph>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={1.5}>{subscriber.startTime}</TableCell>
                    <TableCell colSpan={1.5}>{subscriber.endTime}</TableCell>
                    <TableCell sx={{ px: 0 }} align="left">
                      {subscriber.personCount / subscriber.capacity < 0.5 ? (
                          <Small bgcolor={bgPrimary}>{subscriber.personCount}/{subscriber.capacity}</Small>
                        ) : (
                          <Small bgcolor={bgError}>{subscriber.personCount}/{subscriber.capacity}</Small>
                        )}
                    </TableCell>
                    <TableCell colSpan={1}>${subscriber.price}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>
        }

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
        <Box sx={{ '& button': { mx: 10, my: 1 }, display:"flex", justifyContent:"center" }}>
          <Button variant="outlined" size="large" onClick={()=>setTableMode("search")}>
            我想共乘
          </Button>
          <Button variant="outlined" size="large" onClick={()=>setTableMode("driver")}>
            歷史紀錄(我是司機)
          </Button>
          <Button variant="outlined" size="large" onClick={()=>setTableMode("passenger")}>
            歷史紀錄(我是乘客)
          </Button>
        </Box>
        <Grid sx={{display:'flex', alignItems:'center'}}>
          
        </Grid>
      </Box>
      </>
  );
};

export default QueryTable;