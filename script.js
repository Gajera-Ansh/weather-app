function setWeatherBackground(condition) {
    const bg = document.getElementById('weather-bg');
    bg.innerHTML = '';
    bg.className = '';
    const text = condition.toLowerCase();

    if (text.includes("sun") || text.includes("clear") || text.includes("hot")) {
        bg.className = 'sunny-bg';
        bg.innerHTML = `<div class="sun"></div>`;
    } else if (text.includes("rain") || text.includes("drizzle")) {
        bg.className = 'rainy-bg';
        bg.innerHTML = `
        <div class="cloud real-cloud" style="top:15%;left:55%;">
            <div class="cloud-part1"></div>
            <div class="cloud-part2"></div>
            <div class="cloud-part3"></div>
        </div>
        <div class="cloud real-cloud" style="top:22%;left:70%;opacity:0.7;transform:scale(0.8);">
            <div class="cloud-part1"></div>
            <div class="cloud-part2"></div>
            <div class="cloud-part3"></div>
        </div>
        <div class="cloud real-cloud" style="top:10%;left:65%;opacity:0.5;transform:scale(0.6);">
            <div class="cloud-part1"></div>
            <div class="cloud-part2"></div>
            <div class="cloud-part3"></div>
        </div>
        <div class="cloud real-cloud" style="top:18%;left:45%;opacity:0.6;transform:scale(0.7);">
            <div class="cloud-part1"></div>
            <div class="cloud-part2"></div>
            <div class="cloud-part3"></div>
        </div>
        <div class="cloud real-cloud" style="top:25%;left:60%;opacity:0.4;transform:scale(0.5);">
            <div class="cloud-part1"></div>
            <div class="cloud-part2"></div>
            <div class="cloud-part3"></div>
        </div>
        <div class="rain" style="left:56%;"></div>
        <div class="rain" style="left:58%;animation-delay:0.1s;"></div>
        <div class="rain" style="left:60%;animation-delay:0.2s;"></div>
        <div class="rain" style="left:62%;animation-delay:0.3s;"></div>
        <div class="rain" style="left:64%;animation-delay:0.4s;"></div>
        <div class="rain" style="left:66%;animation-delay:0.5s;"></div>
        <div class="rain" style="left:68%;animation-delay:0.6s;"></div>
        <div class="rain" style="left:70%;animation-delay:0.7s;"></div>
        <div class="rain" style="left:72%;animation-delay:0.8s;"></div>
        <div class="rain" style="left:74%;animation-delay:0.9s;"></div>
    `;
    } else if (text.includes("cloud")) {
        bg.className = 'cloudy-bg';
        bg.innerHTML = `<div class="cloud real-cloud"></div>`;
    } else if (text.includes("snow")) {
        bg.className = 'snowy-bg';
        bg.innerHTML = `<div class="cloud real-cloud"></div><div class="snow"></div>`;
    } else if (text.includes("fog") || text.includes("mist") || text.includes("haze")) {
        bg.className = 'foggy-bg';
        bg.innerHTML = `<div class="fog"></div>`;
    } else if (text.includes("thunder") || text.includes("storm")) {
        bg.className = 'stormy-bg';
        bg.innerHTML = `<div class="cloud real-cloud"></div><div class="lightning"></div>`;
    } else {
        bg.className = 'default-bg';
    }
}

async function getWeather() {
    const location = document.getElementById("locationInput").value.trim();
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=69042efced574a2cb56174045250607&q=${encodeURIComponent(location)}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Location not found");

        const data = await response.json();

        const tempC = data.current.temp_c;
        const conditionText = data.current.condition.text;
        const emoji = getWeatherEmoji(conditionText);

        document.getElementById("weatherResult").innerHTML = `
            <div class="emoji">${emoji}</div>
            <div class="temp">${tempC}°C</div>
            <div class="condition">${conditionText}</div>
        `;

        setWeatherBackground(conditionText);
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function getWeatherEmoji(condition) {
    const text = condition.toLowerCase();

    if (text.includes("sun") || text.includes("clear")) return "☀️";
    if (text.includes("cloud")) return "☁️";
    if (text.includes("rain") || text.includes("drizzle")) return "🌧️";
    if (text.includes("thunder") || text.includes("storm")) return "⛈️";
    if (text.includes("snow")) return "❄️";
    if (text.includes("fog") || text.includes("mist") || text.includes("haze")) return "🌫️";

    return "🌈"; // default
}

// Set default background on load
setWeatherBackground('clear');