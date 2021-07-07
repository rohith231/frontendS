import { userRoles } from './'
export const menu = [
	{
		role: userRoles.PATIENT,
		name: 'Dashboard',
		path: '/dashboard/patient'
	},
	{
		role: userRoles.PATIENT,
		name: 'Schedule',
		path: '/patient/schedule'
	},
	{
		role: userRoles.PATIENT,
		name: 'Health Report',
		path: '/patient/health-report'
	},
	{
		role: userRoles.PATIENT,
		name: 'Appointments',
		path: '/appointments/patient'
	}
]
