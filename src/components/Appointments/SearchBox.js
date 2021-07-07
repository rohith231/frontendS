import React from 'react'
import { FormControl, Select, Button, MenuItem, Input } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment"

const visitTypes = [
  { key: 1, value: 'Telehealth Visit' },
  { key: 2, value: 'Clinic Visit' }
]

const clinics = [
  { key: 1, name: 'UCSF Primary Care 1', address: 'Mission Viejo, CA 92691' },
  { key: 2, name: 'UCSF Primary Care 2', address: 'Mission Viejo, CA 92691' },
  { key: 3, name: 'UCSF Primary Care 3', address: 'Mission Viejo, CA 92691' },
]

export default ({specialities, speciality, visitType, searchDate, onChangeInput, onSearchClick}) => {
  return (
    <div  style={{ display: 'flex'}}>
      <div className="pl-search-bar">

      <div style={{ width: visitType === 2 ? '30%' : '55%' }}>
        <FormControl style={{ width: '100%' }}>
            <Select
              className="splt"
              onChange={e=> {onChangeInput(e.target.name, e.target.value)}}
              name="specialities"
              disableUnderline
              defaultValue={speciality}
            >
              <option className="pl-select-option" disabled value={0}>
                Select speciality
              </option>
              {specialities.map(el => (
                <option className="pl-select-option" value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </Select>
          </FormControl>
      </div>
        <span className="seperator"></span>
      <div style={{ width: '20%' }}>
        <FormControl style={{ width: '100%' }}>
          <Select
            className="visitType"
            onChange={e=> {onChangeInput(e.target.name, e.target.value)}}
            name="visitType"
            disableUnderline
            defaultValue={visitType}
          >
            <option className="pl-select-option" disabled value={0}>
              Select Visit
            </option>
            {visitTypes.map(vt => (
              <option key={vt.key} className="pl-select-option" value={vt.key}>
                {vt.value}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
        <span className="seperator"></span>
      
      {visitType === 2 &&
        <>
          <div style={{ width: '20%' }}>
            <FormControl style={{ width: '100%' }}>
              <Input disableUnderline placeholder="Enter PIN" className="pin-code"></Input>
            </FormControl>
          </div>
          <span className="seperator"></span>
        </>
      }
      {visitType === 2 &&
        <>
          <div style={{ width: '20%' }}>
            <FormControl style={{ width: '100%' }}>
              <Select
                className="visitType"
                onChange={() => {}}
                name="aptType"
                disableUnderline
                defaultValue={'none'}
              >
                <option className="pl-select-option" disabled value="none">
                  Select Clinic
                </option>
                {clinics.map(vt => (
                  <option className="pl-select-option" value={vt.key}>
                    {vt.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <span className="seperator"></span>
        </>
      }
      <div style={{ width: '20%' }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            // error={errorFlag.dob}
            // helperText={errorFlag.dob ? requireddob : null}
            className="datePicker"
            disableToolbar
            variant="inline"
            format="MMM DD, YYYY"
            margin="normal"
            name="searchDate"
            id="date-picker-inline"
            autoOk={true}
            value={searchDate}
            InputProps={{ disableUnderline: true }}
            onChange={e=> {onChangeInput('searchDate', e)}}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            minDate={new Date()}
          />
        </MuiPickersUtilsProvider>
      </div>
      </div>
      <Button className="btn-search" onClick={onSearchClick}>
        Search
      </Button>
    </div>
  )
}