import React from "react";
import "./reset.css";
import OTPInput from "otp-input-react";
// import useSetInterval from "use-set-interval";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect } from "react";
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
  const [totalTime, setTotalTime] = useState(0);
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
          url: URL + "/api/otp?email=" + email.toLowerCase(),
          headers: { "Content-type": "application/json" },
        });
        const data = await response.data;
        if (data.otp == "send One more") {
          setOpen(true);
          setIsSendLoading(false);
        } else if (data.otp) {
          setServerOTP(data.otp);
          setTimeout(() => {
            setResetBody("OTPPAGE");
            setIsSendLoading(false);
            setTotalTime(30);
          }, 1000);
        }
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
    if (md5(Number(OTP)) != serverOTP) return setWarning("invalid OTP");
    if (md5(Number(OTP)) == serverOTP) return setResetBody("NEWPASSWORDPAGE");
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
        setResetBody("UPDATEDPAGE");
        setResetLoading(false);
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
                <CircularProgress sx={{ color: "white" }} size="1.6rem" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );

  useEffect(() => {
    if (totalTime < 0) {
      return;
    }
    const id = setInterval(() => setTotalTime(totalTime - 1), 1000);
    if (totalTime === 0) {
      setServerOTP("");
      setOTP("");
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [totalTime]);

  function otpPage() {
    return (
      <>
        <CardContent>
          {warning ? (
            <Alert variant="outlined" severity="error" sx={{ width: "100%" }}>
              invalid OTP
            </Alert>
          ) : null}

          <p style={{ margin: "10px 0 20px" }}>
            Enter otp sent on <b>{email}</b>
          </p>
          <div style={{ display: "flex" }}>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
              secure
            />
            <Button
              onClick={() => {
                // setTotalTime(30);
                send();
              }}
              disabled={totalTime != 0}
              sx={{ marginLeft: "20px" }}
            >
              {isSendLoading ? (
                <CircularProgress sx={{ color: "#2f83d6" }} size="1.6rem" />
              ) : (
                "resend"
              )}
            </Button>
          </div>

          <div>
            <p>{totalTime}</p>
          </div>

          <div style={{ height: "30px", color: "red" }}></div>
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
  }
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
                  setPasswordError(false);
                  setpassAlert(false);
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
              {resetLoading ? (
                <CircularProgress sx={{ color: "white" }} size="1.6rem" />
              ) : (
                "reset"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );

  const updatedPage = (
    <>
      <CardContent>
        <div style={{ height: "150px", display: "flex", alignItems: "center" }}>
          <h2>Successfuly updated password</h2>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <div className="resetBottom">
          <div>
            <Button variant="contained" onClick={() => navigate("/signin")}>
              Signin
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
        <Card
          sx={{
            width: "500px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
          }}
        >
          <CardContent>
            <h3>Find Your Account</h3>
          </CardContent>
          <Divider />
          {resetBody == "EMAILPAGE" ? emailPage : null}
          {resetBody == "OTPPAGE" ? otpPage() : null}
          {resetBody == "NEWPASSWORDPAGE" ? newPAsswordPage : null}
          {resetBody == "UPDATEDPAGE" ? updatedPage : null}
        </Card>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Network error Send one more time
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Reset;
