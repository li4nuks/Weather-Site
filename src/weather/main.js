const API_KEY = "d57a906c1dea03b42a99fe6e285af4e1";
const city = localStorage.getItem("weather_city");
const statusText = document.getElementById("status");
const weatherBox = document.getElementById("weather-box");

window.addEventListener("load", () => {
    const body = document.body;
    if (sessionStorage.getItem("transition") === "toWeather") {
        body.classList.add("slide-in-right");
        sessionStorage.removeItem("transition");
    } else {
        body.classList.add("fade-in");
    }
});

if (!city) {
    statusText.textContent = "Місто не вказано";
} else {
    getForecast(city);
}

async function getForecast(city) {
    try {
        statusText.textContent = "Загрузка прогноза...";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ua`
        );
        if (!response.ok) throw new Error("Помилка при отриманні прогноза");

        const data = await response.json();
        showForecast(data);
    } catch (err) {
        statusText.textContent = "Помилка: " + err.message;
    }
}

function showForecast(data) {
    statusText.textContent = "";
    weatherBox.innerHTML = "";

    const cityName = document.createElement("h2");
    cityName.textContent = data.city.name;
    cityName.classList.add("city-title");
    weatherBox.appendChild(cityName);

    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const div = document.createElement("div");
        div.classList.add("day-box");

        const date = new Date(day.dt * 1000).toLocaleDateString("uk-UA", { weekday: "long" });

        div.innerHTML = `
            <h3>${date.charAt(0).toUpperCase() + date.slice(1)}</h3>
            <p>🌡 Температура: ${Math.round(day.main.temp)}°C</p>
            <p>☁️ Погода: ${day.weather[0].description}</p>
            <p>💧 Вологість: ${day.main.humidity}%</p>
            <p>🌪️ Вітер: ${day.wind.speed} м/с</p>
        `;

        weatherBox.appendChild(div);
    }
}
document.getElementById("back-link").addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("transition", "toSearch");
    window.location.href = "../search/index.html";
});
