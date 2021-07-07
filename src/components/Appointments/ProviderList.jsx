import React from 'react' 
import erikaUser from '../../assests/images/erika_provider.png'
import stephenUser from '../../assests/images/stephen_provider.png'
import userIcon from '../../assests/images/icon_user.svg'
import cameraIcon from '../../assests/images/icon_camera.svg'

const slots = [{time: '10:00 am', available: false}, {time: '10:15 am', available: true}, {time: '10:30 am', available: true}, {time: '10:45 am', available: false}, {time: '11:00 am', available: false}, {time: '11:15 am', available: false}, {time: '11:30 am', available: false}, {time: '11:45 am', available: false}, {time: '12:00 pm', available: false}, {time: '12:15 pm', available: false}, {time: '12:30 pm', available: false}, {time: '12:45 pm', available: false}, {time: '01:00 pm', available: false}, {time: '01:15 pm', available: true}, {time: '01:30 pm', available: true}, {time: '01:45 pm', available: true}, {time: '2:00 pm', available: false}, {time: '02:15 pm', available: true}, {time: '02:30 pm', available: false}, {time: '02:45 pm', available: false}, {time: '03:00 pm', available: false}, {time: '03:15 pm', available: false}, {time: '03:30 pm', available: false}]
const providerData = [
  {
    doctorName: 'Erika Mateo',
    profileThumbnail: erikaUser,
    type: 'Primary Care Doctor',
    visitTypes: ['Telehealth', 'In-clinic'],
    slots
  },
  {
    doctorName: 'Stephen Shaw',
    profileThumbnail: stephenUser,
    type: 'Primary Care Doctor',
    visitTypes: ['Telehealth', 'In-clinic'],
    slots
  }
]


class ProviderList extends React.Component {
  constructor(props) {
    super (props)

    this.state = {
      showMore: false
    }
  }

  toggleShowMore = (showMore) => {
    this.setState({ showMore })
  }

  render () {
    const { showMore } = this.state
    return (
      <div>
        <div className="provider-list-container" style={{ display: 'flex'}}>
          <div style={{width: '35%'}}>
            <span className="pl-count-txt">128 Providers</span>
          </div>
          <div style={{width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="pl-date-txt">June 2
              <br />Wednesday</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="pl-date-txt">June 3 <br/>Thursday</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="pl-date-txt">June 4 <br/>Friday</span>
            </div>
          </div>
        </div>
        <div className="pl-separator-up"></div>

        {providerData.map((pd, index) => (
          <div key={index}>
            <div className="provider-list-container" style={{ display: 'flex'}}>
              <div style={{width: '35%'}}>
                <div style={{ display: 'flex' }}>
                  <img className="pl-thumbnail" src={pd.profileThumbnail} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="pl-name-txt"> {pd.doctorName} </span>
                      <span className="pl-type-txt"> {pd.type}</span>

                      {pd.visitTypes.map((vt, index) => (
                        <div key={index} style={{ marginTop: `${index === 0 ? '10px' : '0px'}`, display: 'flex'}}>
                          <span className="pl-visit-type-txt"><img className="pl-visit-type-icon" src={vt === 'Telehealth' ? cameraIcon : userIcon} /> {vt} visit</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div style={{width: '65%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {pd.slots.map((slot, index) => (
                    <>
                      {!showMore && index < 5 && <div key={index} className={`pl-slot-box ${slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                      {showMore && <div key={index} className={`pl-slot-box ${slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                    </>
                  ))}
                  {
                    <div onClick={() => {this.toggleShowMore(!showMore)}} className="pl-more-less-btn">
                        <span>{showMore ? 'Less' : 'More'}</span>
                    </div>
                  }
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {pd.slots.map((slot, index) => (
                    <>
                      {!showMore && index < 5 && <div key={index} className={`pl-slot-box ${slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                      {showMore && <div key={index} className={`pl-slot-box ${slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                    </>
                  ))}
                  {
                    <div onClick={() => {this.toggleShowMore(!showMore)}} className="pl-more-less-btn">
                        <span>{showMore ? 'Less' : 'More'}</span>
                    </div>
                  }
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {pd.slots.map((slot, index) => (
                    <>
                      {!showMore && index < 5 && <div key={index} className={`pl-slot-box ${slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                      {showMore && <div key={index} className={`pl-slot-box ${slot.available ? 'pl-slot-box-active' : ''}`}>
                        <span>{slot.time}</span>
                      </div>}
                    </>
                  ))}
                  {
                    <div onClick={() => {this.toggleShowMore(!showMore)}} className="pl-more-less-btn">
                        <span>{showMore ? 'Less' : 'More'}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
            {index < providerData.length - 1 && <div className="pl-provider-divider" ></div>}
          </div>
        ))}
        
      </div>
    )
  }
}

export default ProviderList