const countryListDiv = document.getElementById('countryList');

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
        countries.forEach(country => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('col-sm-6', 'col-md-4', 'col-lg-4', 'col-xl-4', 'mb-4');

            const card = `
                    <div class="card h-100">
                        <div class="card-header"><h3>${country.name.common}</h3></div>
                        <img src="${country.flags.png}" class="card-img-top" alt="Flag of ${country.name.common}">
                        <div class="card-body">
                            <div class="card-text">
                                <p>Capital: ${country.capital}</p>
                                <p>Country Code: ${country.idd.root}</p>
                                <p>Region: ${country.region}</p>
                                <p>Latlng: ${country.latlng}</p>
                            </div>
                            <button class="btn btn-primary" data-country="${country.cca3}">click for weather</button>
                        </div>
                    </div>
                `;

            cardDiv.innerHTML = card;
            countryListDiv.appendChild(cardDiv);

            const weatherButton = cardDiv.querySelector('button');
            weatherButton.addEventListener('click', function () {
                fetchWeather(country.cca3, country.capital);
            });
        });
    })

function fetchWeather(countryCode, capital) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=e68c01f3d3997b845ad291ff64e3509d`)
        .then(response => response.json())
        .then(weatherData => {
            const tempCelsius = Math.round(weatherData.main.temp - 273.15);
            const weatherPopup = `${weatherData.weather[0].main}, ${tempCelsius}°C`;
            alert(weatherPopup);
        })
        .catch(error => {
            alert('Weather information not available');
        });
}