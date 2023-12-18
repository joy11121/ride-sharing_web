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
import { useContext } from "react";
import UserContext from "app/contexts/UserContext";

import positionList from "./Maps/PositionList";

const Filter = () => {

    const {timeValue, setTimeValue, setMyPos, setMyDest} = useContext(UserContext);

    const [locations1, setLocations1] = useState([]);
    const [locations2, setLocations2] = useState([]);

    const resetTypes = () => {
        setLocations1(prev => {
            const newList = positionList.map((item) => ({name: item[2], checked: false}));
            newList[0].checked = true;
            return newList;
        });
        setLocations2(prev => {
            const newList = positionList.map((item) => ({name: item[2], checked: false}));
            newList[newList.length - 1].checked = true;
            return newList;
        })
    }

    useEffect(() => {
        resetTypes();
    }, []);

    return (
        <Grid> 
            <MyTimePicker
                value={timeValue}
                setValue={setTimeValue}
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