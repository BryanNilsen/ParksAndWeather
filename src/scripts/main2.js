const parksContainer = document.querySelector(".parks_container");
console.log("parks container", parksContainer);

fetch(
  "https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json"
)
  .then(results => results.json())
  .then(parsedResults => {
    const allParks = parsedResults.parks;
    console.log("parsed results", allParks);
    allParks.forEach(park => {
      console.log("one park", park);
      fetch(
        `https://blooming-mesa-53816.herokuapp.com/${darkSkyKey}/${
          park.latitude
        },${park.longitude}`
      )
        .then(results => results.json())
        .then(weatherData => {
          console.log("Weather Data", weatherData);
          const parkHTML = `
            <article class="park_visited_${park.visited}">
              <h3>${park.name}</h3>
              <p>State the park in located in: ${park.state}</p>
              <p>Weather:</p>
              <ul>
                <li>Currently: ${weatherData.currently.summary}</li>
                <li>Today: ${weatherData.hourly.summary}</li>
                <li>Week: ${weatherData.daily.summary}</li>
              </ul>
            </article>`;

          parksContainer.innerHTML += parkHTML;
        });
    });
  });
