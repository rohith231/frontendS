import React from "react";
import "./Appointment.scss"
import SearchBox from './SearchBox'

const Search = ({ specialities, speciality, visitType, searchDate, onChangeInput, onSearchClick }) => {
  return (
    <div className="pl-search-container">
      <div className="apt-heading">Book an appointment hassle free</div>
      <SearchBox 
        specialities={specialities}
        speciality={speciality}
        visitType={visitType}
        searchDate={searchDate}
        onChangeInput={onChangeInput}
        onSearchClick={onSearchClick}
      />
    </div>
  );
};

export default Search;
