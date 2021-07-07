import { postService, getService } from "../../utilities/request/restClient";
import { config } from "../../constants";

export const getSpecialities = () => {
  return getService(`${config.dev.baseURL}/speciality/getAllSpeciality`);
};