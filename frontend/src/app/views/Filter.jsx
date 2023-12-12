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

const locationList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const Filter = ({value, setValue}) => {
    const [locations, setLocations] = useState([]);

    const resetTypes = () => {
        setLocations(locationList.map((item) => ({name: item, checked: false})))
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
                {locations.map((item, index) => 
                    <Grid item>
                        <FilterItem items={locations} index={index} setItems={setLocations} >
                            {item.name}
                        </FilterItem>
                    </Grid>  
                )}
            </Grid>

        </Grid>
    )
}

export default Filter;