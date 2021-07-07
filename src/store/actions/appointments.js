import * as actionType from "../actionType";
import { setLoading, setError } from "./loader";
import {
  getSpecialities
} from "../../services/Appointments/appointments";

export const getAllSpecialities = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getSpecialities()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setSpecialities(res.data));
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(true));
      });
  };
};

export const setSpecialities = (value) => {
  return {
    type: actionType.SET_SPECIALITIES,
    value,
  };
};
