import './style.css';
import { format } from 'date-fns';
import { ICONS } from './js (import)/icons';



//FUNCTIONS
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

  console.log(data);
  
  let { resolvedAddress: location } = data;
  let locationParts = location.split(", ");
  document.getElementById('location').textContent = locationParts[0] + ", " + locationParts[locationParts.length - 1];

  let dateTime = new Date();
  document.getElementById('datetime').textContent = format(dateTime, 'EEE') + " | " + format(dateTime, "PP") + " | " + format(dateTime, "h b");

  let temp = data.currentConditions.temp;
  document.getElementById('temperature').textContent = `${temp} °F`;

  let currentCondition = data.currentConditions.icon;
  let iconName = currentCondition
  .split("-")
  .map((word, index) => {
    if (index === 0) {
      return word;
    } else {
      let letters = word.split("");
      letters[0] = letters[0].toUpperCase();
      let Capitalizedword = letters.join("");
      return Capitalizedword;
    }
  })
  .join("");
  document.getElementById('icon').src = ICONS[iconName];

  let desc = data.currentConditions.conditions;
  document.getElementById('description').textContent = desc.toUpperCase();
}

function changeBgColor () {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.background = randomColor;
}


setInterval(changeBgColor, 2000);

document.getElementById('enterBtn').addEventListener('click', async () => {
  let resultContainer = document.querySelector('.result-container');
  resultContainer.style.display = "flex";

  setTimeout(() => {
    resultContainer.style.opacity = "1";
  }, 50)
  
  let input = document.getElementById('locationInput');

  let data = await fetchWeatherData(input.value);
  displayData(data);

  input.value = "";
})

