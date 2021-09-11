import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './App.css';
import GoogleMapReact from 'google-map-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


function App() {

  const [isLoaded, setIsLoaded] = useState(false);

  const [ip, setIp] = useState('N/A');
  const [location, setLocation] = useState('N/A');
  const [timezone, setTimezone] = useState('N/A');
  const [isp, setIsp] = useState('N/A');

  const [lat, setLat] = useState(50);
  const [lon, setLon] = useState(20);

  const [inputValue, setInputValue] = useState('');

  const loadApi = (code) => {

    if(isLoaded === false){
      axios.get(`https://api.ipdata.co/?api-key=apikey`)
      .then(res => {
        console.log(res);

        setIp(res.data.ip);
        setLocation(res.data.country_name);
        setTimezone(res.data.time_zone.abbr);
        setIsp(res.data.asn.name);

        setLat(res.data.latitude);
        setLon(res.data.longitude)
        
        setIsLoaded(true);
      });
      setIsLoaded(true)
      console.log("test...");
    }else{
      console.log("Already loaded on start!")
    }
    

    if(code === 1 && isLoaded === true && inputValue !== ''){
      console.log("Click: " + inputValue);

      axios.get(`https://api.ipdata.co/${inputValue}?api-key=apikey`)
      .then(res => {
        console.log(res);

        setIp(res.data.ip);
        setLocation(res.data.country_name);
        setTimezone(res.data.time_zone.abbr);
        setIsp(res.data.asn.name);

        setLat(res.data.latitude);
        setLon(res.data.longitude)
        
        setIsLoaded(true);
      });
    }
  }

  useEffect(() => {
    loadApi();
  }, [])


  const defaultProps = {
    center: {
      lat: lat,
      lng: lon
    },
    zoom: 11
  };


  


  const Marker = ({ text }) => <div><img alt="icon" src="./icon-location.svg" height='40px' width="30px"></img></div>;

  return (
    <div className="App">
      <div className="header">
        <h1 className="head-line-text">IP Adress Tracker</h1>
        <div className="input-field-conatiner">
          <input className="input-field" type="email" placeholder="Search for any IP adress or domain" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
          <button className="btn" onClick={() => {loadApi(1)}}><FontAwesomeIcon icon={faChevronRight} color="white"/></button>
        </div>
      </div>
      <div className="info-container-fluid">
        <div className="info-container">

          <div className="info-content">
            <h3 className="info-name">IP Address</h3>
            <h2 className="info-data">{ip}</h2>
          </div>

          <div className="info-content">
            <h3 className="info-name">Location</h3>
            <h2 className="info-data">{location}</h2>
          </div>

          <div className="info-content">
            <h3 className="info-name">Timezone</h3>
            <h2 className="info-data">{timezone}</h2>
          </div>
          <div className="info-content">
            <h3 className="info-name">ISP</h3>
            <h2 className="info-data">{isp}</h2>
          </div>
        </div>
      </div>

      <div style={{ height: '75vh', width: '100%', backgroundColor: 'gray', zIndex:'-1' }}>
        
        <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            center={defaultProps.center}
            zoom={11}
          >
            <Marker
              lat={lat}
              lng={lon}
            />
          </GoogleMapReact>

      </div>
    </div>
  );
}

export default App;
