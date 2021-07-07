import React, { useState } from 'react'
import Search from './Search'
import ProviderList from './ProviderList'
import SearchBox from './SearchBox'

export default ({specialities, speciality, visitType, searchDate, onChangeInput}) => {
  const [showProviderList, setShowProviderList] = useState(false) 
  const onSearchClick = () => {
    setShowProviderList(true)
  }
  return (
    <div className="appointments-container">
      <Search
        specialities={specialities}
        speciality={speciality}
        visitType={visitType}
        searchDate={searchDate}
        onChangeInput={onChangeInput}
        onSearchClick={onSearchClick}
      />
      {/* {!showProviderList && <Search specialities={specialities} onSearchClick={onSearchClick} />}
      {showProviderList && <>
        <SearchBox onSearchClick={onSearchClick} />
        <ProviderList />
      </>
      } */}
    </div>
  )
}