import { Stack, Typography } from '@mui/material'
import React from 'react'
import ShowCustomerBooking from './ShowCustomerBooking'
import BookingDetails from './BookingDetails'

function CustomerBooking() {
  return (
    <>  <Typography
    sx={{
      fontWeight: "bold",
      fontSize: 35,
      color: "rgb(215, 0, 64)",
      fontFamily: "system-ui",
      ml:5,
   mt:5,
   mb:0
    }}
  >
    Booking History-
  </Typography> 
  <Stack direction={'row'} spacing={0}><ShowCustomerBooking/><BookingDetails></BookingDetails></Stack>
  </>
  
  
  )
}

export default CustomerBooking
