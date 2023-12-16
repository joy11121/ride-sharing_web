import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react'

export default function ActionAlerts({show, setShow, message}) {

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [show]);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }
  return (
    <Stack sx={{ width: '80%', paddingLeft: '15%', paddingTop: '1%' }} spacing={2}>
      {message === 'success' ?
      <Alert >成功加入行程</Alert> :
      <Alert severity="error">請選擇路徑，輸入內容不應為空，並且應為數字</Alert>}
    </Stack>
  );
}