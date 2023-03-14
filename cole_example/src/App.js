import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const transformData = (rawData) => {
  if (!rawData.hourly) {
    return [];
  }
  const {time, temperature_2m} = rawData.hourly;
  const hourly = [];
  for (let i = 0; i <= 10; i+= 1) {
    hourly.push({time: time[i], temp: temperature_2m[i]});
  }
  return hourly;
};

const DisplayData = ({data}) => (
  <div>
    <div>'Hello'</div>
    {data.map(({time, temp}, idx) => <div key={idx}>Hour: {time} temp {temp}</div>)}
  </div>
);

const useFetch = ({latitude, longitude}) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (latitude == null || longitude == null) return;
    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
      const data = await response.json();
      const transformedData = transformData(data);
      console.log(transformedData);
      setData(transformedData);
      setStatus('fetched');
    }

    fetchData();
  }, [latitude, longitude]);

  return { status, data };
}

function App() {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const {data} = useFetch({latitude, longitude});
  
  return (
    <div>
      <div>Longitude</div>
      <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} />
      <div>Latitude</div>
      <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} />
      <DisplayData data={data} />
    </div>
  );
}

export default App;
