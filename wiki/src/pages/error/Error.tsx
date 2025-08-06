import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function Errorpage() {
  const naviagte = useNavigate();
  return (
    <div>
      Something went wrong. Please contact the admin <br />
      <Button
        onClick={() => naviagte("/")}
        startIcon={<Home />}
        variant="contained"
      >
        Return Home
      </Button>
    </div>
  );
}

export default Errorpage;
