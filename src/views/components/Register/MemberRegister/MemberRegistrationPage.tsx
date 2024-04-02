import { Box, Grid, Stack, Typography } from "@mui/material";
import SignUpComp from "../../Customer/Login-Register/Loginn";
import Footer from "../../Customer/Footer/Footer";
import { useState } from "react";
import OtpVerification from "../../OtherComponents/OtpVerification";
import SignUp from "../../Customer/Login-Register/SignUp";
import { useSelector } from "react-redux";
import BasicCard from "../../Customer/Header/Navbar/HotelLocations/Home";
import MemberRegister from "./MemberRegister";
import Language from "../../Language";
import Logo from "../../Logo/Logo";

function MemberRegistrationPage() {
  const [verify, setVerify]: any = useState(0);
  const [LogReg, setLogReg] = useState(false);
  const [email, setEmail]: any = useState("");
  const user = useSelector((state: any) => state.userReducer.user);
  return (
    <>
      {!user ? (
        <>
          <Grid
            container
            xs={12}
            direction={"row"}
            //     sx={{
            //       background: `
            // linear-gradient(
            //   rgba(0, 0, 0, 1),
            //   rgba(0, 0, 0, 0.1)
            // ),
            // url("https://assets.oyoroomscdn.com/cmsMedia/b3c9905c-31d1-4349-8594-c07deae6b36d.jpg") no-repeat`,
            //       width: "100%",
            //       height: "100vh",

            //       backgroundSize: "cover",

            //       opacity: "80%",
            //       display: "flex",
            //       justifyContent: "center",
            //     }}
          >
            <Grid container xs={7}>
              <Box
                component={"img"}
                src={require("../../../../assets/Group 13.jpg")}
                width={"50vw"}
                height={"100vh"}
                position={"fixed"}
              />
            </Grid>

            {/* <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={4}
              justifyContent={"space-around"}
              width={"100%"}
            > */}
            {/* <Typography
                sx={{
                  color: "white",

                  fontWeight: "bolder",
                  textAlign: "left",

                  alignContent: "end",

                  width: { sm: "40%" },
                }}
              >
                {" "}
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xl: 45, md: 28, sm: 26 },
                  }}
                >
                  There's a smarter way to OYO around
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xl: 16, md: 11, sm: 15 },
                    mt: 1,
                    letterSpacing: 1,
                  }}
                >
                  Sign up with phone number and get exclusive access to
                  discounts and savings on OYO stays and with our many travel
                  partners.
                </Typography>
              </Typography> */}
            <Grid container xs={5} direction={"column"} mt={10}>
              <Stack alignItems={"flex-end"}>
                <Language />
              </Stack>
              <Grid item ml={15}>
                <Logo />
              </Grid>
              <Grid item>
                <MemberRegister />
              </Grid>
            </Grid>
          </Grid>
          {/* </Stack> */}
          {/* <Footer />{" "} */}
        </>
      ) : (
        <BasicCard />
      )}
    </>
  );
}

export default MemberRegistrationPage;
