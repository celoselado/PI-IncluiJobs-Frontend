import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar variant="dense">
          <Grid container justifyContent={"space-between"}>
            <Box style={{ cursor: "pointer" }}>
              <Typography variant="h5" color="inherit">
                IncluiJobs
              </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  <Link to={"/home"} className="text">
                    Home
                  </Link>
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  <Link to={"/sobre"} className="text">
                    Sobre Nós
                  </Link>
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="h6" color="inherit">
                  <Link to={"/login"} className="text">
                    Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
