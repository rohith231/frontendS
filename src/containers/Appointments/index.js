import React from 'react'
import AppointmentsPage from '../../components/Appointments'
import MainLayout from '../../components/MainLayout'
import { connect } from "react-redux";
import * as actions from "../../store/actions/appointments";
import * as loaderActions from "../../store/actions/loader";

const specialities = ['Cardiologist', 'Neurologist', 'Chest Physician', 'General Physician', 'Dentist', 'ENT', 'Opthelomologist']

class Appointments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      speciality: 0,
      visitType: 0,
      searchDate: new Date()
    }
  }
  componentDidMount() {
    this.props.getAllSpecialities()
  }

  onChangeInput = (key, value) => {
    this.setState({ [key]: value })
  }

  render () {
    const { specialities } = this.props
    const { speciality, visitType, searchDate } = this.state
    return (
      <MainLayout>
        <AppointmentsPage
          specialities={specialities}
          speciality={speciality}
          visitType={visitType}
          searchDate={searchDate}
          onChangeInput={this.onChangeInput}
        />
      </MainLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
    error: state.loader.error,
    specialities: state.appointments.specialities,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    getAllSpecialities: () => dispatch(actions.getAllSpecialities()),
    setError: (val) => dispatch(loaderActions.setError(val)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(Appointments);