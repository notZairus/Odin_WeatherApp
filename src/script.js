import './style.css';
import { format } from 'date-fns';
import { ICONS } from './js (import)/icons';



async function fetchWeatherData (location) {
  try {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}}?unitGroup=us&key=2YUX44XCGJ9DV4KRCSQH7SPUR&contentType=json`);
    
    if (! response.ok) {
      throw Error('Location not found.');
    }

    let data = await response.json();
    return data;
  } 
  catch(error) {
    console.log(error);
  }
}

function displayData (data) {
  let { resolvedAddress: location } = data;
  let locationParts = location.split(", ");
  document.getElementById('location').textContent = locationParts[0] + ", " + locationParts[2];

  let dateTime = new Date();
  document.getElementById('datetime').textContent = format(dateTime, 'EEE') + " | " + format(dateTime, "PP") + " | " + format(dateTime, "h b");

  let currentCondition = data.currentConditions.icon;
}

function changeBgColor () {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.background = randomColor;
}


setInterval(changeBgColor, 2000);

document.getElementById('enterBtn').addEventListener('click', async () => {
  let input = document.getElementById('locationInput');

  let data = await fetchWeatherData(input.value);
  displayData(data);

  input.value = "";
})

