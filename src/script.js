import './style.css';


async function fetchWeatherData (location) {
  try {
    
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}}?unitGroup=us&key=2YUX44XCGJ9DV4KRCSQH7SPUR&contentType=json`);
    
    if (! response.ok) {
      throw Error('Location not found.');
    }

    let data = await response.json();
    console.log(data);

  } 
  catch(error) {
    console.log(error);
  }
}

fetchWeatherData('Bulacan');



//WEATHER API
//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bulacan?unitGroup=us&key=YOUR_API_KEY&contentType=json

//API KEY
//2YUX44XCGJ9DV4KRCSQH7SPUR


