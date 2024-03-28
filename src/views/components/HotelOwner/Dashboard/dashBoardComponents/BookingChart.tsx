"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { alpha, useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";
import { ArrowClockwise as ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowClockwise";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import type { ApexOptions } from "apexcharts";

// import Chart from "./Chart";
import { BarChart } from "@mui/x-charts/BarChart";
import { FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";

export interface SalesProps {
  chartSeries: { name: string; data: number[] }[];
  sx?: SxProps;
  setBookingType: any;
  bookingType: any;
}

export function BookingChart({
  chartSeries,
  sx,
  setBookingType,
  bookingType,
}: SalesProps): React.JSX.Element {
  // const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader
        // action={

        // }
        title="Bookings"
      />
      <CardContent>
        <Stack direction={"row"}>
          <BarChart
            height={350}
            series={chartSeries}
            xAxis={[
              {
                data: [
                  "Jan",
                  "feb",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                scaleType: "band",
              },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            colors={[
              bookingType === "Total"
                ? "skyBlue"
                : bookingType === "Accepted"
                ? "green"
                : "grey",
            ]}
          />
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ mt: -5 }}
            defaultValue={"Total"}
            onChange={(event) => {
              setBookingType(event.target.value);
            }}
          >
            <FormControlLabel value="Total" control={<Radio />} label="Total" />
            <FormControlLabel
              value="Accepted"
              control={<Radio color="success" />}
              label="Accepted"
            />
            <FormControlLabel
              value="Pending"
              control={<Radio color="default" />}
              label="Pending"
            />
          </RadioGroup>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(): ApexOptions {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: { show: false },
    },
    colors: [
      theme.palette.primary.main,
      alpha(theme.palette.primary.main, 0.25),
    ],
    dataLabels: { enabled: false },
    fill: { opacity: 1, type: "solid" },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    legend: { show: false },
    plotOptions: { bar: { columnWidth: "40px" } },
    stroke: { colors: ["transparent"], show: true, width: 2 },
    theme: { mode: theme.palette.mode },
    xaxis: {
      axisBorder: { color: theme.palette.divider, show: true },
      axisTicks: { color: theme.palette.divider, show: true },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: { offsetY: 5, style: { colors: theme.palette.text.secondary } },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: { colors: theme.palette.text.secondary },
      },
    },
  };
}
