import {
  Box,
  Button,
} from "@mui/material";

import { useState } from "react";

import { createTheme, alpha, ThemeProvider, getContrastRatio } from '@mui/material/styles';

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.95),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

export default function FilterItem({items, index, setItems, setMyPos}) {
  const handleClick = () => {
    setMyPos(items[index].name);
    setItems((prev) => {
      const newItems = prev.map((item) => ({name: item.name, checked: false}));
      newItems[index].checked = true;
      return newItems;
    })
  };
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', gap: 1, fontFamily: 'Consolas' }}>
      <Button 
        size="sm" 
        variant={items[index].checked ? 'contained' : 'outlined'}
        color={items[index].checked ? 'success' : 'secondary'}
        // sx={{ 
        //   color: 'white',
        //   bgcolor: items[index].checked ? 'violet.dark' : 'white'
        // }}
        checked={items[index].checked}
        onClick={handleClick}
        // onChange={handleChange}
      >
          {items[index].name}
      </Button>
    </Box>
    </ThemeProvider>
  );
}