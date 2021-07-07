import React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import './MainLayout.scss'

const MainLayout = (props) => {
	return (
		<div className="main-layout-container">
			<Header />
			<Sidebar />
			<div className="main-layout-content">
				{props.children}
			</div>
		</div>
	)
}

export default MainLayout