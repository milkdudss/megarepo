import './App.css';
import { useEffect, useState } from 'react';

const URL = 'https://api.open-meteo.com/v1/forecast';

function App() {

  const [results, setResults] = useState(null);

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`${URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
      const responseJSON = await response.json();
      // TODO: error handling
      setResults(responseJSON);
    }
    if (longitude && latitude) {
      fetchWeather();
    }
  }, [longitude, latitude]);

  const Input = () => (
    <div>
      <div>Longitude</div>
      <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} />
      <div>Latitude</div>
      <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} />
    </div>
  );

  const WeatherReport = () => {
    // TODO: better error handling
    if (!results.hourly) {
      debugger;
      return [];
    }
    const {time, temperature_2m} = results.hourly;
    const hourly = [];
    for (let i = 0; i <= 10; i+= 1) {
      hourly.push({time: time[i], temp: temperature_2m[i]});
    }
    return hourly.map(({time, temp}) => <div>Hour: {time} temp {temp}</div>);
  }

  const NoData = () => <div>Enter your coordinates</div>;
  
  return (
    <div>
      <Input />
      {!results ? <NoData /> : <WeatherReport />}
    </div>
  );
}

export default App;
