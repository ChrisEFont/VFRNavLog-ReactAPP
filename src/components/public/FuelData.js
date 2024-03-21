import React from 'react'

export const FuelData = () => {
    return (            
        <div>
            <div className="fuel-data">
            fuel-data

            <div className="fuel-item">
                <label htmlFor="taxi-fuel">Taxi Fuel</label>
                <input type="number" min="0" className="fuel-quantity" id="taxi-fuel"/>
            </div>
            <div className="fuel-item">
                <label htmlFor="trip-fuel">Trip Fuel</label>
                <span className="fuel-quantity" id="trip-fuel"></span>
            </div>
            <div className="fuel-item">
                <label htmlFor="alternative-fuel">Alternative Fuel</label>
                <input type="number" min="0" className="fuel-quantity" id="alternative-fuel"/>
            </div>
            <div className="fuel-item">
                <label htmlFor="holding-fuel">Holding Fuel</label>
                <input type="number" min="0" className="fuel-quantity" id="holding-fuel"/>
            </div>
            <div className="fuel-item">
                <label htmlFor="not-usable-fuel">Not Usable</label>
                <input type="number" min="0" className="fuel-quantity" id="not-usable-fuel"/>
            </div>
            <div className="fuel-item">
                <label htmlFor="reserve-fuel">Reserve Fuel</label>
                <input type="number" min="0" className="fuel-quantity" id="reserve-fuel"/>
            </div>
            <div className="fuel-item">
                <label htmlFor="required-fuel">Required Fuel</label>
                <span className="fuel-quantity" id="required-fuel"></span>
            </div>
            <div className="fuel-item">
                <label htmlFor="extra-fuel">Extra Fuel</label>
                <input type="number" min="0" className="fuel-quantity" id="extra-fuel"/>
            </div>
            <div className="fuel-item">
                <label htmlFor="aggregate-fuel">Total Fuel</label>
                <span className="fuel-quantity" id="aggregate-fuel"></span>
            </div>
        </div>

        </div>
    );   
}