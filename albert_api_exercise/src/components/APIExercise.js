import React, { useEffect, useState } from "react";

const APIExercise = () => {
  const [info, setInfo] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      );
      const resJSON = await res.json();
      setInfo(resJSON);
    };

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  const getData = () => {
    const { time, temperature_2m } = info?.hourly;
    const hourly = [];
    for (let i = 0; i < 15; i++) {
      hourly.push({ time: time[i], temp: temperature_2m[i] });
    }
    return hourly;
  };

  return (
    <div>
      <h1> APIExercise</h1>
      <h6>
        Enter the latitude and longitude, you will able to see the temperature
        for the location
      </h6>
      <input
        placeholder="Enter Latitude"
        type="number"
        value={latitude}
        onChange={(e) => {
          setLatitude(e.target.value);
        }}
      ></input>
      <input
        placeholder="Enter Longitude"
        type="number"
        value={longitude}
        onChange={(e) => {
          setLongitude(e.target.value);
        }}
      ></input>

      {latitude && longitude && info ? (
        <h3>
          {getData().map((data) => {
            return (
              <div key={data.time}>
                Hour:{data.time} Temperature:{data.temp}
              </div>
            );
          })}
        </h3>
      ) : (
        <h3>**Please Enter Both Latitude and Longitude**</h3>
      )}
    </div>
  );
};

export default APIExercise;
