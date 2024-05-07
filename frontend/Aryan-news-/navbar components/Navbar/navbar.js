// Function to update banner content
function updateBanner() {
    // Get current date and time
    let now = new Date();
    let date = now.toLocaleDateString('en-IN'); // Indian date format
    let time = now.toLocaleTimeString();

    // Get weather data using your API key
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Mumbai,IN&appid=99d25860666ce054817826f2af903599&units=metric'; // Example for Mumbai
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            let weather = data.weather[0].description;
            let temperature = data.main.temp;
            let flagUrl = './images/flag.png'; // URL to the flag of India image
            let flag = `<img src="${flagUrl}" alt="Flag of India" style="height: 20px;">`; // Use image tag for flag

            // Get air quality index using your API key
            let airQualityUrl = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=19.0760&lon=72.8777&appid=99d25860666ce054817826f2af903599'; // Example for Mumbai coordinates
            fetch(airQualityUrl)
                .then(response => response.json())
                .then(airData => {
                    let airQualityIndex = airData.list[0].main.aqi;
                    let airQualityCategory = getAirQualityCategory(airQualityIndex);

                    // Update banner content with weather and air quality information
                    let banner = document.getElementById('weather-info');
                    banner.innerHTML = `${flag} ${date} ${time} Weather: ${weather}, Temperature: ${temperature}°C, Air Quality: ${airQualityCategory}`;

                    // Add social media icons
                    let socialIcons = document.getElementById('social-icons');
                    socialIcons.innerHTML = `
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-linkedin"></i>
                        <i class="fab fa-youtube"></i>
                    `;
                })
                .catch(error => console.error('Error fetching air quality:', error));
        })
        .catch(error => console.error('Error fetching weather:', error));
}
function getAirQualityCategory(index) {
    if (index <= 50) {
        return 'Good';
    } else if (index <= 100) {
        return 'Moderate';
    } else if (index <= 150) {
        return 'Unhealthy for Sensitive Groups';
    } else if (index <= 200) {
        return 'Unhealthy';
    } else if (index <= 300) {
        return 'Very Unhealthy';
    } else {
        return 'Hazardous';
    }
}
// Call the updateBanner function to update content initially
updateBanner();

// Update content every second (1000 milliseconds)
setInterval(updateBanner, 1000);
