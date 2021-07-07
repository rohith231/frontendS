import React, { Component } from "react";
import LoginForm from "../../components/Login/Login";
import { connect } from "react-redux";
import * as actions from "../../store/actions/login";
import * as loaderActions from "../../store/actions/loader";
// import LoadingPage from "../../utilities/loading-page/";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Toast from "../../utilities/toast";
// import { toast } from "react-toastify";
import { mobileRegex } from "../../utilities/regex";
import Modal from "../../utilities/modal/modal";

class Login extends Component {
  state = {
    errorMsg: null,
    isError: false,
    errMsgContent: "Something went wrong please try after sometime!!",
    errMsgHeader: "",
    showModal: false,
    otpErrMsg: "Please enter a valid otp",
    resendButtonDisabledTime: 30,
  };

  componentDidMount() {
    this.props.setIsValidUser(false);
    this.props.setIsUserExist(true);
    this.props.setMaxAttempt(false);
  }
  componentDidUpdate(nextProps) {
    const { isValidUser, error, patientData, isUserExist,maxAttempt } = this.props;
    console.log(nextProps);
    if (nextProps.isUserExist !== isUserExist && !isUserExist) {
      this.setState({
        buttonType: "Sign Up",
        errMsgContent: "You don't have account please sign up",
        showModal: true,
      });
    }
    if (nextProps.isValidUser !== isValidUser && isValidUser) {
      this.startResendOtpTimer();
    }
    if (nextProps.error !== error) {
      if (error.isMaxAttempts) {
        this.setState({
          buttonType: "Close",
          showModal: true,
          errMsgContent: "You have reached max attempts please try tomorrow",
        });
      } else {
        if (!isValidUser) {
          this.setState({
            buttonType: "Close",
            showModal: true,
            errMsgContent: "Something went wrong please try after sometime!!",
          });
        }
      }
    }
    if (nextProps.patientData !== patientData) {
      if (patientData) {
        localStorage.setItem("token", patientData.accessToken);
        if (!patientData.isProfileComplete) {
          this.props.history.push("/PatientDetail");
        } else {
          this.props.history.push("/patient/dashboard");
        }
      }
    }
    if (nextProps.maxAttempt !== maxAttempt && maxAttempt) {
      this.setState({
        buttonType: "Close",
        showModal: true,
        errMsgContent: "You have reached max attempts please try tomorrow",
      });
    }
  }

  startResendOtpTimer = () => {
    if (!this.state.timmerRunning) {
      var timesRun = 30;
      const intervalID = setInterval(() => {
        if (timesRun === 0) {
          clearInterval(intervalID);
        }
        timesRun -= 1;
        this.setResendButtonDisabledTime(timesRun);
      }, 1000);
    } else {
      return;
    }
  };

  setResendButtonDisabledTime = (time) => {
    this.setState({ resendButtonDisabledTime: time, timmerRunning: true });
    if (time === -1) {
      this.setState({ timmerRunning: false });
    }
  };

  sendOtp = (event) => {
    event.preventDefault();
    if (!this.state.phoneNo) {
      this.setState({
        errorMsg: "Please enter valid cellphone number",
        isError: true,
      });
    } else {
      if (this.props.isValidUser) {
        this.startResendOtpTimer();
      }
      this.props.sendOtp({
        phoneNumber: `+91${this.state.phoneNo}`,
        channel: "sms",
        type: "l",
      });
    }
  };

  goBack = () => {
    this.props.setIsValidUser(false);
    this.props.setIsUserExist(true);
    this.props.setMaxAttempt(false);
    
  };
  handleClose = () => {
    this.props.setIsUserExist(true);
    this.props.setMaxAttempt(false);
    this.setState({ showModal: false });
  };
  handleModalChange = (type) => {
    switch (type) {
      case "Close":
        this.handleClose();
        break;
      case "Sign Up":
        this.props.history.push("/register");
        break;
      default:
        break;
    }
  };
  verifyLogin = () => {
    this.props.verifyLogin({
      cmmunicationMedium: `+91${this.state.phoneNo}`,
      otp: this.state.otp,
    });
  };
  setOtp = (event) => {
    this.setState({ otp: event.target.value });
  };
  validateMob = (event) => {
    event.preventDefault();
    const phone = event.target.value;
    if (!mobileRegex.test(phone)) {
      this.setState({
        errorMsg: "Please enter valid Mob/Phone Number",
        isError: true,
      });
    } else {
      this.setState({ errorMsg: null, isError: false, phoneNo: phone });
    }
  };

  render() {
    const { isValidUser } = this.props;
    return (
      <div>
        <Modal
          openModal={this.state.showModal}
          content={this.state.errMsgContent}
          buttonType={this.state.buttonType}
          handleModalChange={this.handleModalChange}
          handleClose={this.handleClose}
        ></Modal>
        {/* <Toast position={"top-right"}></Toast> */}
        <Header />
        <LoginForm
          handleSubmit={this.sendOtp}
          handleChange={this.validateMob}
          errorMsg={this.state.errorMsg}
          isValidUser={isValidUser}
          handleBack={this.goBack}
          verifyLogin={this.verifyLogin}
          setOtp={this.setOtp}
          otpError={this.props.otpError}
          validationError={this.state.isError}
          otpErrMsg={this.props.otpError ? this.state.otpErrMsg : ""}
          resendButtonDisabledTime={this.state.resendButtonDisabledTime}
          loading={this.props.loading}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    error: state.loader.error,
    isValidUser: state.login.isValidUser,
    isUserExist: state.login.isUserExist,
    patientData: state.login.patientData,
    otpError: state.login.otpError,
    maxAttempt: state.login.maxAttempt,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    sendOtp: (mob) => dispatch(actions.sendOtp(mob)),
    setIsUserExist: (val) => dispatch(actions.setIsUserExist(val)),
    setIsValidUser: (val) => dispatch(actions.setUser(val)),
    setError: (val) => dispatch(loaderActions.setError(val)),
    verifyLogin: (data) => dispatch(actions.verifyLogin(data)),
    setMaxAttempt: (data) => dispatch(actions.setMaxAttempt(data)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(Login);
