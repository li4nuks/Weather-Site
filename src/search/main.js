document.getElementById("search").addEventListener("click", () => {
    const city = document.getElementById("search_weather").value.trim();
    if (city.length === 0) return alert("Введіть назву міста!");

    localStorage.setItem("weather_city", city);
    sessionStorage.setItem("transition", "toWeather");
    window.location.href = "../weather/index.html";
});

window.addEventListener("load", () => {
    const body = document.body;
    if (sessionStorage.getItem("transition") === "toSearch") {
        body.classList.add("slide-in-left");
        sessionStorage.removeItem("transition");
    } else {
        body.classList.add("fade-in");
    }
});
