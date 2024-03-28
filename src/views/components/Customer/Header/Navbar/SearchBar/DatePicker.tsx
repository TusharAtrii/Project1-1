import * as React from "react";
import { addDays, format, isBefore, isSameDay } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import dayjs from "dayjs";
import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { date } from "../../../../redux/user/userSlice";
import moment from "moment";
import {start} from "../../../../redux/user/userSlice"
import {end} from "../../../../redux/user/userSlice"
export default function BasicRangeShortcuts({ setDates, onClose }: any) {
  const dispatch = useDispatch();
  const [storeDate, setStoreDate] = React.useState<any>("");
  const [disabled, setDisabled] = React.useState({
    status: false,
    message: "",
  });
const [reduxStartDate,setStartDate]=React.useState<any>()
const [reduxEndDate,setEndDate]=React.useState<any>()
  const handleDate = (e: any) => {
    if (String(e?.[0]?.$d) === String(e?.[1]?.$d)) {
      setDisabled({
        status: true,
        message: "check-In date and check-out date can't be same ",
      });
    } else {
      setDisabled({
        status: false,
        message: "",
      });
    }

  

    if (e?.[0]?.$d && e?.[1]?.$d) {
      const start = format(new Date(e?.[0]?.$d), "eee,dd MMMM");
      const end = format(new Date(e?.[1]?.$d), "eee,dd MMMM");
      let startDate = moment(e?.[0]?.$d).format('MMMM Do YYYY');
      let endDate = moment(e?.[1]?.$d).format('MMMM Do YYYY');
      
      if (start !== end) {
        setStartDate(startDate);
        setEndDate(endDate)
        setStoreDate(`${start}  -  ${end}`);
      }
    } else if (e?.[0]?.$d && !e?.[1]) {
      const startDate = new Date(e?.[0]?.$d);
      const start = format(new Date(e?.[0]?.$d), "eee,dd MMMM");
      let startDate2 = moment(e?.[0]?.$d).format('MMMM Do YYYY');
      const date = addDays(startDate, 1);

      var end = "";
      var endDate=""
      if (date) {
         endDate = moment(date).format('MMMM Do YYYY');
        end = format(new Date(date?.toString()), "eee,dd MMMM");
      }
      setStartDate(startDate2);
      setEndDate(endDate)
      setStoreDate(`${start}  -  ${end}`);
    }
  };
  const handleClick = () => {
    onClose();
    setDates(storeDate);
    if (storeDate) {
      dispatch(date(storeDate));
      dispatch(start<any>(reduxStartDate))
      dispatch(end<any>(reduxEndDate))
    }
  };

  return (
    <>
      {" "}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box color={"red"} m={2}>
          {disabled?.message}
        </Box>
        <StaticDateRangePicker
          minDate={dayjs(new Date())}
          slotProps={{
            actionBar: { actions: [] },
          }}
          calendars={1}
          onChange={(e: any) => {
            handleDate(e);
          }}
        />
      </LocalizationProvider>
      {/* <Stack width={"100%"}> */}
      <Stack direction={"row"} sx={{ float: "right", m: 1 }} spacing={1}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleClick}
          variant="contained"
          disabled={disabled.status}
        >
          Ok
        </Button>
        {/* </Stack> */}
      </Stack>
    </>
  );
}
