import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormHelperText, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth/useAuth";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AddHotelLocation from "./AddHotelLocation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import HotelProfilePic from "./HotelProfilePic";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { Chip, IconButton } from "@mui/material";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";
import Footer from "./Footer";

export default function AddHotelAftrLgn() {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.userReducer.user);
  const { request } = useAuth();
  const [location, setLocation] = useState({
    longitude: 76.779419,
    latitude: 30.733315,
  });

  const [step, setStep] = React.useState(0);
  const handleStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };
  const handleStepBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setStep(0);
    }
  };

  const [files, setfile] = React.useState<any>([]);
  const [error, setError] = React.useState("");
  const [maxPhoto, setMaxPhoto] = React.useState(false);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone();
  React.useEffect(() => {
    if (acceptedFiles.length > 1) {
      setError("Only One file can be selected");
    } else {
      setfile(acceptedFiles);

      setError("");
    }
  }, [acceptedFiles]);
  React.useEffect(() => {
    if (files.length > 0) {
      setMaxPhoto(true);
    } else {
      setMaxPhoto(false);
    }
  }, [files]);
  const handleDelete = (photo: any) => {
    setfile((oldvalue: any) => {
      if (oldvalue.length === 1) {
        return [];
      }
      return oldvalue.filter((e: any) => e.name !== photo.name);
    });
  };

  const formData = new FormData();
  const onSubmit = async (data: any) => {
    data.longitude = location.longitude;
    data.latitude = location.latitude;
    console.log(files[0]);
    formData.append("files", files[0]);
    formData.set("hotelName", data.hotelName);
    formData.set("phone", data.phone);
    formData.set("password", data.password);
    formData.set("city", data.city);
    formData.set("state", data.state);
    formData.set("postalCode", data.postalCode);
    formData.set("country", data.country);
    formData.set("lng", data.longitude);
    formData.set("lat", data.latitude);
    formData.set("email", user.email);
    // formData.set("data", data);

    if (step === 2) {
      console.log(formData);
      request.post("/addHotel", formData);
    }
    handleStep();
  };
  interface User {
    hotelName: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  var FormSchema: any = "";
  if (step === 0) {
    FormSchema = Yup.object().shape({
      hotelName: Yup.string()
        .required("This field is required")
        .min(3)
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])\w+/,
          "should be a string or should atleat have one upper case letter"
        ),
      //   email: Yup.string().email("invalid email !").required("Email is Required"),
    });
  }
  if (step === 1) {
    FormSchema = Yup.object().shape({
      city: Yup.string()
        .required("This field is required")
        .min(3)
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])\w+/,
          "should be a string or should atleat have one upper case letter"
        ),
      state: Yup.string()
        .required("This field is required")
        .min(3)
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])\w+/,
          "should be a string or should atleat have one upper case letter"
        ),
      postalCode: Yup.string()
        .required("This field is required")
        .min(3)
        .matches(/(?=.*[0-9])\w+/, "Postal Code. must be a number"),
      country: Yup.string()
        .required("This field is required")
        .min(3)
        .matches(
          /(?=.*[a-z])(?=.*[A-Z])\w+/,
          "should be a string or should atleat have one upper case letter"
        ),
    });
  }
  if (step === 2) {
    FormSchema = Yup.object().shape({});
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(FormSchema),
  });

  return (
    <Box
      sx={{
        background: `
        linear-gradient(
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0.1)
        ),
        url("https://assets.oyoroomscdn.com/cmsMedia/b3c9905c-31d1-4349-8594-c07deae6b36d.jpg") no-repeat`,
        width: "100%",
        height: "100vh",
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "block",
        opacity: "80%",
        position: "absolute",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          color: "white",
          mt: "12%",

          width: "55%",
          fontWeight: "bolder",
          textAlign: "left",
          ml: { xl: "12%", md: 6, sm: 2 },
        }}
      >
        {" "}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xl: 45, md: 28, sm: 20 },
            mt: { xl: 0, md: 15, sm: 18 },
          }}
        >
          There's a smarter way to OYO around
        </Typography>
        <Typography
          sx={{
            width: "77%",
            fontSize: { xl: 16, md: 11, sm: 9 },
            mt: 1,
            letterSpacing: 1,
          }}
        >
          Sign up with phone number and get exclusive access to discounts and
          savings on OYO stays and with our many travel partners.
        </Typography>
      </Typography>
      <Box sx={{ position: "relative", ml: { xl: "70%", md: 73, sm: 50 } }}>
        {/* {display && <Loaders />} */}
        <Card
          className="oyo-cell loginCard"
          sx={{
            border: "1px solid black",
            width: { xl: 470, md: 400, sm: 320 },
            // height: "40vh",
            mt: 20,
            b: "1px solid black",
            background: "#E0E0E0",
          }}
        >
          <Typography
            sx={{
              backgroundImage: "linear-gradient(270deg,#d11450,#ee2a24)",
              margin: "0",
              paddingLeft: { xl: "93px", md: "30px", sm: 5 },
              paddingTop: "5px",
              paddingBottom: "5px",
              color: "white",
              fontWeight: "bold",
              width: "100%",
              fontSize: { xl: 17, md: 16, sm: 13 },
            }}
            color="text.secondary"
            gutterBottom
          >
            Add hotel & Get ₹500 OYO Money
          </Typography>
          {step === 0 && (
            <Typography
              sx={{
                margin: 2,
                fontWeight: "bold",
                fontFamily: "Inter,sans-serif",
                fontSize: { xl: "30px", md: "25px", sm: 15 },
                marginBottom: 1,
              }}
            >
              Add Hotel Details
            </Typography>
          )}
          {step === 1 && (
            <Typography
              sx={{
                margin: 2,
                fontWeight: "bold",
                fontFamily: "Inter,sans-serif",
                fontSize: { xl: "30px", md: "25px", sm: 15 },
                marginBottom: 1,
              }}
            >
              Add Hotel Location
            </Typography>
          )}
          {step == 2 && (
            <Typography
              sx={{
                margin: 2,
                fontWeight: "bold",
                fontFamily: "Inter,sans-serif",
                fontSize: { xl: "30px", md: "25px", sm: 15 },
                marginBottom: 1,
              }}
            >
              Point location
            </Typography>
          )}

          <CardContent>
            <Stack>
              {step === 0 ? (
                <>
                  <Form>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xl: 16, md: 15, sm: 12 },
                      }}
                    >
                      Hotel name
                    </Typography>
                    <TextField
                      sx={{ mb: 8, height: 2, border: "none", width: "95%" }}
                      id="demo-helper-text-aligned"
                      placeholder="Enter Hotel Name"
                      {...register("hotelName")}
                    />
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.hotelName?.message}
                    </FormHelperText>

                    {/* <HotelProfilePic setPic={setPic} formData={formData} /> */}
                    <div
                      style={{
                        display: "flex",
                        padding: 10,
                        width: "20vw",
                        height: "5vw",
                        // justifyTracks: "center",
                        // marginLeft: "-5rem",
                      }}
                    >
                      <Typography {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                          <IconButton
                            sx={{
                              alignItems: "center",
                              border: "2px dashed lightgrey",
                              borderRadius: 0,
                              width: "10vw",
                              height: "5vw",
                              ml: 10,
                            }}
                          >
                            <Typography sx={{ mt: 1 }}>
                              <AddPhotoAlternateSharpIcon fontSize="large" />
                              <Typography sx={{ fontSize: "10px" }}>
                                Drop a Photo Here
                              </Typography>
                            </Typography>
                          </IconButton>
                        }
                      </Typography>
                    </div>
                    {files.map((photo: any) => (
                      <Chip
                        sx={{
                          fontSize: { xl: "13px", md: "12px", sm: 10 },
                          mt: 1,
                        }}
                        label={photo.name}
                        onDelete={() => handleDelete(photo)}
                      ></Chip>
                    ))}
                    {error && (
                      <FormHelperText sx={{ color: "red", ml: 2 }}>
                        {error}
                      </FormHelperText>
                    )}
                    {maxPhoto ? (
                      <Button
                        size="small"
                        variant="contained"
                        type="submit"
                        sx={{
                          width: { xl: 150, md: 100, sm: 50 },
                          mt: 3,
                          fontSize: { xl: 15, md: 13, sm: 10 },
                        }}
                        onClick={handleSubmit(onSubmit)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        disabled
                        type="submit"
                        sx={{
                          width: { xl: 150, md: 100, sm: 50 },
                          mt: 3,
                          fontSize: { xl: 15, md: 13, sm: 10 },
                        }}
                        onClick={handleSubmit(onSubmit)}
                      >
                        Next
                      </Button>
                    )}
                  </Form>
                </>
              ) : step === 1 ? (
                <>
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xl: 16, md: 15, sm: 13 },
                          }}
                        >
                          City
                        </Typography>
                        <TextField
                          sx={{ mb: 8, height: 2, border: "none" }}
                          id="demo-helper-text-aligned"
                          placeholder="Enter City"
                          {...register("city")}
                        />{" "}
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.city?.message}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xl: 16, md: 15, sm: 13 },
                          }}
                        >
                          State
                        </Typography>
                        <TextField
                          sx={{ mb: 8, height: 2, border: "none" }}
                          id="demo-helper-text-aligned"
                          placeholder="Enter State"
                          {...register("state")}
                        />{" "}
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.state?.message}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xl: 16, md: 15, sm: 13 },
                          }}
                        >
                          Postal code
                        </Typography>
                        <TextField
                          sx={{ mb: 8, height: 2, border: "none" }}
                          id="demo-helper-text-aligned"
                          placeholder="Enter Postal code"
                          {...register("postalCode")}
                        />{" "}
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.postalCode?.message}
                        </FormHelperText>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xl: 16, md: 15, sm: 13 },
                          }}
                        >
                          Country
                        </Typography>
                        <TextField
                          sx={{ mb: 8, height: 2, border: "none" }}
                          id="demo-helper-text-aligned"
                          placeholder="Enter Country"
                          {...register("country")}
                        />{" "}
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.country?.message}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                    {/* <Box sx={{ display: "flex" }}> */}
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        mt: 3,
                        ml: 0.5,
                        fontSize: 15,
                        background: "lightgray",
                        color: "black",
                      }}
                      onClick={handleStepBack}
                    >
                      <ArrowBackIcon
                        sx={{ fontSize: { sm: 18, md: 20, xl: 22 } }}
                      />
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit(onSubmit)}
                      sx={{
                        width: { xl: 150, md: 100, sm: 50 },
                        mt: 3,
                        fontSize: { xl: 15, md: 13, sm: 11 },
                      }}
                    >
                      Next
                    </Button>
                  </Form>
                </>
              ) : step === 2 ? (
                <>
                  <AddHotelLocation setLocation={setLocation} />
                  <Form>
                    <Box>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          mt: 3,
                          ml: 0.5,
                          fontSize: 15,
                          background: "lightgray",
                          color: "black",
                        }}
                        onClick={handleStepBack}
                      >
                        <ArrowBackIcon
                          sx={{ fontSize: { sm: 18, md: 20, xl: 22 } }}
                        />
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        type="submit"
                        sx={{
                          width: { xl: 150, md: 100 },
                          mt: 3,
                          fontSize: { xl: 15, md: 13, sm: 11 },
                        }}
                        // onClick={() => setStep(0)}
                        onClick={handleSubmit(onSubmit)}
                      >
                        Add Hotel
                      </Button>
                    </Box>
                  </Form>
                </>
              ) : null}
            </Stack>

            <Box sx={{ mt: 4, fontSize: { xl: 15, md: 13, sm: 10 } }}>
              To use Another Email for adding hotel{" "}
              <Button
                sx={{
                  textTransform: "none",
                  fontSize: { xl: 15, md: 13, sm: 10 },
                }}
                onClick={() => navigate("/memberRegister")}
              >
                Click here...
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: { sm: 30, md: 25, lg: 40 } }}>
        <Footer />
      </Box>
    </Box>
  );
}
