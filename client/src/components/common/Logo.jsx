import React from 'react'
import { Typography, useTheme } from '@mui/material'

const Logo = () => {
    const theme = useTheme()
  return (
   <Typography fontWeight="700" fontSize="1.7rem">
    E<span style={{color: theme.palette.primary.main}}>Music</span>
   </Typography>
  )
}

export default Logo
