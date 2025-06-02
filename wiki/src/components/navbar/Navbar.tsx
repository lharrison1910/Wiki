import { ListSharp, ViewDay } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: 75, bgcolor: "#3E3E3E" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => navigate("/")}
              sx={{ color: "white", fontSize: 20 }}
            >
              Duncan's Wiki
            </Button>
          </Typography>
          <IconButton>
            <ListSharp sx={{ color: "white" }} />
          </IconButton>
          <IconButton>
            <ViewDay sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
