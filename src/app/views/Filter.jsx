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

const typeList = ['Car', 'Taxi', 'Airplane', 'Motorcycle']
const locationList = Array(10).fill('Taipei');

const Filter = () => {
    const [types, setTypes] = useState([]);
    const [locations, setLocations] = useState([]);

    const resetTypes = () => {
        setTypes(typeList.map((item) => ({name: item, checked: false})));
        setLocations(locationList.map((item) => ({name: item, checked: false})))
    }

    useEffect(() => {
        resetTypes();
    }, []);

    return (
        <Grid> 
            <Divider textAlign="left">
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
            <br/>
            <Divider textAlign="left">
                <Chip label="ARRIVAL TIME" />
            </Divider>
            <br/>

            <Divider textAlign="left">
                <Chip label="TRAFFIC WAY" />
            </Divider>
            <Grid container spacing={1} margin={1}>
                {types.map((item, index) => 
                    <Grid item>
                        <FilterItem items={types} index={index} setItems={setTypes}>
                            {item.name}
                        </FilterItem>
                    </Grid>
                )}
            </Grid>
            <br/>

            <Divider textAlign="left">
                <Chip label="LOCATION" />
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