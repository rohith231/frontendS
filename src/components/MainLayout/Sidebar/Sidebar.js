import React from 'react'
import "./Sidebar.scss";
import  logo  from "../../../assests/Logos/tm2u_logo_150.png";
import { userRoles } from '../../../constants'
import { menu } from '../../../constants/menu'

const currentUser = userRoles.PATIENT

const Sidebar = () => {
	return (
		<div className="dashboard-sidebar">
			{menu.filter(m => m.role === currentUser).map(m => (
				<a
					className="menu"
					key={m.name}
					href={m.path}
				>{m.name}</a>
			))}
		</div>
	)
}

export default Sidebar