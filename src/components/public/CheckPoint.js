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

  useEffect(()=>{
    setCrossWind(calcCrossWind(magneticCourse, windDirection, windSpeed))
  }, [magneticCourse, windDirection, windSpeed])

  useEffect(()=>{
    setHeading(calcHeading(tas, crossWind, magneticCourse))
  },[tas, crossWind, magneticCourse])

  //let geographicCourse;
  //let magneticCourse;
  //let deviation;
  //let windDirection;
  //let windSpeed;
  //let crossWind;
  let drift;
  //let heading;
  //let tas;
  let eTas;
  let longWind;
  let groundSpeed;
  let distance;
  let ete;
  let eta;
  let fuelFlow;
  let fuel;

  // function setGeographicCourse(gc) {
  //   geographicCourse = Number(gc.target.value);
  //   setMagneticCourse(geographicCourse+deviation);
  //   console.log(geographicCourse)
  //   console.log(deviation)
  // }

  // function setDeviation(d) {
  //   deviation = Number(d.target.value);
  //   setMagneticCourse(geographicCourse+deviation);
  //   console.log(deviation)
  //   console.log(geographicCourse)
  // }

  // function setWindDirection(wd) {
  //   windDirection = Number(wd.target.value);
  //   calculate();
  // }

  // function setWindSpeed(ws) {
  //   windSpeed = Number(ws.target.value);
  //   console.log(deviation + "  " + geographicCourse + "  " + magneticCourse);
  // }

  // function setTas(t) {
  //   tas = Number(t.target.value);
  //   calculate();
  // }

  function setDistance(dist) {
    distance = Number(dist.target.value);
    calculate();
  }

  function setFuelFlow(ff) {
    fuel = Number(ff.target.value);
    calculate();
  }

  // ----------------- SERVICES ----------------------------

  function changeGeographicCourse(e) {
    setGeographicCourse(Number(e.target.value));
    setMagneticCourse(Number(e.target.value) + Number(deviation));
  }

  function changeDeviation(e) {
    setDeviation(Number(e.target.value));
    setMagneticCourse(Number(e.target.value) + Number(geographicCourse));
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



  // ----------------- CALCULOS ----------------------------

  function calcCrossWind(mc, wd, ws) {
    let magCourseRad = degreesToRad(togleReferenceSystems(mc));
    let windDirRad = degreesToRad(togleReferenceSystems(wd));
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
    let windDirRad = degreesToRad(togleReferenceSystems(wd));
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

  function calculate() {
    console.log(
      "desde calculate incio " +
        " GEO: " +
        geographicCourse +
        " DEV: " +
        deviation +
        " MAG: " +
        magneticCourse
    );
    //calcMagneticCourse(geographicCourse, deviation);
    // const mgcal = magneticCourse + deviation;
    // setMagneticCourse(mgcal);
    //crossWind = calcWindVTrans(magneticCourse, windDirection, windSpeed);
    //heading = calcHeading(tas, crossWind, magneticCourse);
    eTas = calcEtas(tas, heading, magneticCourse);
    longWind = calcLongWind(windSpeed, heading, windDirection);
    groundSpeed = calcGroundSpeed(eTas, longWind);
    ete = calcEte(distance, groundSpeed);
    fuel = calcFuel(fuelFlow, ete);
    console.log(
      "desde calculate fin " +
        " GEO: " +
        geographicCourse +
        " DEV: " +
        deviation +
        " MAG: " +
        magneticCourse
    );
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
        <input type="number" className="cp-calc" id="etas" readOnly />
        <input type="number" className="cp-calc" id="long-wind" readOnly />
        <input type="number" className="cp-calc" id="ground-speed" readOnly />
        <input
          type="number"
          min="1"
          className="cp-data"
          id="distance"
          placeholder="Distance"
          onChange={setDistance}
        />
        <input type="number" className="cp-calc" id="ete" readOnly />
        <span className="cp-calc" id="eta"></span>
        <input
          type="number"
          min="0"
          className="cp-data"
          id="fuel-flow"
          placeholder="Fuel Flow"
          onChange={setFuelFlow}
        />
        <input type="number" className="cp-calc" id="fuel" readOnly />
      </div>
    </div>
  );
}
