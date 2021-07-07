import loginAnotherWay from "../containers/Login/LoginAnotherWay";
import login from "../containers/Login/Login";
import Register from "../containers/SignUp/Register";
import patientDetail from "../containers/SignUp/PatientDetail";
import register from "../containers/SignUp/Register";
// import appointment from "../containers/Appointment/Appointment";
//patient
import DashboardPage from "../containers/Dashboard";
import AppointmentsPage from "../containers/Appointments";
// import PatientSchedulePage from "../containers/Patient/Schedule";
// import PatientHealthReportPage from "../containers/Patient/HealthReport";
// import PatientAppointmentsPage from "../containers/Patient/Appointments";
import MainIndex from "../components/Consultation/MainIndex";

export const routes = [
  {
    path: "/",
    component: login,
  },
  {
    path: "/Register",
    component: register,
  },
  {
    path: "/PatientDetail",
    component: patientDetail,
  },
  {
    path: "/signup",
    component: Register,
  },
  // {
  //   path: "/appointment",
  //   component: appointment,
  // },
  {
    path: "/loginAnotherWay",
    component: loginAnotherWay,
  },
  {
    path: "/dashboard/:role",
    component: DashboardPage,
  },
  // {
  //   path: '/patient/schedule',
  //   component: PatientSchedulePage
  // },
  // {
  //   path: '/patient/health-report',
  //   component: PatientHealthReportPage
  // },
  {
    path: '/appointments/:role',
    component: AppointmentsPage
  },

  {
    path:"/video",
    component:MainIndex
  }
];
