import React from "react";
import "./signup.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import DatePicker from "react-date-picker";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import md5 from "md5";
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

function Signup({ setToggleCreateAccountComponent }) {
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameErr, setLastNameErr] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrText, setEmailErrText] = useState("");

  const [PhoneNoerror, setPhoneNoError] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneNoErrText, setPhoneNoErrText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passErrText, setPasswordErrText] = useState("");
  const [value, onChange] = useState(new Date());

  const phone = Number(
    phoneNo.replace("-", "").replace(" ", "").replace(")", "").replace("(", "")
  );

  async function signup() {
    if (!email.includes("@gmail.com")) {
      setEmailErr(true);
      setEmailErrText("invalid email");
    } else if (password.length < 6) {
      setPasswordErr(true);
      setPasswordErrText("password must have 6 character");
    } else {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8081/api/signup",
          data: {
            firstName,
            lastName,
            phone,
            email: email.toLowerCase(),
            password: md5(password),
            date: value,
          },
        });
        const data = await response.data;
        if (data?.result === "email already exist") {
          setEmailErrText("email already exist");
          setEmailErr(true);
        } else if (data?.result === "phoneNo exist") {
          setPhoneNoErrText("phoneNo exist");
          setPhoneNoError(true);
        } else {
          localStorage.setItem("TOKEN", data.Token);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div
      className="signUp"
      style={{ backgroundColor: "rgba(252, 252, 253, 0.74)" }}
    >
      <Card sx={{ width: "500px" }}>
        <CardContent>
          <div className="singUpHeader">
            <div>
              <h1>Sign Up</h1>
              <p>It's quick and easy.</p>
            </div>
            <div>
              <IconButton
                onClick={() => setToggleCreateAccountComponent(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <Divider />
          <div className="signUpBody">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <TextField
                error={firstNameErr}
                defaulvalue={firstName}
                id="outlined-basic"
                label="FirstName"
                variant="outlined"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                error={lastNameErr}
                defaulValue={lastName}
                id="outlined-basic"
                label="LastName"
                variant="outlined"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                sx={{ marginTop: "10px" }}
                error={emailErr}
                defaulvalue={email}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                helperText={emailErrText}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr(false);
                  setEmailErrText("");
                }}
              />

              <InputLabel
                sx={{ color: "#1873ce" }}
                htmlFor="formatted-text-mask-input"
              >
                Phone-Number
              </InputLabel>
              <Input
                error={PhoneNoerror}
                helperText={phoneNoErrText}
                variant="filled"
                sx={{
                  input: { color: "black" },
                }}
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                  setPhoneNoError(false);
                  setPhoneNoErrText("");
                }}
                placeholder="(100) 000-0000"
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />

              <TextField
                sx={{ marginTop: "10px" }}
                error={passwordErr}
                defaulvalue={password}
                id="outlined-basic"
                label="New password"
                variant="outlined"
                helperText={passErrText}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordErr(false);
                }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "12px" }}>Date of birth</p>

              <DatePicker onChange={onChange} value={value} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
                width: "100%",
              }}
            >
              <Button
                disabled={
                  (firstName !== "") &
                  (lastName !== "") &
                  (email !== "") &
                  (phoneNo.length >= 14) &
                  (password.length > 5)
                    ? false
                    : true
                }
                sx={{ width: "194px", height: "36px" }}
                variant="contained"
                color="success"
                onClick={() => {
                  signup();
                }}
              >
                signUp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
