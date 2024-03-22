import React, { useState, useEffect } from "react";

export function CheckPoint() {
  const [magneticCourse, setMagneticCourse] = useState(999);
  const [geographicCourse, setGeographicCourse] = useState(999);
  const [deviation, setDeviation] = useState(999);
  const [windDirection, setWindDirection] = useState(999)
  const [windSpeed, setWindSpeed] = useState (999)
  const [crossWind, setCrossWind] = useState(999);
  const [heading, setHeading] = useState(999);
  const [tas, setTas] = useState(999);
  const [eTas, setETas] = useState(999);
  const [longWind, setLongWind] = useState(999);
  const [groundSpeed, setGrounSpeed] = useState(999);
  const [distance, setDistance] = useState(999);
  const [ete, setEte] = useState(999);
  const [fuelFlow, setFuelFlow] = useState(999);
  const [fuel, setFuel] = useState(999);

  useEffect(()=>{
    setMagneticCourse(calcMagneticCourse(geographicCourse, deviation))
  }, [geographicCourse, deviation])

  useEffect(()=>{
    setCrossWind(calcCrossWind(magneticCourse, windDirection, windSpeed))
  }, [magneticCourse, windDirection, windSpeed])

  useEffect(()=>{
    setHeading(calcHeading(tas, crossWind, magneticCourse))
  },[tas, crossWind, magneticCourse])

  useEffect(()=>{
    setETas(calcEtas(tas, heading, magneticCourse))
  }, [tas, heading, magneticCourse])

  useEffect(()=>{
    setLongWind(calcLongWind(windSpeed, heading, windDirection))
  },[windSpeed, heading, windDirection])

  useEffect(()=>{
    setGrounSpeed(calcGroundSpeed(eTas, longWind))
  },[eTas, longWind])

  useEffect(()=>{
    setEte(calcEte(distance, groundSpeed))
  },[distance, groundSpeed])

  useEffect(()=>{
    setFuel(calcFuel(fuelFlow, ete))
  }, [fuelFlow, ete])

  // ----------------- SERVICES ----------------------------

  function changeGeographicCourse(e) {
    setGeographicCourse(Number(e.target.value));
  }

  function changeDeviation(e) {
    setDeviation(Number(e.target.value));
  }

  function changeWindDirection(e) {
    setWindDirection(Number(e.target.value));
  }

  function changeWindSpeed(e) {
    setWindSpeed(Number(e.target.value));
  }

  function changeTas(e){
    setTas(Number(e.target.value));
  }

  function changeDistance(e){
    setDistance(Number(e.target.value));
  }

  function changeFuelFlow(e){
    setFuelFlow(Number(e.target.value));
  }

  // ----------------- CALCULOS ----------------------------

  function calcMagneticCourse(gc, dev){
    return gc+dev;
  }

  function calcCrossWind(mc, wd, ws) {
    let magCourseRad = degreesToRad(togleReferenceSystems(mc));
    let windDirRad = degreesToRad(togleReferenceSystems(flipDirection(wd)));
    return Math.round(Math.sin(magCourseRad - windDirRad) * ws);
  }

  function calcHeading(t, cw, mg) {
    let magCourseRad = degreesToRad(togleReferenceSystems(mg));
    return Math.round(
      togleReferenceSystems(radToDegrees(Math.asin(cw / t) + magCourseRad))
    );
  }

  function calcEtas(t, h, mc) {
    let headingRad = degreesToRad(togleReferenceSystems(h));
    let magCourseRad = degreesToRad(togleReferenceSystems(mc));
    return Math.round(Math.cos(headingRad - magCourseRad) * t);
  }

  function calcLongWind(ws, h, wd) {
    let headingRad = degreesToRad(togleReferenceSystems(h));
    let windDirRad = degreesToRad(togleReferenceSystems(flipDirection(wd)));
    return Math.round(Math.cos(headingRad - windDirRad) * ws);
  }

  function calcGroundSpeed(et, wvl) {
    return et + wvl;
  }

  function calcEte(d, gs) {
    return (d / gs) * 60;
  }

  function calcFuel(ff, e) {
    return (ff / 60) * e;
  }

  // ---------------- CONVERSIONES ----------------------------

  function flipDirection(gscAngle) {
    if (0 <= gscAngle && gscAngle <= 180) {
      return gscAngle + 180;
    } else {
      return gscAngle - 180;
    }
  }

  function togleReferenceSystems(angle) {
    angle = Number(angle);
    if (0 <= angle && angle <= 90) {
      return angle * -1 + 90;
    } else {
      return angle * -1 + 450;
    }
  }

  function degreesToRad(degrees) {
    return (degrees / 360) * 2 * Math.PI;
  }

  function radToDegrees(rad) {
    return (rad * 360) / (2 * Math.PI);
  }

  //--------------------- Renderizado------------------------------------

  return (
    <div>
      <div className="checkpoint" id="checkpoint">
        <input
          type="text"
          className="cp-data"
          id="name"
          placeholder="Checkpoint"
        />
        <input
          type="number"
          min="1"
          max="360"
          required
          className="cp-data"
          id="geogrephic-course"
          placeholder="Course"
          onChange={changeGeographicCourse}
        />
        <input
          type="number"
          className="cp-data"
          placeholder="Deviation"
          id="deviation"
          onChange={changeDeviation}
        />
        <input
          type="number"
          className="cp-calc"
          id="magnetic-course"
          value={magneticCourse}
          readOnly
        />
        <div className="wind-data">
          <input
            type="number"
            min="1"
            max="360"
            className="cp-data"
            id="w-direction"
            placeholder="WD"
            onChange={changeWindDirection}
          />
          <input
            type="number"
            min="0"
            className="data"
            id="w-speed"
            placeholder="WS"
            onChange={changeWindSpeed}
          />
        </div>
        <input
          type="number"
          className="cp-calc"
          id="cross-wind"
          value={crossWind}
          readOnly
        />
        <span className="cp-calc" id="drift"></span>
        <input type="number" className="cp-calc" id="heading" value={heading} readOnly />
        <input
          type="number"
          className="cp-data"
          id="tas"
          placeholder="TAS"
          onChange={changeTas}
        />
        <input type="number" className="cp-calc" id="etas" value={eTas} readOnly />
        <input type="number" className="cp-calc" id="long-wind" value={longWind} readOnly />
        <input type="number" className="cp-calc" id="ground-speed" value={groundSpeed} readOnly />
        <input
          type="number"
          min="1"
          className="cp-data"
          id="distance"
          placeholder="Distance"
          onChange={changeDistance}
        />
        <input type="number" className="cp-calc" id="ete" value={ete} readOnly />
        <span className="cp-calc" id="eta"></span>
        <input
          type="number"
          min="0"
          className="cp-data"
          id="fuel-flow"
          placeholder="Fuel Flow"
          onChange={changeFuelFlow}
        />
        <input type="number" className="cp-calc" id="fuel" value={fuel} readOnly />
      </div>
    </div>
  );
}
