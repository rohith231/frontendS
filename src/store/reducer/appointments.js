import * as actionType from "../actionType";

const initialState = {
  specialities: []
};

const appointments = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_SPECIALITIES: {
      return {
        ...state,
        specialities: action.value,
      };
    }
    default:
      return state;
  }
};
export default appointments;
