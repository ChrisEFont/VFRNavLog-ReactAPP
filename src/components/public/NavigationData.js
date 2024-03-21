import React, { useState } from "react";
import { CheckPoint } from './CheckPoint';

export const NavigationData = () => {

    let miValor=10;

    const[counter, setCounter] = useState(0);

    function miFuncion(){
        setCounter(counter+miValor);        
    }

    return (            
        <div>
            <div className="navigation-data">
            navigation-data
            <label htmlFor="start-time">Start time</label>
            <input type="text" className="start-time" id="start-time"/>
            <label htmlFor="takeoff-time">Take off time</label>
            <input type="text" className="takeoff-time" id="takeoff-time"/>
            <span className="titles"></span>
            <div className="checkpoints-container">checkpoints-container
                <div className="checkpoints-titles">
                    <span>Chekpoint</span>
                    <span>Geographic Course</span>
                    <span>Deviation</span>
                    <span>Magnetic Course</span>
                    <span>Wind</span>
                    <span>Cross wind</span>
                    <span>Drift</span>
                    <span>Heading</span>
                    <span>TAS</span>
                    <span>ETAS</span>
                    <span>Long Wind</span>
                    <span>Ground Speed</span>
                    <span>Distance</span>
                    <span>ETE</span>
                    <span>ETA</span>
                    <span>Fuel Flow</span>
                    <span>Fuel</span>
                </div>

                <CheckPoint/>

            </div>
            <div className="totals">
                totals
                <span className="aggregate-distance"></span>
                <span className="aggregate-time"></span>
                <span className="trip-fuel"></span>
            </div>
            <div>
                <input placeholder="contador" value={counter}/>
                <button id="btn-add-checkpoint" onClick={miFuncion}>ADD CHECKPOINT</button>
            </div>
        </div>
        </div>
    );   
}