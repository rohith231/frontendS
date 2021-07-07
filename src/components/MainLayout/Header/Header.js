import React from 'react'
import "./Header.scss";
import  logo  from "../../../assests/Logos/tm2u_logo_150.png";

const Header = () => {
	return (
		<div className="dashboard-header">
			<img className="dashboard-logo" src={logo} alt="TeleMed2U" ></img>
		</div>
	)
}

export default Header