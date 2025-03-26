async function fetchWeather({
  pastDays = 0,
  forecastDays = 7,
  timezone = "Europe/Berlin",
  longitude = 6.17,
  latitude = 49.11,
}) {
  const url_unsafe = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&hourly=temperature_2m,weather_code&timezone=${timezone}&past_days=${pastDays}&forecast_days=${forecastDays}`;
  const url = encodeURI(url_unsafe);
  const response = await fetch(url);
  return response.json();
}

function getHourly(hourly, diffDays) {
  if (diffDays < 0) {
    return {
      time: hourly.time.slice(0, 24),
      temperature_2m: hourly.temperature_2m.slice(0, 24),
      weather_code: hourly.weather_code.slice(0, 24),
    };
  } else {
    return {
      time: hourly.time.slice(diffDays * 24),
      temperature_2m: hourly.temperature_2m.slice(diffDays * 24),
      weather_code: hourly.weather_code.slice(diffDays * 24),
    }
  }
}

function getDaily(daily, diffDays) {
  if (diffDays < 0) {
    return {
      time: daily.time.slice(0, 1),
      sunrise: daily.sunrise.slice(0, 1),
      sunset: daily.sunset.slice(0, 1),
    }
  } else {
    return {
      time: daily.time.slice(diffDays),
      sunrise: daily.sunrise.slice(diffDays),
      sunset: daily.sunset.slice(diffDays),
    }
  }
}

export default async function fetchWeatherDay(day, options) {
  const today = new Date();
  const dateQuery = new Date(day);
  const diffTime = dateQuery - today;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const pastDays = Math.max(-diffDays, 0);
  const forecastDays = Math.min(Math.max(diffDays + 1, 1), 16);

  const { hourly, daily, ...weather } = await fetchWeather({ pastDays, forecastDays, ...options });

  // Truncate the response to the day
  // In fact if diffDays is negative, we only keep the start of the arrays
  // and if diffDays is positive, we only keep the end of the arrays
  // There may be a smarter way to do this
  return {
    ...weather,
    hourly: getHourly(hourly, diffDays),
    daily: getDaily(daily, diffDays),
  }
}
