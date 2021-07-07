import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
// import { toast } from "react-toastify";
import Toast from "../../utilities/toast";
import { connect } from "react-redux";
import * as actions from "../../store/actions/register";
import PatientForm from "../../components/SignUp/patientDetail";
import { numberRegex } from "../../utilities/regex";
import { securityQuestions } from "../../constants/securityQuestions";

class PatientDetail extends Component {
  state = {
    errorMsg: null,
    isError: false,
    securityQestion1: "",
    securityQestion2: "",
    securityQestion3: "",
    errorFlag: {
      address1: false,
      zipcode: false,
      securityQestion1: false,
      securityAnswer1: false,
      securityQestion2: false,
      securityAnswer2: false,
      securityQestion3: false,
      securityAnswer3: false,
      checkedB: true
    },
  };

  handleChangeAll = (event) => {
    event.preventDefault();
    let eFlags;
    if (event.target.name === "checkedB") {
      eFlags = this.validate(event.target.name, event.target.checked);
      this.setState({ [event.target.name]: event.target.checked, errorFlag: eFlags });
    } else {
      eFlags = this.validate(event.target.name, event.target.value);
      this.setState({ [event.target.name]: event.target.value, errorFlag: eFlags });
    }
  };

  validate = (field, value) => {
    let eFlags = this.state.errorFlag;
    switch (field) {
      case "address1":
      case "securityQestion1":
      case "securityAnswer1":
      case "securityQestion2":
      case "securityAnswer2":
      case "securityQestion3":
      case "securityAnswer3":
        eFlags[field] = value === "" ? true : false;
        break;
      case "zipcode":
        eFlags[field] =
          (value === "" || value.length < 5) || !numberRegex.test(value) ? true : false;
        break;
      case "checkedB":
        eFlags[field] = value === false ? true : false;
        break;
      default:
    }
    return eFlags;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let errField = ["address1", "zipcode", "securityQestion1", "securityAnswer1", "securityQestion2", "securityAnswer2", "securityQestion3", "securityAnswer3", "checkedB"];
    let errFlag = this.state.errorFlag;
    errField.map(field => {
      if (field === "checkedB") {
        errFlag[field] = !this.state.checkedB
      }
      if (!this.state[field]) {
        errFlag[field] = true;
      }
    })
    const { address1, zipcode, securityQestion1, securityAnswer1, securityQestion2, securityAnswer2, securityQestion3, securityAnswer3, checkedB } = this.state;
    if (!address1 || !zipcode || !securityQestion1 || !securityAnswer1 || !securityQestion2 || !securityAnswer2 || !securityQestion3 || !securityAnswer3 || !checkedB) {
      this.setState({ errorFlag: errFlag })
    } else {
      let data = {
        address1: this.state.address1,
        address2: this.state.address2,
        securityAnswer1: this.state.securityAnswer1.toLowerCase(),
        securityAnswer2: this.state.securityAnswer2.toLowerCase(),
        securityAnswer3: this.state.securityAnswer3.toLowerCase(),
        securityQestion1: this.state.securityQestion1,
        securityQestion2: this.state.securityQestion2,
        securityQestion3: this.state.securityQestion3,
        zip: this.state.zipcode,
      };
      this.props.completeProfile(data);
    }
  };

  render() {
    const { patientData } = this.props;
    // if (loading) {
    //   toast.dark("Hey 👋, its Loading");
    // }
    if (patientData) {
      if (patientData.isProfileComplete === undefined) {
        this.props.history.push("/patient/dashboard");
      }
    }
    return (
      <div>
        <Toast position={"top-right"}></Toast>
        <Header />
        <PatientForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChangeAll}
          errorFlag={this.state.errorFlag}
          verifyCallback={() => {}}
          securityQestion1={this.state.securityQestion1}
          securityQestion2={this.state.securityQestion2}
          securityQestion3={this.state.securityQestion3}
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
    patientData: state.login.patientData,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    completeProfile: (data) => dispatch(actions.completeProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(PatientDetail);
