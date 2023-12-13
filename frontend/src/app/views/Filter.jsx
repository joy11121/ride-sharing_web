import {
  Box,
  Button,
  Grid,
  Divider,
  Chip,
} from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';
import FilterItem from "./FilterItem";
import { useState, useEffect } from "react";
import MyTimePicker from './MyTimePicker'

const locationList = ['A', 'B', 'C', 'D', 'E', 'F'];

const Filter = ({value, setValue, setMyPos, setMyDest}) => {
    const [locations1, setLocations1] = useState([]);
    const [locations2, setLocations2] = useState([]);

    const resetTypes = () => {
        setLocations1(locationList.map((item) => ({name: item, checked: false})));
        setLocations2(locationList.map((item) => ({name: item, checked: false})))
    }

    useEffect(() => {
        resetTypes();
    }, []);

    return (
        <Grid> 
            {/* <Divider textAlign="left">
                <Chip label="FILTER BY" />
            </Divider>
            <Box sx={{ display: 'flex', gap: 1, fontFamily: 'Consolas' }} margin={1}>
                <Button size="sm" variant="soft" color="danger"
                    onClick={resetTypes}
                >
                    <ClearIcon/>
                    Clear All
                </Button>
            </Box>
            <br/> */}
            <MyTimePicker
                value={value}
                setValue={setValue}
            />
            <br/>

            <Divider textAlign="left">
                <Chip label="我的位置" />
            </Divider>
            <Grid container spacing={1} margin={1}>
                {locations1.map((item, index) => 
                    <Grid item>
                        <FilterItem 
                            items={locations1} 
                            index={index} 
                            setItems={setLocations1} 
                            setMyPos={setMyPos}
                        >
                            {item.name}
                        </FilterItem>
                    </Grid>  
                )}
            </Grid>

            <Divider textAlign="left">
                <Chip label="我的目的地" />
            </Divider>
            <Grid container spacing={1} margin={1}>
                {locations2.map((item, index) => 
                    <Grid item>
                        <FilterItem 
                            items={locations2} 
                            index={index} 
                            setItems={setLocations2} 
                            setMyPos={setMyDest}
                        >
                            {item.name}
                        </FilterItem>
                    </Grid>  
                )}
            </Grid>

        </Grid>
    )
}

export default Filter;