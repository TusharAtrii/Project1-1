// PaymentForm.js
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../../../Hooks/useAuth/useAuth";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import io from "socket.io-client";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling", "flashsocket"],
});


/**
* to show payment card . Markdown is *PaymentForm*.
*/


const PaymentForm = ({ setDisplayLoader, setDisplay, bookingId,totalPrice,result }: any) => {
  const stripe = useStripe();
  const navigate = useNavigate()
  const elements = useElements();
  const [message,setMessage] = useState(false)
  const [error, setError] = useState(null);
  const [disableButton,setDisableButton] = useState(false);
  const { request } = useAuth();
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleSubmit = async (event: any) => {
    setDisableButton(true)
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setMessage(true)
    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement as any);

    if (error) {
      console.error(error);
    } else {
      // Send the token to your server
      setDisplay(false);
      setDisplayLoader(true);
      const response = await request.post("/order", {
        headers: {
          "Content-Type": "application/json",
        },
        body: {token:JSON.stringify({token}),price:totalPrice},
      });

      const result = await response.data;

      if (result.success) {
        const data = await request.post("/paymentSuccess", {
          transactionId: result.charge.balance_transaction,
          amount_captured: result.charge.amount_captured,
          bookingId: bookingId,
        });
        setTimeout(() => {
          setDisplayLoader(false);
          navigate('/myBookings')
        });
        socket.emit("response", true);
      } else {
        setDisplayLoader(false);
        console.error("Payment failed:", result.error);
      }
    }
    setDisableButton(false)
    setMessage(false)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontSize: "25px", margin: 10 }}>Enter Card details</label>
      <Box sx={{ width: 350, padding: 5, m: 2 }}>
        <CardElement options={cardElementOptions} />
      </Box>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Button variant="contained" type="submit" disabled={!stripe || disableButton}>
        Pay
      </Button>
      {message && <Typography width={'100%'} mt={2} color={'error'} >Your Payment is processing please do not refresh...</Typography>}
    </form>
  );
};

export default PaymentForm;
