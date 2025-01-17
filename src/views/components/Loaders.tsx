import { Box } from "@mui/material";
import "../../App.css";
import Loader from "react-js-loader";
function Loaders() {
  const color = "#EE2A24";
  return (
    <Box
      sx={{
        zIndex: 1,
        position: "absolute",
        width: "100%",
        // { xl: "1850px", md: "1024px", sm: "768px" }
        // xl:'60vh',md:'60vh',sm:'70vw'
        height: "100%",
        paddingTop: 50,
      }}
      className="blur"
    >
      <center>
        {" "}
        <Loader
          type="bubble-scale"
          bgColor={color}
          color={color}
          size={50}
          className="loader"
        />
      </center>
    </Box>
  );
}

export default Loaders;
