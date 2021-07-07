import React from "react";
import {
  Button,
  Container,
  FormLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./register.scss";
import { Link } from "react-router-dom";

const requiredFirstname = "Please enter valid first name";
const requiredlastname = "Please enter valid last name";
const requireddob = "Age should be 18 years and above";
const emailError = "Please enter correct email";
const phoneError = "Please enter correct phone number";

const RegisterForm = ({
  handleSubmit,
  handleDateChange,
  dateValue,
  startDate,
  isNewUser,
  handleChange,
  errorFlag,
  registerPatient,
  goBack,
  otpError,
  otpErrMsg,
  resendButtonDisabledTime,
}) => {
  const errorFlagArray = Object.entries(errorFlag);
  let validationError = false;
  errorFlagArray.filter(([key, value]) => {
    if (value) {
      validationError = true;
    }
  });
  return (
    <Container className="container">
      <Grid container className="form-wrapper">
        <Grid item xs={6} className="" span={12}>
          <img
            className="form-img"
            src="http://source.unsplash.com/620x700/?medical"
            alt="spaceship"
          />
        </Grid>
        <Grid item xs={6} className="" span={12} ml={2}>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <h1>
              {isNewUser ? (
                <ArrowBackIosIcon color="primary" onClick={goBack} />
              ) : null}
              Register to book appointment
            </h1>
            <FormLabel className="input-label" component="legend">
              First name<span className="astrik">*</span>
            </FormLabel>
            <TextField
              required
              error={errorFlag.firstName}
              helperText={errorFlag.firstName ? requiredFirstname : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="firstName"
              inputProps={{ maxLength: 40 }}
              placeholder="Enter your first name"
              onChange={handleChange}
            />
            <div
              style={{
                position: "relative",
                top: -25,
                left: 0,
                fontSize: 14,
                color: "red",
              }}
            ></div>
            <FormLabel className="input-label" component="legend">
              Last name<span className="astrik">*</span>
            </FormLabel>
            <TextField
              required
              error={errorFlag.lastName}
              helperText={errorFlag.lastName ? requiredlastname : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="lastName"
              inputProps={{ maxLength: 40 }}
              placeholder="Enter your last name"
              onChange={handleChange}
            />
            <div
              style={{
                position: "relative",
                top: -25,
                left: 0,
                fontSize: 14,
                color: "red",
              }}
            ></div>
            <FormLabel className="input-label" component="legend">
              Date of birth<span className="astrik">*</span>
            </FormLabel>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container justify="flex-start">
                <KeyboardDatePicker
                  // disableToolbar
                  error={errorFlag.dob}
                  helperText={errorFlag.dob ? requireddob : null}
                  inputVariant="outlined"
                  variant="inline"
                  format="DD-MM-YYYY"
                  margin="normal"
                  name="dob"
                  autoOk={true}
                  placeholder={"Please select date of birth"}
                  value={dateValue}
                  maxDate={startDate}
                  onChange={handleDateChange}
                  className="date-picker"
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <div
              style={{
                position: "relative",
                top: -25,
                left: 0,
                fontSize: 14,
                color: "red",
              }}
            ></div>
            <FormLabel className="input-label" component="legend">
              Email
            </FormLabel>
            <TextField
              required
              error={errorFlag.email}
              helperText={errorFlag.email ? emailError : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <div
              style={{
                position: "relative",
                top: -25,
                left: 0,
                fontSize: 14,
                color: "red",
              }}
            ></div>
            <FormLabel className="input-label" component="legend">
              Cellphone<span className="astrik">*</span>
            </FormLabel>
            <TextField
              required
              error={errorFlag.phone}
              helperText={errorFlag.phone ? phoneError : null}
              id="filled-required"
              variant="outlined"
              size="small"
              inputProps={{ maxLength: 10 }}
              className="text-input"
              name="phone"
              placeholder="Enter your cellphone"
              onChange={handleChange}
              disabled={isNewUser}
            />

            <div
              style={{
                position: "relative",
                top: -25,
                left: 0,
                fontSize: 14,
                color: "red",
              }}
            ></div>

            {isNewUser ? (
              <div className="form-inputs">
                <FormLabel className="input-label" component="legend">
                  Enter your one-time password sent to your phone number
                </FormLabel>
                <TextField
                  required
                  id="filled-required"
                  variant="outlined"
                  size="small"
                  name="otp"
                  inputProps={{ maxLength: 6 }}
                  className="text-input"
                  helperText="Get one-time password"
                  onChange={handleChange}
                  error={otpError}
                  helperText={ 
                    resendButtonDisabledTime > 0 ? (
                      <div className="dbl-error">{otpErrMsg + " "}<span className="resendotp-grayed" >Resend one-time password({resendButtonDisabledTime})</span></div>
                    ) : (
                      <div className="dbl-error">{otpErrMsg + " "}<span className="link-blue" onClick={handleSubmit}>Resend one-time password</span></div>
                    )
                  }
                />
              </div>
            ) : null}
            <div className="submit">
              {isNewUser ? (
                <Button
                  variant="contained"
                  className="btn-primary"
                  onClick={registerPatient}
                  disabled={validationError}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  className={validationError ? "btn-error" : "btn-primary"}
                  disabled={validationError}
                >
                  Submit
                </Button>
              )}
              <h5>
                Already have an account? <Link to="/">Log in</Link>
              </h5>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
