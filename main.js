// Selecting DOM elements
const container = document.querySelector('.container'); // Container element
const search = document.querySelector('.search-box button'); // Search button element
const searchInput = document.querySelector('.search-box input'); // Search input element
const weatherBox = document.querySelector('.weather-box'); // Weather box element
const weatherDetails = document.querySelector('.weather-details'); // Weather details element
const error404 = document.querySelector('.not-found'); // Error message element

// Event listener for search button click
search.addEventListener("click", () =>{
    searchWeather(); // Call the searchWeather function when the button is clicked
}) 

// Event listener for Enter key press in the search input
searchInput.addEventListener("keydown", (event) =>{
    if(event.key === 'Enter'){
        searchWeather(); // Call the searchWeather function when Enter key is pressed
    }
})

// Function to fetch and display weather information
function searchWeather() {
    const APIKey = 'Your Api Key'; // OpenWeatherMap API key
    const city = searchInput.value; // Get the city input from the user

    // Check if the city input is empty
    if(city === '') 
        return;

    // Fetch weather data from OpenWeatherMap API using the city input and API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()) // Parse the JSON response from the API
        .then(json => {

            // Handle the case when the city is not found (HTTP status code 404)
            if(json.cod === '404') {
                // Display error message and hide weather information
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn'); // Add fadeIn animation to the error message
                return;
            }

            // Hide error message and remove fadeIn animation from the error message
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Select weather elements in the DOM
            const image = document.querySelector('.weather-box img'); // Weather icon element
            const temperature = document.querySelector('.weather-box .temp'); // Temperature element
            const description = document.querySelector('.weather-box .desc'); // Weather description element
            const humidity = document.querySelector('.weather-details .humidity span'); // Humidity element
            const wind = document.querySelector('.weather-details .wind span'); // Wind speed element

            // Set weather icon based on weather condition
            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png'; // Clear weather icon
                    break;
                case 'Rain':
                    image.src = 'images/rain.png'; // Rain weather icon
                    break;
                case 'Snow':
                    image.src = 'images/snow.png'; // Snow weather icon
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png'; // Cloudy weather icon
                    break;
                case 'Haze':
                    image.src = 'images/mist.png'; // Hazy weather icon
                    break;
                default:
                    image.src = ''; // Default: no specific weather icon
            }

            // Display weather information in the UI
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; // Temperature with Celsius unit
            description.innerHTML = `${json.weather[0].description}`; // Weather description
            humidity.innerHTML = `${json.main.humidity}%`; // Humidity percentage
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`; // Wind speed in kilometers per hour

            // Display weather elements and add fadeIn animation to them
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '550px'; // Adjust container height to display weather information

        })
}