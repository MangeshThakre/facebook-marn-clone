import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign.css";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Signup from "./signup";
import md5 from "md5";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
function Signin() {
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [toggleCreateAccountComponent, setToggleCreateAccountComponent] =
    useState(false);
  const [phoneNo, setphoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [useremail_phone, setUserEmail_phoone] = useState("");
  const [passWarnint, setPasswarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [passErr, setPasswordErr] = useState("");

  const signin = async (useremail_phone, userpass) => {
    setIsLoading(true);
    var data;
    if (useremail_phone.includes(".com")) {
      data = {
        email: useremail_phone.toLowerCase(),
        password: md5(userpass),
      };
    } else {
      data = {
        phoneNo: Number(useremail_phone.toLowerCase()),
        password: md5(userpass),
      };
    }

    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/signin",
        headers: { "content-type": "application/json" },
        data: data,
      });
      const responseData = await response.data.Token;
      setIsLoading(false);
      if (responseData === "invalid") {
        setWarning(true);
        setPasswarning(true);
      } else {
        localStorage.setItem("TOKEN", responseData);
        // dispatch(TOKEN(responseData));
        setphoneNo("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {toggleCreateAccountComponent ? (
        <Signup
          setToggleCreateAccountComponent={setToggleCreateAccountComponent}
        />
      ) : null}

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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
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
                      error={warning}
                      id="outlined-basic"
                      placeholder="Email address or Phone number"
                      variant="outlined"
                      onChange={(e) => {
                        setphoneNo(e.target.value);
                        setWarning(false);
                      }}
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
                      error={passWarnint}
                      defaultValue={password}
                      id="outlined-basic"
                      type="password"
                      placeholder="Password"
                      variant="outlined"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setWarning(false);
                        setPasswordErr("");
                      }}
                    />

                    {warning ? (
                      <p style={{ color: "red" }}>
                        There was a problem with your login.
                      </p>
                    ) : null}
                    {passErr ? (
                      <p style={{ color: "red" }}>
                        password must have minimum 6 characters
                      </p>
                    ) : null}

                    <Button
                      sx={{ width: "275px", marginTop: "7px" }}
                      variant="contained"
                      disabled={
                        (phoneNo !== "") & (password !== "") ? false : true
                      }
                      onClick={() => {
                        if (password.length < 6) {
                          setPasswordErr(
                            "password must have minimum 6 characters"
                          );
                        } else {
                          signin(phoneNo, password);
                        }
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress
                          sx={{ color: "#1976d2" }}
                          size="1.6rem"
                        />
                      ) : (
                        "Log In"
                      )}
                    </Button>
                    <Link
                      style={{
                        fontSize: "13px",
                        margin: "7px 0 20px 0",
                        color: "#3588f3",
                        textDecoration: "none",
                      }}
                      to="/reset"
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
                      onClick={() => setToggleCreateAccountComponent(true)}
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
    </>
  );
}

export default Signin;
