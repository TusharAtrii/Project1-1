import { Box, Button, Card, FormHelperText, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../Hooks/useAuth/useAuth";
import { enqueueSnackbar } from "notistack";



function SignUpComp({ setVerify }: any) {

const {request} = useAuth()
const [state, setState] = useState(false);
const [authentication,setAuthentication] = useState("")

  const Onsubmit = async (value: any) => {
   if(!value.password){
    const result = await request.post('/auth',value);
    console.log(result.data);
    
   if(result.data){
      setState(true)
      setAuthentication("")
   }else{
    enqueueSnackbar("Authentication Failed",{variant:'error'})
    setAuthentication("Email not Found")
    setState(false);
   }
    
   }
    
  };
  const FormSchema = Yup.object().shape({
    Email: Yup.string().email("invalid email !").required("Email is Required"),
    password: Yup.string()
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      ),
  });

  interface User {
    Email: string;
    password?: string;
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
        height: "400px",
        Width: "500px",

        fontFamily: "sans-serif",
        alignSelf: "flex-start",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          background: "#D4164B",
          minHeight: "30px",
          paddingTop: 2,
          paddingLeft: 3,
          color: "white",
        }}
      >
        Sign up & Get ₹500 OYO Money
      </Box>
      <Box
        sx={{
          paddingLeft: 3,
          paddingRight: 2,
          background: "white",
          width: "450px",
        }}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>
          Login/Signup
        </Typography>
        <Typography sx={{ fontWeight: "700" }}>
          Please enter your Email to continue
        </Typography>
        <form onSubmit={handleSubmit(Onsubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ fontWeight: "700", marginTop: 1 }}>Email</Box>

            <TextField
              sx={{ fontWeight: "500", marginTop: 1 }}
              {...register("Email")}
            ></TextField>
            <FormHelperText sx={{color:"red",m:2}} >{errors.Email?.message}</FormHelperText>
            {authentication && (<Typography sx={{fontSize:"small",m:2,color:"red"}}  >{authentication}</Typography>)}
          </Box>
          {state && (
            <Box sx={{ fontWeight: "700", marginTop: 1 }}>
              <label htmlFor="password">Password</label>
              <br />
              <TextField
                id="password"
                type="password"
                sx={{ fontWeight: "500", minWidth: "100%" }}
                {...register("password")}
              ></TextField>
            </Box>
          )}
          {state ?(  <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Log In
          </Button>):( <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
            Verify Email
          </Button>)}

        </form>
        {/* <Box sx={{ display: "flex", fontWeight: " 600 ", marginTop: 1 }}>
          {state ? (
            <p>Prefer to Proceed with email verification instead?</p>
          ) : (
            <p>Prefer to Sign in with password instead?</p>
          )} */}

          {/* <Button
            sx={{ color: "red", marginTop: -1 }}
            onClick={() => {
              if (state) {
                setState(false);
              } else {
                setState(true);
              }
            }}
          >
            Click here
          </Button> */}
        {/* </Box> */}
      </Box>
    </Box>
  );
}

export default SignUpComp;
