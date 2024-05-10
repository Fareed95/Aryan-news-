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

            // Get air quality index using your API key
            let airQualityUrl = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=19.0760&lon=72.8777&appid=99d25860666ce054817826f2af903599'; // Example for Mumbai coordinates
            fetch(airQualityUrl)
                .then(response => response.json())
                .then(airData => {
                    let airQualityIndex = airData.list[0].main.aqi;
                    let airQualityCategory = getAirQualityCategory(airQualityIndex);

                    // Update banner content with weather and air quality information
                    let banner = document.getElementById('weather-info');
                    banner.innerHTML = `${date} ${time} Weather: ${weather}, Temperature: ${temperature}°C, Air Quality: ${airQualityCategory}`;

                    // Load flag image dynamically
                    let flagUrl = `${STATIC_URL}images/flag.png`;
                    let flagImage = new Image();
                    flagImage.src = flagUrl;
                    flagImage.alt = 'Flag of India';
                    flagImage.style.height = '20px';
                    banner.appendChild(flagImage);

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

// Function to determine air quality category based on index
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

// Function to initialize slider functionality
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const scrollbarThumb = document.querySelector(".slider-scrollbar .scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    let currentScrollLeft = 0;

    // Slide images forward or backward
    const slideImages = (direction) => {
        currentScrollLeft += direction * (imageList.clientWidth);
        currentScrollLeft = Math.min(Math.max(currentScrollLeft, 0), maxScrollLeft);
        imageList.scrollTo({ left: currentScrollLeft, behavior: "smooth" });
        updateButtonVisibility();
    };

    // Update button visibility based on scroll position
    const updateButtonVisibility = () => {
        if (currentScrollLeft <= 0) {
            slideButtons[0].style.display = "none"; // Hide prev button at beginning
            slideButtons[1].style.display = "flex"; // Show next button
        } else if (currentScrollLeft >= maxScrollLeft) {
            slideButtons[0].style.display = "flex"; // Show prev button
            slideButtons[1].style.display = "none"; // Hide next button at end
        } else {
            slideButtons[0].style.display = "flex"; // Show prev button in middle
            slideButtons[1].style.display = "flex"; // Show next button in middle
        }
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (imageList.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Slide buttons event listeners
    slideButtons[0].addEventListener("click", () => slideImages(-1)); // Previous button
    slideButtons[1].addEventListener("click", () => slideImages(1));  // Next button

    // Update image scroll based on scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = imageList.clientWidth - scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Update scrollbar thumb position when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        updateButtonVisibility();
    });

    // Initial scrollbar thumb position
    updateScrollThumbPosition();
    updateButtonVisibility();
};

// Initialize slider functionality after the window has loaded
window.addEventListener("load", () => {
    // Call the updateBanner function to update content initially
    updateBanner();

    // Update content every 60 seconds (60000 milliseconds)
    setInterval(updateBanner, 60000);

    // Initialize slider functionality
    initSlider();
});
