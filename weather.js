let state = reactive({
    selectedCity: "Kyiv",
    weatherData: {
        temperature: 20,
        description: "Sunny"
    }
});
const mockWeatcherData = {
    "Kyiv": {
        temperature: 20,
        description: "Sunny"
    },
    "Lviv": {
        temperature: 10,
        description: "Cloudy"
    },
    "Odesa": {
        temperature: 25,
        description: "Meteor"
    }
}

createEffect(function() {
    render("#app", `
        <select onchange="handleCityChange(this.value)">
            <option value="Kyiv" ${state.selectedCity === 'Kyiv' ? 'selected' : ''}>Kyiv</option>
            <option value="Lviv" ${state.selectedCity === 'Lviv' ? 'selected' : ''}>Lviv</option>
            <option value="Odesa" ${state.selectedCity === 'Odesa' ? 'selected' : ''}>Odesa</option>
        </select>

        <div id="weather">
            <h1>Weather in ${state.selectedCity}</p>
            <h2>Temperature in ${state.weatherData.temperature}°C</h2>
            <p>Description: ${state.weatherData.description}</p>
        </div>
    `);
});

function handleCityChange(city) {
    state.selectedCity = city;
    fetchWeather(city);
}

function fetchWeather(city) {
    setTimeout(() => {
        const weather = mockWeatcherData[city];
        state.weatherData = weather;
    }, 1000);
}

createEffect(() => {
    fetchWeather(state.selectedCity);
});
