import React from "react";

export const GeneralInfo = () => {
  return (
    <div>
      <div className="general-info">
        general-info
        <div className="aircraft-info">
          aircraft-info
          <span className="section-title">Aircraft</span>
          <label htmlFor="aircraft-model">Model</label>
          <input type="text" className="model" id="aircraft-model" />
          <label htmlFor="aircraft-ident">Ident</label>
          <input type="text" className="ident" id="aircraft-ident" />
        </div>
        <div className="flight-info">
          flight-info
          <div className="date-container">
            <label htmlFor="flight-date">Date</label>
            <input type="date" className="date" id="flight-date" />
          </div>
          <div className="airports">
            <div className="airport-info" id="departure-info">
              <span className="section-title">Departure</span>
              <div className="row-container">
                <label htmlFor="departure-ident">Airport Ident</label>
                <input type="text" className="airport-ident" id="departure-ident" />
              </div>
              <div className="row-container">
                <label htmlFor="departure-name">Airport name</label>
                <input type="text" className="airport-name" id="departure-name" />
              </div>
              <div className="row-container">
                <label htmlFor="departure-elevation">Airport elevation</label>
                <input
                  type="text"
                  className="airport-elevation"
                  id="departure-elevation"
                />
              </div>
              <div className="row-container">
                <label htmlFor="departure-time">Departure time</label>
                <input type="time" className="time" id="departure-time" />
              </div>
            </div>

            <div className="airport-info" id="destination-info">
              <span className="section-title">Destination</span>
              <div className="row-container">
                <label htmlFor="destination-ident">Airport Ident</label>
                <input
                  type="text"
                  className="airport-ident"
                  id="destination-ident"
                />
              </div>
              <div className="row-container">
                <label htmlFor="destinationa-name">Airport name</label>
                <input
                  type="text"
                  className="airport-name"
                  id="destinationa-name"
                />
              </div>
              <div className="row-container">
                <label htmlFor="destinationa-elevation">Airport elevation</label>
                <input
                  type="text"
                  className="airport-elevation"
                  id="destinationa-elevation"
                />
              </div>
              <div className="row-container">
                <label htmlFor="arrive-time">Arrive time</label>
                <input type="time" className="time" id="arrive-time" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
