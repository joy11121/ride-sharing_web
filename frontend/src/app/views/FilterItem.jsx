import {
  Box,
  Button,
} from "@mui/material";

import { useState } from "react";

export default function FilterItem({items, index, setItems}) {
  const handleClick = () => {
    setItems((prev) => {
      const newItems = prev.map((item) => ({name: item.name, checked: false}));
      newItems[index].checked = !prev[index].checked;
      return newItems;
    })
  };
  return (
    <Box sx={{ display: 'flex', gap: 1, fontFamily: 'Consolas' }}>
      <Button 
        size="sm" 
        variant={items[index].checked ? 'contained' : 'outlined'}
        color={items[index].checked ? 'success' : 'secondary'}
        checked={items[index].checked}
        onClick={handleClick}
        // onChange={handleChange}
      >
          {items[index].name}
      </Button>
    </Box>
  );
}