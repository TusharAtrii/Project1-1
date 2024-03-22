import { Box, Button, Card, Typography, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import OverViewHotel from "./OverViewHotel";
import PhotosDetails from "./PhotosDetails";
import ReviewDetails from "../../OtherComponents/ReviewDetails";
import InfoHotelDetails from "./InfoHotelDetails";
import { FormattedMessage } from "react-intl";
function HotelDetails({
  i,
  item,
  handleClick,
  openModule,
  setOpenModule,
  scrollRef,
}: any) {
  const [activeButton, setActiveButton] = useState<any>("info");
  useEffect(() => {
    setOpenModule("info");
  }, []);
  return (
    <Box
      sx={{
        fontFamily: "sans-serif",
        Width: { sm: "100%", lg: "100%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: { sm: "150px", lg: "400px" },
          ml: { xl: "30%", sm: "40%", md: "40%", lg: "25%" },
          justifyContent: "space-evenly",
        }}
      >
        {activeButton === "Overview" ? (
          <Button
            sx={{
              color: "Black",
              fontWeight: 500,
              borderBottom: "1px solid Blue",
              fontSize: { sm: 12, lg: 14, md: 12 },
            }}
            onClick={() => {
              setOpenModule("Overview");
              setActiveButton("Overview");
            }}
          >
            <FormattedMessage defaultMessage={"Overview"} />
          </Button>
        ) : (
          <Button
            sx={{ color: "grey", fontSize: { sm: 12, lg: 14, md: 10 } }}
            onClick={() => {
              setOpenModule("Overview");
              setActiveButton("Overview");
            }}
          >
            <FormattedMessage defaultMessage={"Overview"} />
          </Button>
        )}
        {activeButton === "info" ? (
          <Button
            sx={{
              color: "Black",
              fontWeight: 500,
              borderBottom: "1px solid Blue",
              fontSize: { sm: 12, lg: 14, md: 12 },
            }}
            onClick={() => {
              setOpenModule("info");
              setActiveButton("info");
            }}
          >
            <FormattedMessage defaultMessage="Info" />
          </Button>
        ) : (
          <Button
            sx={{ color: "grey", fontSize: { sm: 12, lg: 14, md: 10 } }}
            onClick={() => {
              setOpenModule("info");
              setActiveButton("info");
            }}
          >
            Info
          </Button>
        )}
        {activeButton === "Photos" ? (
          <Button
            sx={{
              color: "Black",
              fontWeight: 500,
              borderBottom: "1px solid Blue",
              fontSize: { sm: 12, lg: 14, md: 12 },
            }}
            onClick={() => {
              setOpenModule("Photos");
              setActiveButton("Photos");
            }}
          >
            <FormattedMessage defaultMessage="Photos" />
          </Button>
        ) : (
          <Button
            sx={{ color: "grey", fontSize: { sm: 12, lg: 14, md: 10 } }}
            onClick={() => {
              setOpenModule("Photos");
              setActiveButton("Photos");
            }}
          >
            <FormattedMessage defaultMessage="Photos" />
          </Button>
        )}

        {/* {activeButton === "Reviews" ? (
          <Button
            sx={{
              color: "Black",
              fontWeight: 500,
              borderBottom: "1px solid Blue",
            }}
            onClick={() => {
              setOpenModule("Reviews");
              setActiveButton("Reviews");
            }}
          >
            Reviews
          </Button>
        ) : (
          <Button
            sx={{ color: "grey" }}
            onClick={() => {
              setOpenModule("Reviews");
              setActiveButton("Reviews");
            }}
          >
            Reviews
          </Button>
        )} */}
      </Box>
      <Button
        sx={{
          float: "right",
          borderRadius: 3,
          color: "black",
          mt: { sm: -3.7, lg: -4.8 },
          fontSize: { sm: 12, lg: 18 },
        }}
        onClick={() => {
          handleClick(i);
        }}
      >
        X
      </Button>
      {openModule === "info" ? (
        <InfoHotelDetails item={item} scrollRef={scrollRef} />
      ) : openModule === "Overview" ? (
        <OverViewHotel item={item} />
      ) : openModule === "Photos" ? (
        <PhotosDetails item={item} />
      ) : (
        <ReviewDetails />
      )}
    </Box>
  );
}

export default HotelDetails;
