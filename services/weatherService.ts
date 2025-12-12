import { OPENWEATHER_API_KEY } from "../config";
import type { WeatherResponse } from "../types/weather";

export async function getWeatherByCity(city: string): Promise<WeatherResponse> {
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        encodeURIComponent(city) +
        "&appid=" +
        OPENWEATHER_API_KEY;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("City not found");
    }

    const data: WeatherResponse = await res.json();
    return data;
}
