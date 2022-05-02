import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign.css";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { borderRadius } from "@mui/system";
function Signup() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div className="container" style={{ margin: "0 40px", width: "810px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <div style={{ margin: "10px 20px 30px 0" }}>
              <div className="facebook-Image">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                  alt="Facebook"
                />
              </div>
              <div className="content">
                <p>
                  Facebook helps you connect and share with the people in your
                  life.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ width: "350px", borderRadius: "7px" }}>
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{
                      marginTop: "7px",
                      input: {
                        width: "250px",
                        fontSize: "15px",
                        height: "6px",
                      },
                    }}
                    id="outlined-basic"
                    placeholder="Email address or Phone number"
                    variant="outlined"
                  />
                  <TextField
                    sx={{
                      marginTop: "7px",
                      input: {
                        width: "250px",
                        fontSize: "15px",
                        height: "6px",
                      },
                    }}
                    id="outlined-basic"
                    placeholder="Password"
                    variant="outlined"
                  />

                  <Button
                    sx={{ width: "275px", marginTop: "7px" }}
                    variant="contained"
                  >
                    Log In
                  </Button>
                  <Link
                    style={{
                      fontSize: "13px",
                      margin: "7px 0 20px 0",
                      color: "#3588f3",
                    }}
                    to="/expenses"
                  >
                    Forgotten password?
                  </Link>
                  <div>
                    <Divider variant="middle" sx={{ width: "250px" }} />
                  </div>

                  <Button
                    sx={{
                      width: "210px",
                      margin: "20px 0 7px 0 ",
                      backgroundColor: "#42b72a",
                    }}
                    variant="contained"
                  >
                    Create New Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Signup;
