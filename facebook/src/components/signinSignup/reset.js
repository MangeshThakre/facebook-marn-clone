import React from "react";
import "./reset.css";
import OTPInput from "otp-input-react";

import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import axios from "axios";
import {
  Divider,
  TextField,
  Alert,
  Card,
  Snackbar,
  CardContent,
  Button,
} from "@mui/material";
import md5 from "md5";

function Reset() {
  const navigate = useNavigate();
  const [isSendLoading, setIsSendLoading] = useState(false);
  const [email, setEmail] = useState("");
  const URL = process.env.REACT_APP_API_URL;
  const [emailError, setEmailError] = useState(false);
  const [emailWarning, setEmailWarning] = useState("Email address");
  const [serverOTP, setServerOTP] = useState("");
  const [OTP, setOTP] = useState("");
  const [warning, setWarning] = useState("");
  const [resetBody, setResetBody] = useState("EMAILPAGE");
  const [resetLoading, setResetLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passAlert, setpassAlert] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function send() {
    if (!email.includes("@gmail.com")) {
      setEmailError(true);
      setEmailWarning("Invalid email");
    } else {
      setIsSendLoading(true);
      try {
        const response = await axios({
          method: "get",
          url: URL + "/api/otp?email=" + email.toLowerCase() + "&reset=false",
          headers: { "Content-type": "application/json" },
        });
        const data = await response.data;
        if (data.otp) {
          setServerOTP(data.otp);
          setResetBody("OTPPAGE");
        }
        setIsSendLoading(false);
      } catch (error) {
        setIsSendLoading(false);
        const responseText = await error.response.data;
        if (responseText == "Email not found") {
          setEmailError(true);
          setEmailWarning("email not found");
          return;
        }
      }
    }
  }

  function verify() {
    console.log(OTP, " ", serverOTP);
    if (OTP != serverOTP) return setWarning("invalid OTP");
    if (OTP == serverOTP) return setResetBody("NEWPASSWORDPAGE");
  }

  async function Reset() {
    if (password !== confirm) {
      setPasswordError(true);
      setpassAlert(true);
      return;
    } else setpassAlert(false);
    setResetLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/reset?email=" +
          email.toLowerCase() +
          "&password=" +
          md5(password),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.data;
      if (data == "update successfuly") {
        setOpen(true);
      }
    } catch (error) {
      setResetLoading(false);
      console.log(error);
    }
  }

  const emailPage = (
    <>
      <CardContent>
        <p style={{ margin: "10px 0 20px" }}>
          Please enter your email address to search for your account.
        </p>
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
            setEmailWarning("Email address");
          }}
          id="outlined-basic"
          defaultValue={email}
          label={emailWarning}
          variant="outlined"
          sx={{ width: "100%" }}
          error={emailError}
        />
        {/* {emailError ? <p style={{ color: "red" }}>{emailWarning}</p> : null} */}
      </CardContent>
      <Divider />
      <CardContent>
        <div className="resetBottom">
          <div>
            <div>
              <Button variant="contained" onClick={() => navigate("/signin")}>
                Cancle
              </Button>
            </div>
            <Button
              variant="contained"
              disabled={!email}
              onClick={() => send()}
            >
              {isSendLoading ? (
                <CircularProgress sx={{ color: "#1976d2" }} size="1.6rem" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );

  const otpPage = (
    <>
      <CardContent>
        <p style={{ margin: "10px 0 20px" }}>
          Enter otp sent on <b>{email}</b>
        </p>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={4}
          otpType="number"
          disabled={false}
          secure
        />
        <div style={{ height: "30px", color: "red" }}>
          {warning ? <p>{warning}</p> : null}
        </div>
      </CardContent>

      <Divider />
      <CardContent>
        <div className="resetBottom">
          <div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  setResetBody("EMAILPAGE");
                  setOTP("");
                  setWarning("");
                }}
              >
                Cancle
              </Button>
            </div>
            <Button
              variant="contained"
              disabled={OTP.length < 4}
              onClick={() => verify()}
            >
              Varify
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
  const newPAsswordPage = (
    <>
      {passAlert ? (
        <Alert
          variant="outlined"
          sx={{ margin: " 10px 20px 0 20px" }}
          severity="error"
        >
          Password doesn't match confirmation
        </Alert>
      ) : null}
      <CardContent>
        <h4 style={{ margin: " 5px 0 10px 0" }}>Password</h4>
        <TextField
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          id="outlined-basic"
          defaultValue={password}
          label="password"
          type="password"
          variant="outlined"
          sx={{ width: "100%" }}
          error={passwordError}
        />
        <h4 style={{ margin: " 10px 0 10px 0" }}>confirm Password</h4>
        <TextField
          onChange={(e) => {
            setConfirm(e.target.value);
            setPasswordError(false);
          }}
          id="outlined-basic"
          type="password"
          defaultValue={email}
          label="conmfirm Password"
          variant="outlined"
          sx={{ width: "100%" }}
          error={passwordError}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <div className="resetBottom">
          <div>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  setResetBody("EMAILPAGE");
                  setOTP("");
                  setWarning("");
                }}
              >
                Cancle
              </Button>
            </div>
            <Button
              variant="contained"
              disabled={
                (password.length > 5) & (confirm.length > 5) ? false : true
              }
              onClick={() => Reset()}
            >
              reset
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );

  return (
    <div className="reset">
      <div className="resetHeader">
        <h2>facebook</h2>
      </div>
      <div className="resetCard">
        <Card sx={{ width: "500px" }}>
          <CardContent>
            <h3>Find Your Account</h3>
          </CardContent>
          <Divider />
          {resetBody == "EMAILPAGE" ? emailPage : null}
          {resetBody == "OTPPAGE" ? otpPage : null}
          {resetBody == "NEWPASSWORDPAGE" ? newPAsswordPage : null}
        </Card>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          password Updated Successfuly
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Reset;
