import React from "react";
import "./Login.scss";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  TextField,
  Grid,
  Container,
  CircularProgress,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

const phoneError = "Please enter correct phone number";
const emailError = "Please enter valid email Id";
const loginTypeError = "Please select login type";
const emailTypeError = "Email is not available please try another way";
const securityTypeError =
  "Security Question is not available please try another way";
const requiredanswer = "Please enter correct answer";
const getResetDetailsErrorMsg = "Please enter registered phone number";
// const requiredSA2 = "Please enter your answer 2";
// const requiredSA3 = "Please enter your answer 3";

const LoginAnotherWayForm = ({
  errorFlag,
  handleChange,
  handleSubmit,
  showEmail,
  isEmailValid,
  showSecurityQuestions,
  maskedEmail,
  sendOtpToEmail,
  verifyEmailOtp,
  verifySecurityQuestions,
  handleStateChange,
  securityQuestions,
  otpError,
  resendButtonDisabledTime,
  getResetDetailsError,
  loading,
  isEmailExist,
  securityError,
  isSecurityQusExist,
}) => {
  const otpErrMsg = otpError ? "Please enter the valid OTP" : "";
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
            src="http://source.unsplash.com/645x480/?medical"
            alt="spaceship"
          />
        </Grid>
        <Grid item xs={6} className="" span={12} ml={2}>
          <form onSubmit={handleSubmit} className="form" noValidate>
            <h1>
              <Link to="/">
                <ArrowBackIosIcon color="primary" />
              </Link>
              Login to your account
            </h1>
            <FormLabel className="input-label" component="legend">
              Cellphone<span className="astrik">*</span>
            </FormLabel>
            <TextField
              required
              error={errorFlag.phone}
              helperText={errorFlag.phone ? phoneError : getResetDetailsError ? getResetDetailsErrorMsg : null}
              id="filled-required"
              variant="outlined"
              size="small"
              className="text-input"
              type="tel"
              name="phone"
              placeholder="Enter your Cell Phone"
              inputProps={{ maxLength: 10 }}
              onChange={handleChange}
            />
            <div className="m-container">
              <div className="r-container">
                <FormControl component="fieldset" error={errorFlag.loginType}>
                  <RadioGroup
                    aria-label="loginType"
                    name="loginType"
                    onChange={handleChange}
                    row={true}
                  >
                    <FormControlLabel
                      value={"email"}
                      control={<Radio color="primary" />}
                      label="Email"
                    />
                    <FormControlLabel
                      value={"security"}
                      control={<Radio color="primary" />}
                      label="Security Questions"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {errorFlag.loginType ? loginTypeError : null}
                  </FormHelperText>
                  <FormHelperText>
                    {!isEmailExist ? emailTypeError : null}
                  </FormHelperText>
                  <FormHelperText>
                    {!isSecurityQusExist ? securityTypeError : null}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>
            {showEmail ? (
              <>
                <FormLabel className="input-label" component="legend">
                  Email<span className="astrik">*</span>: {maskedEmail}
                </FormLabel>
                <TextField
                  required
                  error={errorFlag.maskedEmailInput}
                  helperText={errorFlag.maskedEmailInput ? emailError : null}
                  id="filled-required"
                  variant="outlined"
                  size="small"
                  className="text-input"
                  type="input"
                  name="maskedEmailInput"
                  placeholder="Enter your Email"
                  onChange={handleStateChange}
                />
                {isEmailValid ? (
                  <>
                    <FormLabel className="input-label" component="legend">
                      Enter your one-time password sent to your email
                      <span className="astrik">*</span>
                    </FormLabel>
                    <TextField
                      required
                      id="filled-required"
                      variant="outlined"
                      size="small"
                      className="text-input"
                      inputProps={{ maxLength: 6 }}
                      name="otp"
                      placeholder=""
                      onChange={handleStateChange}
                      error={otpError}
                      helperText={ 
                        resendButtonDisabledTime > 0 ? (
                          <div className="dbl-error">{otpErrMsg + " "}<span className="resendotp-grayed" >Resend one-time password({resendButtonDisabledTime})</span></div>
                        ) : (
                          <div className="dbl-error">{otpErrMsg + " "}<span className="link-blue" onClick={handleSubmit}>Resend one-time password</span></div>
                        )
                      }
                    />
                  </>
                ) : null}
              </>
            ) : null}
            {showSecurityQuestions ? (
              <>
                {
                  securityQuestions &&
                  Object.keys(securityQuestions).map((key, value) => {
                    return (
                      <div key={key}>
                        <FormLabel className="input-label" component="legend">
                          Security question {value + 1}
                          <span className="astrik">*</span>:{" "}
                          {securityQuestions[key]}
                        </FormLabel>
                        <TextField
                          required
                          error={errorFlag["securityAnswer" + (value+1)]}
                          helperText={errorFlag["securityAnswer" + (value+1)] ? requiredanswer : null}
                          id="filled-required"
                          variant="outlined"
                          size="small"
                          className="text-input"
                          name={"securityAnswer" + (value + 1)}
                          placeholder="Answer"
                          onChange={handleStateChange}
                        />
                      </div>
                    );
                  })}
                <FormHelperText>
                  {securityError ? requiredanswer : null}
                </FormHelperText>
              </>
            ) : null}
            {loading ? <CircularProgress className="" /> : null}
            {showEmail ? (
              isEmailValid ? (
                <Button
                  variant="contained"
                  disabled={validationError}
                  className={validationError ? "btn-error" : "btn-primary"}
                  onClick={verifyEmailOtp}
                >
                  Login
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={validationError}
                  className={validationError ? "btn-error" : "btn-primary"}
                  onClick={sendOtpToEmail}
                >
                  Submit
                </Button>
              )
            ) : showSecurityQuestions ? (
              <Button
                variant="contained"
                disabled={validationError}
                className={validationError ? "btn-error" : "btn-primary"}
                onClick={verifySecurityQuestions}
              >
                Login
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled={validationError}
                className={validationError ? "btn-error" : "btn-primary"}
              >
                Submit
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginAnotherWayForm;
