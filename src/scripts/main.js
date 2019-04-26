// grab DOM element to output park data
let parksOutput = document.getElementById("parksOutput");

function getData() {
  // get park data from API
  fetch(
    "https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json"
  )
    .then(res => res.json())
    .then(data => {
      const allParks = data.parks;
      allParks.forEach(park => {
        // get weather data from API using park latitude and longitude
        fetch(
          `https://blooming-mesa-53816.herokuapp.com/${park.latitude},${
            park.longitude
          }`
        )
          .then(result => result.json())
          .then(weatherData => {
            // add weather data as key/value pairs to park object
            park.currently = weatherData.currently.summary;
            park.hourly = weatherData.hourly.summary;
            park.daily = weatherData.daily.summary;
            // run park object through DOM builder and post to DOM
            parksOutput.innerHTML += domBuilder(park);
          });
      });
    });
}

function domBuilder(item) {
  // control item card border based on visited value
  let articleClass = "";
  if (item.visited === true) {
    articleClass = "visited";
  } else {
    articleClass = "not_visited";
  }
  // build HTML DOM element with item data
  let domElement = `
  <article class=${articleClass}>
  <h3>${item.name}</h3>
  <p>State: ${item.state}</p>
  <ul>
  <li><strong>Currently:</strong> ${item.currently}</li>
  <li><strong>Today:</strong> ${item.hourly}</li>
  <li><strong>Week:</strong> ${item.daily}</li>
  </ul>
  </article>
  `;
  return domElement;
}

getData();
