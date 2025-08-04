// import { ListSharp, ViewDay } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  // IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";

// interface Props {
//   updateDisplay: (display: string) => void;
// }

function Navbar() {
  const navigate = useNavigate();

  // const handleClick = (display: string) => {
  //   updateDisplay(display);
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: 75, bgcolor: "#3E3E3E" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => navigate("/")}
              sx={{ color: "white", fontSize: 20 }}
            >
              SAPfolio
            </Button>
            {/* <img src="../../../public/logo.svg" /> */}
          </Typography>
          {/* <IconButton name="list" onClick={() => handleClick("list")}>
            <ListSharp sx={{ color: "white" }} />
          </IconButton>
          <IconButton name="card" onClick={() => handleClick("card")}>
            <ViewDay sx={{ color: "white" }} />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
